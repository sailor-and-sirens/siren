import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/Player';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { convertMillis, hmsToSecondsOnly } from '../helpers';
import { actionCreators as mainActions } from '../actions';
import EpisodeListCard from './EpisodeListCard';
import AddPlaylistModal from './AddPlaylistModal';
import moment from 'moment';

let _ = require('lodash');

const mapStateToProps = (state) => ({
  currentlyOpenSwipeable: state.swipe.currentlyOpenSwipeable,
  filters: state.main.inboxFilters,
  inbox: state.main.inbox,
  isAddPlaylistModalVisible: state.swipe.isAddPlaylistModalVisible,
  token: state.main.token
});

class EpisodeList extends Component {

  currentEpisodeId = null;
  newSoundInstance = null;
  timer = null;

  componentDidMount = () => {
    Audio.setIsEnabledAsync(true);
    this.updateInbox();
  }

  updateInbox = () => {
    fetch("http://siren-server.herokuapp.com/api/users/inbox", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
    })
    .then(inbox => inbox.json())
    .then((inbox) => {
      this.props.dispatch(mainActions.updateInbox(inbox));
    })
    .catch((err) => console.warn(err));
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
      } else if (this.props.filters.time === '45') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 2700;
        });
      } else if (this.props.filters.time === '60') {
        keys = _.filter(keys, (key) => {
        return hmsToSecondsOnly(this.props.inbox[key].feed.duration) < 3600;
        });
      } else if (this.props.filters.time === '60+') {
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

  handlePlay = (episode, episodeId) => {
    let newEpisodeCurrentTime = 0;
    let newEpisodeLastPlayed = new Date();

    if (this.newSoundInstance === null) {
      this.currentEpisodeId = episodeId;
      this.addEpisodeToListeningTo(episodeId);
      this.updateCurrentEpisodeStats(episodeId, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.playNewEpisode(episode, episodeId);
    } else {
      clearInterval(this.timer);
      this.newSoundInstance.getStatusAsync()
      .then(status => {
        let currentEpisodeCurrentTime = status.positionMillis;
        let currentEpisodeLastPlayed = new Date();
        this.updateCurrentEpisodeStats(this.currentEpisodeId, currentEpisodeCurrentTime, currentEpisodeLastPlayed);
      });
      this.updateCurrentEpisodeStats(episodeId, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.addEpisodeToListeningTo(episodeId);
      this.newSoundInstance.stopAsync()
        .then(stopped => {
          this.currentEpisodeId = episodeId;
          this.props.dispatch(playerActions.updateCurrentPlayingTime('0:00'));
          this.playNewEpisode(episode, episodeId);
        });
    }
  }

  addEpisodeToListeningTo = (episodeId) => {
    let episodeData = { episodeId };
    fetch('http://localhost:3000/api/playlists/listening-to', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(err => console.warn(err));
  }

  removeCurrentEpisodeFromListeningTo = (episodeId) => {
    let episodeData = { episodeId };
    fetch('http://localhost:3000/api/playlists/listening-to', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(err => console.warn(err));
  }

  updateCurrentEpisodeStats = (episodeId, currentTime, lastPlayed) => {
    let episodeData = { episodeId, currentTime, lastPlayed };
    fetch('http://siren-server.herokuapp.com/api/episodes/user-episode', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(err => console.warn(err));
  }

  playNewEpisode = (episode, episodeId) => {
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
              this.removeCurrentEpisodeFromListeningTo(episodeId)
              this.updateCurrentEpisodeStats(episodeId, currentTime, lastPlayed);
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
        <AddPlaylistModal />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episodeList:{
    width: '100%',
    marginBottom: 80,
  },
})

export default connect(mapStateToProps)(EpisodeList);
