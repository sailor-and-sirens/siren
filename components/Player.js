import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, ActivityIndicator, AppState } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/Player';
import { truncateTitle, convertMillis } from '../helpers';
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
  isPlaying: state.player.isPlaying
});

const { height, width } = Dimensions.get('window');

class Player extends Component {

  componentDidMount = () => {
    AppState.addEventListener('change', this.handleAppClose);
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change');
  }

  handleAppClose = () => {
    if (['inactive', 'background'].includes(AppState.currentState) && this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
      .then(status => {
        let currentTime = status.positionMillis;
        let lastPlayed = new Date();
        this.updateCurrentEpisodeStats(1, currentTime, lastPlayed);
      })
    }
  }

  handlePlay = (url) => {
    // TODO Replace hardcoded episodeId w/ real EpisodeId
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentTime = status.positionMillis;
          let lastPlayed = new Date();
          this.updateCurrentEpisodeStats(1, currentTime, lastPlayed);
          this.props.currentSoundInstance.playAsync()
            .then(played => {
              this.props.dispatch(actionCreators.setPlayStatus(true));
            })
        })
        .catch(error => console.log(error));
    }
  }

  handlePause = () => {
    // TODO Replace hardcoded episodeId w/ real EpisodeId
    this.props.currentSoundInstance.pauseAsync()
      .then(paused => {
        this.props.dispatch(actionCreators.setPlayStatus(false));
        this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentTime = status.positionMillis;
          let lastPlayed = new Date();
          this.updateCurrentEpisodeStats(1, currentTime, lastPlayed);
        });
      })
      .catch(error => console.log(error));
  }

  updateCurrentEpisodeStats = (episodeId, currentTime, lastPlayed) => {
    let episodeData = { episodeId, currentTime, lastPlayed };
    fetch('http://localhost:3000/api/episodes/user-episode', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(episodeData)
    })
    .catch(err => console.warn(err));
  }

  handleSkipBack = () => {
    if (this.props.currentSoundInstance !== null) {
      let secondsToMillis = (seconds => seconds * 1000);
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentPosition = status.positionMillis;
          this.props.currentSoundInstance.setPositionAsync((currentPosition - secondsToMillis(15)));
        })
        .catch(error => console.log(error));
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
        .catch(error => console.log(error));
    }
  }

  handleSkipToBeginning = () => {
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => this.props.currentSoundInstance.setPositionAsync(0))
        .catch(error => console.log(error));
    }
  }

  handleSkipToEnd = () => {
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.setPositionAsync(this.props.currentSoundInstance.getDurationMillis())
        .then(endOfSong => this.props.dispatch(actionCreators.setPlayStatus(false)))
        .catch(error => console.log(error));
    }
  }

  handleDecreaseSpeed = () => {
    if (this.props.currentSoundInstance !== null && this.props.currentSpeed > 0.75) {
      this.props.currentSoundInstance.setRateAsync(this.props.currentSpeed - 0.25, true)
        .then(status => this.props.dispatch(actionCreators.decreaseSpeed(0.25)))
        .catch(error => console.log(error));
    }
  }

  handleIncreaseSpeed = () => {
    if (this.props.currentSoundInstance !== null && this.props.currentSpeed < 2.5) {
      this.props.currentSoundInstance.setRateAsync(this.props.currentSpeed + 0.25, true)
        .then(status => this.props.dispatch(actionCreators.increaseSpeed(0.25)))
        .catch(error => console.log(error));
    }
  }

  handleSpeedButtonPress = () => {
    this.props.dispatch(actionCreators.setModalVisible(true));
  }

  handleModalClose = () => {
    this.props.dispatch(actionCreators.setModalVisible(false));
  }

  handleFullSizeButtonPress = () => {
    this.props.dispatch(actionCreators.setFullSizeModalVisible(true));
  }

  handleFullSizeModalClose = () => {
    this.props.dispatch(actionCreators.setFullSizeModalVisible(false));
  }

  render() {
    let playerFullSizeModal;
    let openModalButton;
    let playPauseButton = (
      <TouchableOpacity onPress={this.handlePlay}>
        <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={40} color="black" />
      </TouchableOpacity>
    )

    if (this.props.isPlaying) {
      playPauseButton = (
        <TouchableOpacity onPress={this.handlePause}>
          <SimpleLineIcons style={{textAlign: 'center'}} name="control-pause" size={40} color="black" />
        </TouchableOpacity>
      )
    }

    if (this.props.currentSoundInstance !== null) {
      playerFullSizeModal = (
        <PlayerFullSizeModal
          currentPlayingTime={this.props.currentPlayingTime}
          currentSpeed={this.props.currentSpeed}
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
          isFullSizeModalVisible={this.props.isFullSizeModalVisible}
          isPlaying={this.props.isPlaying}
        />
      )

      openModalButton = (
        <TouchableOpacity onPress={this.handleFullSizeButtonPress}>
          <SimpleLineIcons name="arrow-up" size={20}/>
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
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{truncateTitle(this.props.currentEpisodeTitle)}</Text>
            }
          </View>
          <View style={styles.topRowRight}></View>
        </View>
        <View style={styles.timeSpeedPlayerWrapper}>
          <View style={styles.currentTimeWrapper}>
            <View style={styles.currentTime}>
              <Text style={{textAlign: 'left'}}><SimpleLineIcons style={{textAlign: 'center'}} name="clock" size={20} color="black" /> {this.props.currentPlayingTime}</Text>
            </View>
          </View>
          <View style={styles.playerControls}>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipToBeginning}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-start" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipBack}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-rewind" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.playButton}>
              {playPauseButton}
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipAhead}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-forward" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipToEnd}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-end" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.currentSpeedWrapper}>
            <View style={styles.currentSpeed}>
              <TouchableOpacity onPress={this.handleSpeedButtonPress}>
                <Text style={{textAlign: 'right'}}><SimpleLineIcons style={{textAlign: 'center'}} name="speedometer" size={20} color="black" /> {this.props.currentSpeed}x </Text>
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
    backgroundColor: '#dcdcdc',
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
  }
});

export default connect(mapStateToProps)(Player);
