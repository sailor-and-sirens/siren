import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  greeting: state.greeting
});

const {height, width} = Dimensions.get('window');

class Player extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currentlyPlayingWrapper}>
          <View style={styles.currentlyPlaying}>
            <Text style={{textAlign: 'center'}}>The Tim Ferriss Show: Episode #232</Text>
          </View>
        </View>
        <View style={styles.timeSpeedPlayerWrapper}>
          <View style={styles.currentTimeWrapper}>
            <View style={styles.currentTime}>
              <Text style={{textAlign: 'left'}}><SimpleLineIcons style={{textAlign: 'center'}} name="clock" size={15} color="black" /> 05:32</Text>
            </View>
          </View>
          <View style={styles.playerControls}>
            <View style={styles.speedButton}>
              <TouchableOpacity>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-start" size={15} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.speedButton}>
              <TouchableOpacity>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-rewind" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.playButton}>
              <TouchableOpacity>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={35} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.speedButton}>
              <TouchableOpacity>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-forward" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.speedButton}>
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
  speedButton: {
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
