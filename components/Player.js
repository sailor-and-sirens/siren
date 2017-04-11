import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { truncateTitle, convertMillis } from '../helpers';

const mapStateToProps = (state) => ({
  currentEpisodeTitle: state.currentEpisodeTitle,
  currentPlayingTime: state.currentPlayingTime,
  currentSoundInstance: state.currentSoundInstance,
  currentSpeed: state.currentSpeed,
  isModalVisible: state.isModalVisible,
  isPlaying: state.isPlaying
});

const { height, width } = Dimensions.get('window');

class Player extends Component {
  constructor(props) {
    super(props);
    this.audioSound = '';
    this.timer = '';
  }

  handlePlay = (url) => {
    if (this.props.currentSoundInstance !== null) {
      this.props.currentSoundInstance.getStatusAsync()
        .then(status => {
          let currentPosition = status.positionMillis;
          this.props.currentSoundInstance.playAsync()
            .then(played => {
              this.props.dispatch(actionCreators.setPlayStatus(true));
            })
        })
        .catch(error => console.log(error));
    }
  }

  handlePause = () => {
    this.props.currentSoundInstance.pauseAsync()
      .then(paused => {
        this.props.dispatch(actionCreators.setPlayStatus(false));
      })
      .catch(error => console.log(error));
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

  render() {
    let playPauseButton = (
      <TouchableOpacity onPress={this.handlePlay}>
        <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={35} color="black" />
      </TouchableOpacity>
    )

    if (this.props.isPlaying) {
      playPauseButton = (
        <TouchableOpacity onPress={this.handlePause}>
          <SimpleLineIcons style={{textAlign: 'center'}} name="control-pause" size={35} color="black" />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.currentlyPlayingWrapper}>
          <View style={styles.currentlyPlaying}>
            <Text style={{textAlign: 'center'}}>{truncateTitle(this.props.currentEpisodeTitle)}</Text>
          </View>
        </View>
        <View style={styles.timeSpeedPlayerWrapper}>
          <View style={styles.currentTimeWrapper}>
            <View style={styles.currentTime}>
              <Text style={{textAlign: 'left'}}><SimpleLineIcons style={{textAlign: 'center'}} name="clock" size={15} color="black" /> {this.props.currentPlayingTime}</Text>
            </View>
          </View>
          <View style={styles.playerControls}>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipToBeginning}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-start" size={15} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipBack}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-rewind" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.playButton}>
              {playPauseButton}
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipAhead}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-forward" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={this.handleSkipToEnd}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-end" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.currentSpeedWrapper}>
            <View style={styles.currentSpeed}>
              <TouchableOpacity onPress={this.handleSpeedButtonPress}>
                <Text style={{textAlign: 'right'}}><SimpleLineIcons style={{textAlign: 'center'}} name="speedometer" size={15} color="black" /> {this.props.currentSpeed}x </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.props.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalWrapper}>
              <View style={styles.modalCurrentSpeed}>
                <Text>Change Playback Speed</Text>
                <Text style={{textAlign: 'center', fontWeight: 'bold',  marginTop: 5, marginBottom: 5}}>{this.props.currentSpeed}x</Text>
                <View style={styles.modalSpeedButtons}>
                  <TouchableOpacity onPress={this.handleDecreaseSpeed}><SimpleLineIcons style={{textAlign: 'center', marginRight: 2}} name="minus" size={20} color="black" /></TouchableOpacity>
                  <TouchableOpacity onPress={this.handleIncreaseSpeed}><SimpleLineIcons style={{textAlign: 'center', marginLeft: 2}} name="plus" size={20} color="black" /></TouchableOpacity>
                </View>
              </View>
              <View style={{position: 'absolute', bottom: 5, right: 5}}>
                <TouchableOpacity onPress={this.handleModalClose}><SimpleLineIcons name="close" size={20} color="black" /></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // width: width,
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#dcdcdc',
  },
  currentlyPlayingWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  currentlyPlaying: {
    flex: 1
  },
  timeSpeedPlayerWrapper: {
    flex: 0.7,
    flexDirection: 'row'
  },
  currentTimeWrapper: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  currentTime: {
    flex: 1
  },
  playerControls: {
    flex: 0.5,
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
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  currentSpeed: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWrapper: {
    height: 75,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#dcdcdc',
  },
  modalCurrentSpeed: {
    flex: 1
  },
  modalSpeedButtons: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps)(Player);
