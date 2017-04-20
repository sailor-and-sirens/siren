//UNDER CONSTRUCTION -M
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/Player';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { convertMillis } from '../helpers';
import PodcastEpisodeListCard from './PodcastEpisodeListCard';
import PodcastViewCard from './PodcastViewCard';
import AddPlaylistModal from './AddPlaylistModal';

let _ = require('lodash');

const mapStateToProps = (state) => ({
  currentlyOpenSwipeable: state.swipe.currentlyOpenSwipeable,
  inbox: state.main.inbox,
  isAddPlaylistModalVisible: state.swipe.isAddPlaylistModalVisible,
  filters: state.main.inboxFilters
});

class PodcastEpisodeList extends Component {

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
      this.addEpisodeToListeningTo(1);
      this.updateCurrentEpisodeStats(1, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.playNewEpisode(episode);
    } else {
      clearInterval(this.timer);
      this.newSoundInstance.getStatusAsync()
      .then(status => {
        let currentEpisodeCurrentTime = status.positionMillis;
        let currentEpisodeLastPlayed = new Date();
        this.updateCurrentEpisodeStats(1, currentEpisodeCurrentTime, currentEpisodeLastPlayed);
      });
      this.updateCurrentEpisodeStats(2, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.addEpisodeToListeningTo(2);
      this.newSoundInstance.stopAsync()
        .then(stopped => {
          this.props.dispatch(playerActions.updateCurrentPlayingTime('0:00'));
          this.playNewEpisode(episode);
        });
    }
  }

  addEpisodeToListeningTo = (episodeId) => {
    let episodeData = { episodeId, playlistId: 2 };
    fetch('http://siren-server.herokuapp.com/api/playlists/add-episode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(episodeData)
    })
    .catch(err => console.warn(err));
  }

  removeCurrentEpisodeFromListeningTo = (episodeId) => {
    let episodeData = { episodeId, playlistId: 2 };
    fetch('http://siren-server.herokuapp.com/api/playlists/remove-episode', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(episodeData)
    })
    .catch(err => console.warn(err));
  }

  updateCurrentEpisodeStats = (episodeId, currentTime, lastPlayed) => {
    let episodeData = { episodeId, currentTime, lastPlayed };
    fetch('http://siren-server.herokuapp.com/api/episodes/user-episode', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(episodeData)
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
            this.newSoundInstance.setPlaybackFinishedCallback(() => {
              let currentTime = null;
              let lastPlayed = new Date();
              this.removeCurrentEpisodeFromListeningTo(1)
              this.updateCurrentEpisodeStats(1, currentTime, lastPlayed);
            })
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
    const { currentlyOpenSwipeable } = this.props;
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
           <View style={styles.PodcastEpisodeList}>
            {this.filterEpisodes(Object.keys(this.props.inbox)).map(key => (
                <PodcastEpisodeListCard {...itemProps}
                  episode={this.props.inbox[key]}
                  handlePlay={this.handlePlay}
                  handleRemovePlayingEpisode={this.handleRemovePlayingEpisode}
                  id={key}
                  key={key}/>
              ))}
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PodcastEpisodeList:{
    width: '100%',
  },
})

export default connect(mapStateToProps)(PodcastEpisodeList);
