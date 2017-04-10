import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  greeting: state.greeting
});

class Player extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.currentlyPlaying}>
            <Text>The Tim Ferriss Show: Episode #232</Text>
          </View>
          <View style={styles.currentTime}>
            <Text style={{textAlign: 'right'}}>5m32s</Text>
          </View>
        </View>
        <View style={styles.playerControls}>
          <View style={styles.speedButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-rewind" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.playButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.speedButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-forward" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#dcdcdc',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5
  },
  info: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  playerControls: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  currentlyPlaying: {
    flex: 0.65
  },
  currentTime: {
    flex: 0.35
  },
  playButton: {
    flex: 0.75
  },
  speedButton: {
    flex: 0.25
  }
});

export default connect(mapStateToProps)(Player);
