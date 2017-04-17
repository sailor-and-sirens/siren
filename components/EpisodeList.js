import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/Player';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { convertMillis } from '../helpers';
import EpisodeListCard from './EpisodeListCard';
import AddPlaylistModal from './AddPlaylistModal';

let _ = require('lodash');

const mapStateToProps = (state) => ({
  currentlyOpenSwipeable: state.swipe.currentlyOpenSwipeable,
  inbox: state.main.inbox,
  isAddPlaylistModalVisible: state.swipe.isAddPlaylistModalVisible,
  filters: state.main.inboxFilters
});

class EpisodeList extends Component {

  newSoundInstance = null;
  timer = null;

  componentDidMount = () => {
    Audio.setIsEnabledAsync(true);
  }


hmsToSecondsOnly = (duration) => {
    var p = duration.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}

  filterEpisodes = (keys) => {
    if (this.props.filters.liked === 'liked') {
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].liked === true;
      });
    }
    if (this.props.filters.liked === 'notLiked') {
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].liked === false;
      });
    }
    if (this.props.filters.bookmarked === 'bookmarked') {
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].bookmark === true;
      });
    }
    if (this.props.filters.bookmarked === 'notBookmarked') {
       keys = _.filter(keys, (key) => {
        return this.props.inbox[key].bookmark === false;
      });
    }
    if (this.props.filters.time !== 'timeOff') {
      if(this.props.filters.time === '5') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 300;
        });
      } else if (this.props.filters.time === '15') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 900;
        });
      } else if (this.props.filters.time === '30') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 1800;
        });
      }else if (this.props.filters.time === '45') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 2700;
        });
      }else if (this.props.filters.time === '60') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 3600;
        });
      }else if (this.props.filters.time === '60+') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) > 3600;
        });
      }
    }
    if (this.props.filters.tag !== 'All') {
      var tag = this.props.filters.tag;
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].tag === tag;
      })
    }
    return keys;
  }

  handlePlay = (episode) => {
    // TODO get real EpisodeId
    let newEpisodeCurrentTime = 0;
    let newEpisodeLastPlayed = new Date();

    if (this.newSoundInstance === null) {
      // TODO if PlaylistEpisode assoc doesn't already exist, create it
      this.updateCurrentEpisode(1, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.playNewEpisode(episode);
    } else {
      clearInterval(this.timer);
      this.newSoundInstance.getStatusAsync()
      .then(status => {
        let currentEpisodeCurrentTime = status.positionMillis;
        let currentEpisodeLastPlayed = new Date();
        this.updateCurrentEpisode(1, currentEpisodeCurrentTime, currentEpisodeLastPlayed);
      });
      this.updateCurrentEpisode(2, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.newSoundInstance.stopAsync()
        .then(stopped => {
          this.props.dispatch(playerActions.updateCurrentPlayingTime('0:00'));
          this.playNewEpisode(episode);
        });
    }
  }

  updateCurrentEpisode = (episodeId, currentTime, lastPlayed) => {
    let episodeData = {episodeId, currentTime, lastPlayed};
    fetch('http:localhost:3000/api/episodes/user-episodes', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(episodeData)
    })
    .then(response => response.json())
    .then(responseData => {
      console.warn(responseData)
    })
    .catch(err => console.warn(err));
  }

  playNewEpisode = (episode) => {
    this.newSoundInstance = new Audio.Sound({ source: episode.feed.enclosure.url });
    this.props.dispatch(playerActions.createNewSoundInstance(this.newSoundInstance));
    this.props.dispatch(playerActions.setPlayStatus(true));
    this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode('LOADING'));
    this.props.dispatch(playerActions.storeEpisodeData(episode));
    this.newSoundInstance.loadAsync()
      .then(loaded => {
        this.newSoundInstance.playAsync()
          .then(played => {
            this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode(episode.feed.title));
            this.timer = setInterval(function() {
              this.newSoundInstance.getStatusAsync()
                .then(status => {
                  let millis = status.positionMillis
                  this.props.dispatch(playerActions.updateCurrentPlayingTime(convertMillis(millis)));
                })
            }.bind(this), 100);
          })
      });
  }

  handleRemovePlayingEpisode = () => {
    this.newSoundInstance.stopAsync()
    .then(stopped => {
      this.props.dispatch(playerActions.createNewSoundInstance(null));
      this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode(null));
      this.props.dispatch(playerActions.setPlayStatus(false));
    });
  }

  handleAddToPlaylistModalClose = () => {
    this.props.dispatch(swipeActions.toggleAddToPlaylistModal());
  }

  render() {
    const {currentlyOpenSwipeable} = this.props;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }
        this.props.dispatch(swipeActions.toggleOpenSwipeable(swipeable));
      },
      onClose: () => this.props.dispatch(swipeActions.toggleOpenSwipeable(null))
    };
   return (
      <View style={styles.mainView}>
        <AddPlaylistModal
          isAddPlaylistModalVisible={this.props.isAddPlaylistModalVisible}
          handleAddToPlaylistModalClose={this.handleAddToPlaylistModalClose}
        />
         <ScrollView style={styles.episodeList}>
          {this.filterEpisodes(Object.keys(this.props.inbox)).map(key => (
              <EpisodeListCard {...itemProps}
                episode={this.props.inbox[key]}
                handlePlay={this.handlePlay}
                handleRemovePlayingEpisode={this.handleRemovePlayingEpisode}
                id={key}
                key={key}/>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episodeList:{
    width: '100%',
    marginBottom: 210,
  },
})

export default connect(mapStateToProps)(EpisodeList);
