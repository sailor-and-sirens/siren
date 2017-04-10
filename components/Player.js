import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { truncateTitle, convertMillis } from '../helpers'

const mapStateToProps = (state) => ({
  currentEpisode: state.currentEpisode,
  isPlaying: state.isPlaying,
  currentPlayingTime: state.currentPlayingTime
});

class Player extends Component {
  constructor(props) {
    super(props);
    this.audioSound = '';
    this.timer = '';
  }

  handlePlay = (url) => {
    let _this = this;
    if (_this.audioSound === '') {
      Audio.setIsEnabledAsync(true)
        .then(enabled => {
          _this.audioSound = new Audio.Sound({ source: url });
          _this.audioSound.loadAsync()
            .then(loaded => {
              _this.audioSound.playAsync()
                .then(played => {
                  _this.props.dispatch(actionCreators.setPlayPause(true));
                  _this.timer = setInterval(function() {
                    _this.audioSound.getStatusAsync()
                      .then(status => {
                        let millis = status.positionMillis
                        _this.props.dispatch(actionCreators.updateCurrentPlayingTime(convertMillis(millis)));
                      })
                  }, 100);
                })
            })
        })
          .catch(function(err) {
            console.warn(err);
          })
    } else {
      _this.audioSound.stopAsync()
        .then(stopped => {
          _this.audioSound.playAsync()
            .then(played => {
              _this.props.dispatch(actionCreators.setPlayPause(true));
            })
        })
    }
  }

  handlePause = () => {
    let _this = this;
    _this.audioSound.pauseAsync()
      .then(paused => {
        _this.props.dispatch(actionCreators.setPlayPause(false));
      })
  }

  handleSkipBack = () => {
    let _this = this;
    if (_this.audioSound !== '') {
      let secondsToMillis = (seconds => seconds * 1000);
      _this.audioSound.getStatusAsync()
      .then(status => {
        let currentPosition = status.positionMillis;
        _this.audioSound.setPositionAsync((currentPosition - secondsToMillis(15)));
      });
    }
  }

  handleSkipAhead = () => {
    let _this = this;
    if (_this.audioSound !== '') {
      let secondsToMillis = (seconds => seconds * 1000);
      _this.audioSound.getStatusAsync()
        .then(status => {
          let currentPosition = status.positionMillis;
          _this.audioSound.setPositionAsync((currentPosition + secondsToMillis(15)));
        });
    }
  }

  handleSkipToBeginning = () => {

  }

  handleSkipToEnd = () => {

  }

  render() {
    let playPauseButton = <TouchableOpacity onPress={this.handlePlay.bind(this, this.props.currentEpisode.url)}>
      <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={35} color="black" />
    </TouchableOpacity>

    if (this.props.isPlaying) {
      playPauseButton = <TouchableOpacity onPress={this.handlePause}>
        <SimpleLineIcons style={{textAlign: 'center'}} name="control-pause" size={35} color="black" />
      </TouchableOpacity>
    }
    return (
      <View style={styles.container}>
        <View style={styles.currentlyPlayingWrapper}>
          <View style={styles.currentlyPlaying}>
            <Text style={{textAlign: 'center'}}>{truncateTitle(this.props.currentEpisode.title)}</Text>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-end" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.currentSpeedWrapper}>
            <View style={styles.currentSpeed}>
              <Text style={{textAlign: 'right'}}><SimpleLineIcons style={{textAlign: 'center'}} name="speedometer" size={15} color="black" /> 1.5x </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#dcdcdc',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
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
  }
});

export default connect(mapStateToProps)(Player);
