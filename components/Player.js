import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator, AppState } from 'react-native';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/Player';
import { actionCreators as mainActions } from '../actions';
import { convertMillis } from '../helpers';
import { removeCurrentEpisodeFromListeningTo } from '../helpers/playerHelpers.js';
import PlayerSpeedModal from './PlayerSpeedModal';
import PlayerFullSizeModal from './PlayerFullSizeModal';

const mapStateToProps = (state) => ({
  currentEpisode: state.player.currentEpisode,
  currentEpisodeTitle: state.player.currentEpisodeTitle,
  currentPlayingTime: state.player.currentPlayingTime,
  currentSoundInstance: state.player.currentSoundInstance,
  currentSpeed: state.player.currentSpeed,
  isModalVisible: state.player.isModalVisible,
  isFullSizeModalVisible: state.player.isFullSizeModalVisible,
  isPlaying: state.player.isPlaying,
  inbox: state.main.inbox,
  token: state.main.token
});

const { width } = Dimensions.get('window');

class Player extends Component {

  componentDidMount = () => {
    Audio.setIsEnabledAsync(true);
    this.loadEpisode();
    AppState.addEventListener('change', this.handleAppClose);
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change');
  }

  loadEpisode = () => {
    fetch('http://siren-server.herokuapp.com/api/episodes/currently-playing', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': this.props.token
      }
    })
    .then(response => response.json())
    .then(episode => {
      if (episode !== null) {
        let newSoundInstance = new Audio.Sound({ source: episode.feed.enclosure.url });
        this.props.dispatch(playerActions.updateCurrentEpisodeId(episode.EpisodeId));
        this.props.dispatch(playerActions.storeEpisodeData(episode));
        this.props.dispatch(playerActions.updateCurrentlyPlayingEpisode(episode.episodeTitle));
        this.props.dispatch(playerActions.createNewSoundInstance(newSoundInstance));
        newSoundInstance.loadAsync()
        .then(() => {
          newSoundInstance.setPlaybackFinishedCallback(() => {
            let currentTime = null;
            let lastPlayed = new Date();
            removeCurrentEpisodeFromListeningTo(this.props.token, episode.EpisodeId);
            this.updateCurrentEpisodeStats(episode.EpisodeId, currentTime, lastPlayed);
          });
          newSoundInstance.setPositionAsync(episode.currentTime);
          let timer = setInterval(function() {
            newSoundInstance.getStatusAsync()
              .then(status => {
                let millis = status.positionMillis
                this.props.dispatch(playerActions.updateCurrentPlayingTime(convertMillis(millis)));
              })
          }.bind(this), 100);
          this.props.dispatch(playerActions.storeTimer(timer));
        })
      }
    })
    .catch(console.log);
  }

  handleAppClose = () => {
    if (['inactive', 'background'].includes(AppState.currentState) && this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
      .then(status => {
        let currentTime = status.positionMillis;
        let lastPlayed = new Date();
        this.updateCurrentEpisodeStats(this.props.currentEpisode.EpisodeId, currentTime, lastPlayed);
      })
    }
  }

  handlePlay = () => {
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentTime = status.positionMillis;
          let lastPlayed = new Date();
          this.updateCurrentEpisodeStats(this.props.currentEpisode.EpisodeId, currentTime, lastPlayed);
          this.props.currentSoundInstance.playAsync()
            .then(() => {
              this.props.dispatch(playerActions.setPlayStatus(true));
            })
        })
        .catch(error => console.log(error));
    }
  }

  handlePause = () => {
    this.props.currentSoundInstance.pauseAsync()
      .then(() => {
        this.props.dispatch(playerActions.setPlayStatus(false));
        this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentTime = status.positionMillis;
          let lastPlayed = new Date();
          this.updateCurrentEpisodeStats(this.props.currentEpisode.EpisodeId, currentTime, lastPlayed);
          this.props.dispatch(mainActions.updateEpisodeCurrentTime({
            id: this.props.currentEpisode.EpisodeId,
            currentTime: currentTime
          }));
        });
      })
      .catch(console.log);
  }

  updateCurrentEpisodeStats = (episodeId, currentTime, lastPlayed) => {
    this.props.dispatch(mainActions.updateEpisodeCurrentTime({
      id: episodeId,
      currentTime: currentTime
    }));
    let episodeData = { episodeId, currentTime, lastPlayed };
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

  handleSkipBack = () => {
    if (this.props.currentSoundInstance !== null) {
      let secondsToMillis = (seconds => seconds * 1000);
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentPosition = status.positionMillis;
          this.props.currentSoundInstance.setPositionAsync((currentPosition - secondsToMillis(15)));
        })
        .catch(console.log);
    }
  }

  handleSkipAhead = () => {
    if (this.props.currentSoundInstance !== null) {
      let secondsToMillis = (seconds => seconds * 1000);
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentPosition = status.positionMillis;
          this.props.currentSoundInstance.setPositionAsync((currentPosition + secondsToMillis(15)));
        })
        .catch(console.log);
    }
  }

  handleSkipToBeginning = () => {
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
        .then(() => this.props.currentSoundInstance.setPositionAsync(0))
        .catch(console.log);
    }
  }

  handleSkipToEnd = () => {
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.setPositionAsync(this.props.currentSoundInstance.getDurationMillis())
        .then(() => this.props.dispatch(playerActions.setPlayStatus(false)))
        .catch(console.log);
    }
  }

  handleDecreaseSpeed = () => {
    if (this.props.currentSoundInstance !== null && this.props.currentSpeed > 0.75) {
      this.props.currentSoundInstance.setRateAsync(this.props.currentSpeed - 0.25, true)
        .then(()=> this.props.dispatch(playerActions.decreaseSpeed(0.25)))
        .catch(console.log);
    }
  }

  handleIncreaseSpeed = () => {
    if (this.props.currentSoundInstance !== null && this.props.currentSpeed < 2.5) {
      this.props.currentSoundInstance.setRateAsync(this.props.currentSpeed + 0.25, true)
        .then(() => this.props.dispatch(playerActions.increaseSpeed(0.25)))
        .catch(console.log);
    }
  }

  handleSpeedButtonPress = () => {
    this.props.dispatch(playerActions.setModalVisible(true));
  }

  handleModalClose = () => {
    this.props.dispatch(playerActions.setModalVisible(false));
  }

  handleFullSizeButtonPress = () => {
    this.props.dispatch(playerActions.setFullSizeModalVisible(true));
  }

  handleFullSizeModalClose = () => {
    this.props.dispatch(playerActions.setFullSizeModalVisible(false));
  }

  render() {
    let playerFullSizeModal;
    let openModalButton;
    let playPauseButton = (
      <TouchableOpacity onPress={this.handlePlay}>
        <FontAwesome style={styles.icon} name="play" size={40} color="#000" />
      </TouchableOpacity>
    )

    if (this.props.isPlaying) {
      playPauseButton = (
        <TouchableOpacity onPress={this.handlePause}>
          <SimpleLineIcons style={styles.icon} name="control-pause" size={40} color="#000" />
        </TouchableOpacity>
      )
    }

    if (this.props.currentSoundInstance !== null) {
      playerFullSizeModal = (
        <PlayerFullSizeModal
          currentPlayingTime={this.props.currentPlayingTime}
          currentSpeed={this.props.currentSpeed}
          dispatch={this.props.dispatch}
          episode={this.props.currentEpisode}
          handleFullSizeModalClose={this.handleFullSizeModalClose}
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleSkipBack={this.handleSkipBack}
          handleSkipAhead={this.handleSkipAhead}
          handleSkipToBeginning={this.handleSkipToBeginning}
          handleSkipToEnd={this.handleSkipToEnd}
          handleIncreaseSpeed={this.handleIncreaseSpeed}
          handleDecreaseSpeed={this.handleDecreaseSpeed}
          inbox={this.props.inbox}
          isFullSizeModalVisible={this.props.isFullSizeModalVisible}
          isPlaying={this.props.isPlaying}
          token={this.props.token}
        />
      )

      openModalButton = (
        <TouchableOpacity onPress={this.handleFullSizeButtonPress}>
          <SimpleLineIcons name="arrow-up" size={20} style={styles.icon} color='#000'/>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.topRowWrapper}>
          <View style={styles.topRowLeft}>{openModalButton}</View>
          <View style={styles.topRowMiddle}>
            {this.props.currentEpisodeTitle === 'LOADING' ?
              <ActivityIndicator animating={true} size="small" />  :
              <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#000'}} numberOfLines={1} ellipsizeMode='tail'>{this.props.currentEpisodeTitle}</Text>
            }
          </View>
          <View style={styles.topRowRight}></View>
        </View>
        <View style={styles.timeSpeedPlayerWrapper}>
          <View style={styles.currentTimeWrapper}>
            <View style={styles.currentTime}>
              <Text style={{textAlign: 'left', color: '#000'}}><SimpleLineIcons style={styles.icon} name="clock" size={20} color="#000" /> {this.props.currentPlayingTime}</Text>
            </View>
          </View>
          <View style={styles.playerControls}>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipToBeginning}>
                <SimpleLineIcons style={styles.icon} name="control-start" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipBack}>
                <SimpleLineIcons style={styles.icon} name="control-rewind" size={25} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.playButton}>
              {playPauseButton}
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipAhead}>
                <SimpleLineIcons style={styles.icon} name="control-forward" size={25} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipToEnd}>
                <SimpleLineIcons style={styles.icon} name="control-end" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.currentSpeedWrapper}>
            <View style={styles.currentSpeed}>
              <TouchableOpacity onPress={this.handleSpeedButtonPress}>
                <Text style={{textAlign: 'right', color: '#000'}}><SimpleLineIcons style={styles.icon} name="speedometer" size={20} color="#000" /> {this.props.currentSpeed}x </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PlayerSpeedModal
          currentSpeed={this.props.currentSpeed}
          isModalVisible={this.props.isModalVisible}
          handleDecreaseSpeed={this.handleDecreaseSpeed}
          handleIncreaseSpeed={this.handleIncreaseSpeed}
          handleModalClose={this.handleModalClose}
        />
        {playerFullSizeModal}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#BCDDD4',
  },
  topRowWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    marginBottom: 10
  },
  topRowLeft: {
    flex: 0.10,
    alignItems: 'flex-start'
  },
  topRowMiddle: {
    flex: 0.8,
    alignItems: 'center'
  },
  topRowRight: {
    flex: 0.10,
    alignItems: 'flex-end'
  },
  currentlyPlayingWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  currentlyPlaying: {
    flex: 1,
    borderWidth: 1
  },
  timeSpeedPlayerWrapper: {
    flex: 0.8,
    flexDirection: 'row'
  },
  currentTimeWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  currentTime: {
    flex: 1
  },
  playerControls: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playButton: {
    flex: 0.2
  },
  skipButton: {
    flex: 0.2
  },
  currentSpeedWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  currentSpeed: {
    flex: 1
  },
  icon: {
    textAlign: 'center',
    textShadowColor: '#999',
    textShadowOffset: {width: 1.25, height: 1.25},
    textShadowRadius: 2
  }
});

export default connect(mapStateToProps)(Player);
