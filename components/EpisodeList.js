import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { convertMillis } from '../helpers';
import EpisodeListCard from './EpisodeListCard';

let _ = require('lodash')

const mapStateToProps = (state) => ({
  inbox: state.inbox,
  filters: state.inboxFilters
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

  filterEpisodes = (episodes) => {
    if (this.props.filters.liked === 'liked') {
      episodes = _.filter(episodes, function(episode) {
        return episode.liked === true;
      });
    }
    if (this.props.filters.liked === 'notLiked') {
      episodes = _.filter(episodes, function(episode) {
        return episode.liked === false;
      });
    }
    if (this.props.filters.bookmarked === 'bookmarked') {
      episodes = _.filter(episodes, function(episode) {
        return episode.bookmark === true;
      });
    }
    if (this.props.filters.bookmarked === 'notBookmarked') {
       episodes = _.filter(episodes, function(episode) {
        return episode.bookmark === false;
      });
    }
    if (this.props.filters.time !== 'timeOff') {
      if(this.props.filters.time === '5') {
        episodes = _.filter(episodes, function(episode) {
        return hmsToSecondsOnly(episode.feed.duration) < 300;
        });
      } else if (this.props.filters.time === '15') {
        episodes = _.filter(episodes, function(episode) {
        return hmsToSecondsOnly(episode.feed.duration) < 900;
        });
      } else if (this.props.filters.time === '30') {
        episodes = _.filter(episodes, function(episode) {
        return hmsToSecondsOnly(episode.feed.duration) < 1800;
        });
      }else if (this.props.filters.time === '45') {
        episodes = _.filter(episodes, function(episode) {
        return hmsToSecondsOnly(episode.feed.duration) < 2700;
        });
      }else if (this.props.filters.time === '60') {
        episodes = _.filter(episodes, function(episode) {
        return hmsToSecondsOnly(episode.feed.duration) < 3600;
        });
      }else if (this.props.filters.time === '60+') {
        episodes = _.filter(episodes, function(episode) {
        return hmsToSecondsOnly(episode.feed.duration) > 3600;
        });
      }
    }
    if (this.props.filters.tag !== 'All') {
      var tag = this.props.filters.tag;
      episodes = _.filter(episodes, function(episode) {
        return episode.tag === tag;
      })
    }
    return episodes;
  }

  handlePlay = (episode) => {
    if (this.newSoundInstance === null) {
      this.playNewEpisode(episode);
    } else {
      clearInterval(this.timer);
      this.newSoundInstance.stopAsync()
        .then(stopped => {
          this.props.dispatch(actionCreators.updateCurrentPlayingTime('0:00'));
          this.playNewEpisode(episode);
        });
    }
  }

  playNewEpisode = (episode) => {
    this.newSoundInstance = new Audio.Sound({ source: episode.feed.enclosure.url });
    this.props.dispatch(actionCreators.createNewSoundInstance(this.newSoundInstance));
    this.props.dispatch(actionCreators.setPlayStatus(true));
    this.props.dispatch(actionCreators.updateCurrentlyPlayingEpisode(episode.feed.title));
    this.newSoundInstance.loadAsync()
      .then(loaded => {
        this.newSoundInstance.playAsync()
          .then(played => {
            this.timer = setInterval(function() {
              this.newSoundInstance.getStatusAsync()
                .then(status => {
                  let millis = status.positionMillis
                  this.props.dispatch(actionCreators.updateCurrentPlayingTime(convertMillis(millis)));
                })
            }.bind(this), 100);
          })
      });
  }

  render() {
   return (
      <View style={styles.mainView}>
         <ScrollView style={styles.episodeList}>
          {this.filterEpisodes(this.props.inbox).map((episode, i) => (
              <EpisodeListCard episode={episode} handlePlay={this.handlePlay} id={i} key={i}/>
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
