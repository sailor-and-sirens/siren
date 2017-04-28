import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { getAllPlaylists } from '../helpers';
import AddPlaylistModalRow from './AddPlaylistModalRow';

const mapStateToProps = (state) => ({
  addNewPlaylistInputValue: state.playlist.addNewPlaylistInputValue,
  isAddPlaylistModalVisible: state.playlist.isAddPlaylistModalVisible,
  playlists: state.playlist.playlists,
  selectedEpisodeId: state.playlist.selectedEpisodeId,
  selectedPlaylistId: state.playlist.selectedPlaylistId,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  token: state.main.token
});

class AddPlaylistModal extends Component {

  handleAddNewPlaylist = () => {
    let playlistData = { name: this.props.addNewPlaylistInputValue };
    fetch('http://siren-server.herokuapp.com/api/playlists/create-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(playlistData)
    })
    .then(response => response.json())
    .then(playlist => {
      this.props.dispatch(playlistActions.addNewPlaylist({ name: playlistData.name, id: playlist[0].id}));
    })
    .catch(console.log);
  };

  handleAddToPlaylistModalClose = (typeOfOperation) => {
    if (typeOfOperation === 'save') {
      let episodeData = { episodeId: Number(this.props.selectedEpisodeId), playlistId: this.props.selectedPlaylistId };
      fetch('http://siren-server.herokuapp.com/api/playlists/add-episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.props.token
        },
        body: JSON.stringify(episodeData)
      })
      .then(() => getAllPlaylists(this.props))
      .catch(console.log);
    }
    this.props.dispatch(playlistActions.toggleAddToPlaylistModal());

  };

  handlePlaylistToggle = (playlistId) => {
    this.props.dispatch(playlistActions.togglePlaylistSelected(playlistId));
  };

  isPlaylistSelected = (playlistId) => {
    return this.props.selectedPlaylistId === playlistId;
  }

  render() {

    const cancelSaveButton = () => {
      if (this.props.selectedPlaylistId !== null) {
        return (
          <View style={styles.cancelSaveWrapper}>
            <TouchableOpacity onPress={this.handleAddToPlaylistModalClose.bind(this, 'cancel')} style={styles.cancelButton}>
              <Text style={styles.cancelSaveText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleAddToPlaylistModalClose.bind(this, 'save')} style={styles.saveButton}>
              <Text style={styles.cancelSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        )
      }
      return (
        <View style={styles.cancelSaveWrapper}>
          <TouchableOpacity onPress={this.handleAddToPlaylistModalClose.bind(this, 'cancel')} style={styles.cancelButton}>
            <Text style={styles.cancelSaveText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )
    };

    return (
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={this.props.isAddPlaylistModalVisible}
        onRequestClose={() => this.handleAddToPlaylistModalClose}
        >
        <View style={styles.container}>
          <ScrollView style={styles.scrollWrapper}>
            <View style={styles.topWrapper}>
                <Text style={styles.topHeading}>Select Playlist to Add Episode</Text>
              <View style={styles.createPlaylistWrapper}>
                <TextInput
                  onChangeText={(text) => this.props.dispatch(playlistActions.updateAddNewPlaylistInput(text))} style={styles.addPlaylistInput}
                  value={this.props.addNewPlaylistInputValue}
                  placeholder="Enter Name of New Playlist"
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity onPress={this.handleAddNewPlaylist} style={styles.addPlaylistButton}>
                  <Text style={styles.addPlaylistButtonText}>Create + Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.props.playlists.map((playlist, index) => (
              <AddPlaylistModalRow
                key={index}
                index={index}
                dispatch={this.props.dispatch}
                handlePlaylistToggle={this.handlePlaylistToggle}
                isPlaylistSelected={this.isPlaylistSelected}
                leftActionActivated={this.props.leftActionActivated}
                playlist={playlist}
              />
            ))}
          </ScrollView>
          {cancelSaveButton(this.props)}
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
    padding: 10,
    backgroundColor: '#E3E4DB',
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
    backgroundColor: '#ffffff'
  },
  addPlaylistButton: {
    height: 40,
    flex: 0.35,
    justifyContent: 'center',
    backgroundColor: '#288D91'
  },
  addPlaylistButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
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
    backgroundColor: '#D62828'
  },
  saveButton: {
    height: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#288D91'
  }
})

export default connect(mapStateToProps)(AddPlaylistModal);
