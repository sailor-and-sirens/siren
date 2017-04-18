import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { actionCreators as swipeActions } from '../actions/Swipe';

const mapStateToProps = (state) => ({
  isAddPlaylistModalVisible: state.swipe.isAddPlaylistModalVisible,
  playlists: state.playlist.playlists
})

// const playlists = [
//   {id: 1, name: 'Monday', totalEpisodes: 4, totalTime: '180+', isSelected: false},
//   {id: 2, name: 'Tuesday', totalEpisodes: 1, totalTime: '75', isSelected: false},
//   {id: 3, name: 'Wednesday', totalEpisodes: 2, totalTime: '90', isSelected: false},
//   {id: 4, name: 'Thursday', totalEpisodes: 3, totalTime: '120', isSelected: false},
//   {id: 5, name: 'Friday', totalEpisodes: 0, totalTime: '0', isSelected: false},
//   {id: 6, name: 'Weekend', totalEpisodes: 1, totalTime: '56', isSelected: false},
//   {id: 7, name: 'Productivity Mix', totalEpisodes: 5, totalTime: '180+', isSelected: false},
//   {id: 8, name: 'A Really Long Title', totalEpisodes: 2, totalTime: '65', isSelected: false},
//   {id: 9, name: 'Health & Wellness', totalEpisodes: 3, totalTime: '130', isSelected: false},
//   {id: 10, name: 'Soul Food', totalEpisodes: 4, totalTime: '180+', isSelected: false},
//   {id: 11, name: 'WebDev', totalEpisodes: 2, totalTime: '85', isSelected: false},
//   {id: 12, name: 'Entrepreneurship', totalEpisodes: 3, totalTime: '120', isSelected: false}
// ]

class AddPlaylistModal extends Component {
  constructor(props) {
    super(props);
  }

  playlistStyle = (index) => {
    if (index % 2 === 0) {
      return [styles.playlistWrapper, styles.playlistAltBackground];
    }
    return styles.playlistWrapper;
  }

  iconStyle = (isSelected) => {
    if (isSelected) {
      return (
        <MaterialIcons size={25} name='playlist-add-check' color='#2EAC6D'></MaterialIcons>
      )
    }
    return (
      <MaterialIcons size={25} name='playlist-add'></MaterialIcons>
    )
  }

  cancelSaveButton = (props) => {
    if (this.props.playlists.some(playlist => playlist.isSelected)) {
      return (
        <View style={styles.cancelSaveWrapper}>
          <TouchableOpacity onPress={this.handleAddToPlaylistModalClose} style={styles.cancelButton}>
            <Text style={styles.cancelSaveText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleAddToPlaylistModalClose} style={styles.saveButton}>
            <Text style={styles.cancelSaveText}>Save</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.cancelSaveWrapper}>
        <TouchableOpacity onPress={this.handleAddToPlaylistModalClose} style={styles.cancelButton}>
          <Text style={styles.cancelSaveText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handlePlaylistToggle = (index) => {
    this.props.dispatch(playlistActions.togglePlaylistSelected(index));
  }

  handleAddToPlaylistModalClose = () => {
    this.props.dispatch(swipeActions.toggleAddToPlaylistModal());
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={this.props.isAddPlaylistModalVisible}
        onRequestClose={() => console.log('point me to a function')}
      >
        <View style={styles.container}>
          <ScrollView style={styles.scrollWrapper}>
            <View style={styles.topWrapper}>
              <Text style={styles.topHeading}>Select Playlist to Add Episode</Text>
              <View style={styles.createPlaylistWrapper}>
                <TextInput style={styles.addPlaylistInput} placeholder="Enter Name of New Playlist"/>
                <View style={styles.addPlaylistButton}>
                  <Text style={styles.addPlaylistButtonText}>Create + Add</Text>
                </View>
              </View>
            </View>
            {this.props.playlists.map((playlist, index) => (
              <View style={this.playlistStyle(index)} key={index}>
                <View style={styles.playlistIconWrapper}>
                  <TouchableOpacity onPress={this.handlePlaylistToggle.bind(this, index)}>{this.iconStyle(playlist.isSelected)}</TouchableOpacity>
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
                  <Text style={styles.totalNumber}>{playlist.totalTime}min</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          {this.cancelSaveButton(this.props)}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#ffffff'
  },
  scrollWrapper: {
    marginBottom: 50
  },
  topWrapper: {
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#bbbbbb'
  },
  topHeading: {
    fontSize: 20,
    textAlign: 'center'
  },
  createPlaylistWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  addPlaylistInput: {
    height: 40,
    flex: 0.65,
    alignSelf: 'center',
    marginRight: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#bbbbbb',
    backgroundColor: '#ffffff'
  },
  addPlaylistButton: {
    height: 40,
    flex: 0.35,
    justifyContent: 'center',
    backgroundColor: '#2EAC6D'
  },
  addPlaylistButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
  },
  playlistWrapper: {
    height: 60,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderTopWidth: 0,
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
  cancelSaveWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 50,
    width: '100%',
    flexDirection: 'row'
  },
  cancelSaveText: {
    color: '#ffffff'
  },
  cancelButton: {
    height: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b00404'
  },
  saveButton: {
    height: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2EAC6D'
  }
})

export default connect(mapStateToProps)(AddPlaylistModal);

// visible={props.isAddPlaylistModalVisible}
