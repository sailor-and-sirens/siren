import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, AppState} from 'react-native';
import { actionCreators as mainActions } from '../actions';
import { actionCreators as playerActions } from '../actions/Player';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import { convertMillis, hmsToSecondsOnly, updateInbox } from '../helpers';
import { removeCurrentEpisodeFromListeningTo } from '../helpers/playerHelpers.js';
import { getAllPlaylists } from '../helpers';
import EpisodeListCard from './EpisodeListCard';
import Spinner from 'react-native-loading-spinner-overlay';

let _ = require('lodash');

const mapStateToProps = (state) => ({
  currentEpisodeId: state.player.currentEpisodeId,
  currentlyOpenSwipeable: state.swipe.currentlyOpenSwipeable,
  filters: state.main.inboxFilters,
  inbox: state.main.inbox,
  currentSoundInstance: state.player.currentSoundInstance,
  token: state.main.token,
  timer: state.player.timer,
  visible: state.podcasts.searchSpinner,
  allplaylists: state.playlist.allplaylists,
  view: state.header.view
});

class EpisodeList extends Component {

  currentPlaylistId = null;

  componentWillMount = () => {
    this.view = this.props.view.split(' ');
    this.viewEnd = this.view[this.view.length - 1];
  }

  componentWillUpdate = () => {
    this.view = this.props.view.split(' ');
    this.viewEnd = this.view[this.view.length - 1];
  }

  componentDidMount = () => {
    //temporary fix for blank inbox on login
    // updateInbox(this.props);
    if(this.props.inbox.length === 0 || !this.props.allplaylists.length) {
      updateInbox(this.props);
      getAllPlaylists(this.props);
    }
    if (this.props.view !== "Inbox"){
      this.currentPlaylistId = this.props.allplaylists.find(playlist => playlist.name === this.props.filters.playlist).id;
    }
    AppState.addEventListener('change', this.updateInboxOnActive);
  }

  updateInboxOnActive = () => {
    updateInbox(this.props);
  }

