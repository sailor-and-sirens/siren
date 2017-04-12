import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { convertMillis } from '../helpers';
import EpisodeListCard from './EpisodeListCard';

const mapStateToProps = (state) => ({
  inbox: state.inbox
});

class EpisodeList extends Component {
  newSoundInstance = null;
  timer = null;

  componentDidMount = () => {
    Audio.setIsEnabledAsync(true);
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
    this.props.dispatch(actionCreators.storeEpisodeData(episode));
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
          {this.props.inbox.map((episode, i) => (
              <EpisodeListCard episode={episode} handlePlay={this.handlePlay} key={i}/>
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
  },
})

export default connect(mapStateToProps)(EpisodeList);
