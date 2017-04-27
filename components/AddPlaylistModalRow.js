import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { actionCreators as swipeActions } from '../actions/Swipe';
import Swipeable from 'react-native-swipeable';

const AddPlaylistModalRow = (props) => {

  const {
    dispatch,
    handlePlaylistToggle,
    index,
    isPlaylistSelected,
    leftActionActivated,
    playlist
  } = props;

  const playlistStyle = (index) => {
    if (index % 2 === 0) {
      return [styles.playlistWrapper, styles.playlistAltBackground];
    }
    return styles.playlistWrapper;
  };

  const iconStyle = (isSelected) => {
    if (isSelected) {
      return (
        <MaterialIcons size={25} name='playlist-add-check' color='#288D91'></MaterialIcons>
      )
    }
    return (
      <MaterialIcons size={25} name='playlist-add'></MaterialIcons>
    )
  };

  convertMinutesToHrsMinutes = (minutes) => {
    let hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);
    return hours + 'h' + ' ' + minutes + 'm';
  }

  const swipeToSelectPlaylistText = (isSelected) => {
    if (isSelected === true) {
      return <Text style={styles.swipeText}>Deselect Playlist</Text>
    }
    return <Text style={styles.swipeText}>Select Playlist</Text>
  };

  return (
    <Swipeable
      key={index}
      leftActionActivationDistance={200}
      leftContent={(
        <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#114B5F' : '#288D91'}]}>
          {leftActionActivated ?
            <Text style={styles.swipeText}>(( release ))</Text> :
            swipeToSelectPlaylistText(isPlaylistSelected(playlist.id))}
        </View>
      )}
      onLeftActionActivate={() => dispatch(swipeActions.updateLeftActivation(true))}
      onLeftActionDeactivate={() => dispatch(swipeActions.updateLeftActivation(false))}
      onLeftActionComplete={() => handlePlaylistToggle(playlist.id)}
    >
    <TouchableWithoutFeedback>
      <View style={playlistStyle(index)}>
        <View style={styles.playlistIconWrapper}>
          <TouchableOpacity onPress={handlePlaylistToggle.bind(this, playlist.id)}>
            {iconStyle(isPlaylistSelected(playlist.id))}
          </TouchableOpacity>
        </View>
        <View style={styles.playlistNameWrapper}>
          <Text style={styles.playlistName}>{playlist.name}</Text>
        </View>
        <View style={styles.playlistTotalEpisodesWrapper}>
          <Text style={styles.totalHeading}>Total Episodes</Text>
          <Text style={styles.totalNumber}>{playlist.totalEpisodes}</Text>
        </View>
        <View style={styles.playlistTotalDurationWrapper}>
          <Text style={styles.totalHeading}>Total Time</Text>
          <Text style={styles.totalNumber}>{convertMinutesToHrsMinutes(playlist.totalTime)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Swipeable>
  )
}

const styles = StyleSheet.create({
  playlistWrapper: {
    height: 60,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#E3E4DB',
    borderBottomWidth: 0.5,
    borderColor: '#bbbbbb'
  },
  playlistAltBackground: {
    backgroundColor: '#ffffff'
  },
  playlistIconWrapper: {
    height: '100%',
    flex: 0.09,
    justifyContent: 'center',
    paddingRight: 10,
  },
  playlistNameWrapper: {
    height: '100%',
    flex: 0.51,
    justifyContent: 'center',
    paddingRight: 5,
  },
  playlistName: {
    fontSize: 16
  },
  playlistTotalEpisodesWrapper: {
    height: '100%',
    flex: 0.325,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  playlistTotalDurationWrapper: {
    height: '100%',
    flex: 0.325,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  totalHeading: {
    fontSize: 12,
    textAlign: 'center'
  },
  totalNumber: {
    fontSize: 16,
    textAlign: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  swipeText: {
    color: '#ffffff'
  }
});

export default AddPlaylistModalRow;