  filterEpisodes = (keys) => {
    if (this.props.filters.playlist !== 'All Playlists') {
      this.playlist = this.props.allplaylists.filter(playlist => playlist.name === this.props.filters.playlist);
      if(this.playlist.length) {
        keys = this.playlist[0].Episodes.map(episode => episode.id);
        keys = keys.filter(key => this.props.inbox.hasOwnProperty(key));
      }
    }
    if (this.props.filters.liked === 'liked') {
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].liked === true;
      });
    }
    if (this.props.filters.liked === 'notLiked') {
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].liked === false || this.props.inbox[key].liked === null;
      });
    }
    if (this.props.filters.bookmarked === 'bookmarked') {
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].bookmark === true;
      });
    }
    if (this.props.filters.bookmarked === 'notBookmarked') {
       keys = _.filter(keys, (key) => {
        return this.props.inbox[key].bookmark === false || this.props.inbox[key].bookmark === null;
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
    if (this.props.filters.tag !== 'All Tags') {
      var tag = this.props.filters.tag;
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].tag === tag;
      })
    }
    if (this.props.filters.name !== 'All Podcasts') {
      var name = this.props.filters.name;
      keys = _.filter(keys, (key) => {
        return this.props.inbox[key].title === name;
      })
    }
    return keys;
  }

  handlePlay = (episode, episodeId) => {
    let newEpisodeCurrentTime = episode.currentTime;
    let newEpisodeLastPlayed = new Date();
    if (newEpisodeCurrentTime === null) newEpisodeCurrentTime = 0;

    if (this.props.currentSoundInstance === null) {
      this.props.dispatch(playerActions.updateCurrentEpisodeId(episodeId));
      this.addEpisodeToListeningTo(episodeId);
      this.updateCurrentEpisodeStats(episodeId, newEpisodeCurrentTime, newEpisodeLastPlayed);
      this.playNewEpisode(episode, episodeId, newEpisodeCurrentTime);
    } else {
      this.props.currentSoundInstance.getStatusAsync()
      .then(status => {
        clearInterval(this.props.timer);
        let currentEpisodeCurrentTime = status.positionMillis;
        let currentEpisodeLastPlayed = new Date();
        this.updateCurrentEpisodeStats(this.props.currentEpisodeId, currentEpisodeCurrentTime, currentEpisodeLastPlayed);
        this.updateCurrentEpisodeStats(episodeId, newEpisodeCurrentTime, newEpisodeLastPlayed);
        this.addEpisodeToListeningTo(episodeId);
        this.props.currentSoundInstance.stopAsync()
        .then(() => {
          this.props.dispatch(playerActions.updateCurrentEpisodeId(episodeId));
          this.props.dispatch(playerActions.updateCurrentPlayingTime('0:00'));
          this.playNewEpisode(episode, episodeId, newEpisodeCurrentTime);
        });
      })
      .catch(console.log);
    }
  }

  addEpisodeToListeningTo = (episodeId) => {
    let episodeData = { episodeId };
    fetch('http://siren-server.herokuapp.com/api/playlists/listening-to', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(console.log);
  }

  updateCurrentEpisodeStats = (episodeId, currentTime, lastPlayed) => {
    let episodeData = { episodeId, currentTime, lastPlayed };
    this.props.dispatch(mainActions.updateEpisodeCurrentTime({
      id: episodeId,
      currentTime: currentTime
    }));
    fetch('http://siren-server.herokuapp.com/api/episodes/user-episode', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(console.log);
  }

  playNewEpisode = (episode, episodeId, currentEpisodeTime) => {
    let newSoundInstance = new Audio.Sound({ source: episode.feed.enclosure.url });
    this.props.dispatch(playerActions.createNewSoundInstance(newSoundInstance));
    this.props.dispatch(playerActions.setPlayStatus(true));
    this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode('LOADING'));
    this.props.dispatch(playerActions.storeEpisodeData(episode));
    newSoundInstance.loadAsync()
      .then(() => {
        newSoundInstance.playAsync()
          .then(() => {
            newSoundInstance.setPositionAsync(currentEpisodeTime);
            newSoundInstance.setPlaybackFinishedCallback(() => {
              let currentTime = null;
              let lastPlayed = new Date();
              removeCurrentEpisodeFromListeningTo(this.props.token, episodeId);
              this.updateCurrentEpisodeStats(episodeId, currentTime, lastPlayed);
            })
            this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode(episode.feed.title));
            let timer = setInterval(function() {
              newSoundInstance.getStatusAsync()
                .then(status => {
                  let millis = status.positionMillis
                  this.props.dispatch(playerActions.updateCurrentPlayingTime(convertMillis(millis)));
                })
            }.bind(this), 100);
            this.props.dispatch(playerActions.storeTimer(timer));
          })
      });
  }

  handleRemoveEpisodeFromInbox = (id, playingEpisode, selectedEpisode) => {
    if (playingEpisode && playingEpisode.feed.enclosure.url === selectedEpisode.feed.enclosure.url) {
      this.handleRemovePlayingEpisode(id);
    } else {
      this.props.dispatch(mainActions.removeEpisodeFromInbox(id));
    }

    let episodeData = { episodeId: id };
    fetch('http://siren-server.herokuapp.com/api/episodes/user-episode-inbox', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(console.log);
  }

  handleRemoveEpisodeFromPlaylist = (id, playingEpisode, selectedEpisode) => {
    let episodeData = { episodeId: id, playlistId: this.currentPlaylistId };
    if (playingEpisode && playingEpisode.feed.enclosure.url === selectedEpisode.feed.enclosure.url) {
      this.handleRemovePlayingEpisode(id);
    } else {
      this.props.dispatch(playlistActions.removeEpisodeFromPlaylist(episodeData));
    }
    fetch('http://siren-server.herokuapp.com/api/playlists/remove-episode', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .then(() => getAllPlaylists(this.props))
    .catch(console.log);
  }

  handleRemovePlayingEpisode = (id) => {
    this.props.currentSoundInstance.stopAsync()
    .then(() => {
      this.props.dispatch(playerActions.createNewSoundInstance(null));
      this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode(null));
      this.props.dispatch(playerActions.setPlayStatus(false));
      if(this.props.view === "Inbox") {
        this.props.dispatch(mainActions.removeEpisodeFromInbox(id));
      } else {
        this.props.dispatch(playlistActions.removeEpisodeFromPlaylist(episodeData));
      }
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
        {this.props.visible ?
           <Spinner visible={this.props.visible} textContent={`Loading ${this.props.view} ...`} textStyle={{color: '#FFF'}} />  :
         <ScrollView style={styles.episodeList}>

         {this.viewEnd === "Playlist" && this.props.view !== 'Inbox' ?
        this.props.allplaylists.filter((playlist) => playlist.name === this.props.filters.playlist)[0].Episodes.map(episode => {
           episode.episodeTitle = episode.title;
           episode.image = episode.Podcast.artworkUrl;
           episode.image600 = episode.Podcast.artworkUrl600;
           episode.tag = episode.Podcast.primaryGenreName;
           episode.liked = episode.Users[0].UserEpisode.liked;
           episode.bookmark = episode.Users[0].UserEpisode.bookmarked;
           episode.feed.pubDate = episode.feed.published;
             return (<EpisodeListCard {...itemProps}
               episode={episode}
               handlePlay={this.handlePlay}
               handleRemovePlayingEpisode={this.handleRemovePlayingEpisode}
               handleRemoveEpisode={this.handleRemoveEpisodeFromPlaylist}
               id={episode.id}
               key={episode.id}/>)
           })

          :

          this.filterEpisodes(Object.keys(this.props.inbox)).map(key => (
              <EpisodeListCard {...itemProps}
                episode={this.props.inbox[key]}
                handlePlay={this.handlePlay}
                handleRemovePlayingEpisode={this.handleRemovePlayingEpisode}
                handleRemoveEpisode={this.handleRemoveEpisodeFromInbox}
                id={key}
                key={key}/>
            ))
          }

        </ScrollView>}
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
