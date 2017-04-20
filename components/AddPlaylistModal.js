import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { actionCreators as swipeActions } from '../actions/Swipe';
import Swipeable from 'react-native-swipeable';

const mapStateToProps = (state) => ({
  addNewPlaylistInputValue: state.playlist.addNewPlaylistInputValue,
  isAddPlaylistModalVisible: state.playlist.isAddPlaylistModalVisible,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  playlists: state.playlist.playlists,
  selectedPlaylistId: state.playlist.selectedPlaylistId,
  token: state.main.token
});

class AddPlaylistModal extends Component {

  componentWillMount = () => {
    fetch("http://localhost:3000/api/playlists/add-playlist-modal", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': this.props.token
      }
    })
    .then(response => response.json())
    .then(playlists => {
      this.props.dispatch(playlistActions.storeAddModalPlaylists(playlists));
    })
  }

  handleAddNewPlaylist = () => {
    let playlistData = { name: this.props.addNewPlaylistInputValue };
    fetch('http://localhost:3000/api/playlists/create-playlist', {
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
    .catch(err => console.warn(err));
  };

  handleAddToPlaylistModalClose = () => {
    this.props.dispatch(playlistActions.toggleAddToPlaylistModal(false));
  };

  handlePlaylistToggle = (playlistId) => {
    this.props.dispatch(playlistActions.togglePlaylistSelected(playlistId));
  };

  isPlaylistSelected = (playlistId) => {
    return this.props.selectedPlaylistId === playlistId;
  }

  render() {
    const { leftActionActivated } = this.props;

    const playlistStyle = (index) => {
      if (index % 2 === 0) {
        return [styles.playlistWrapper, styles.playlistAltBackground];
      }
      return styles.playlistWrapper;
    };

    const iconStyle = (isSelected) => {
      if (isSelected) {
        return (
          <MaterialIcons size={25} name='playlist-add-check' color='#2EAC6D'></MaterialIcons>
        )
      }
      return (
        <MaterialIcons size={25} name='playlist-add'></MaterialIcons>
      )
    };

    const cancelSaveButton = () => {
      if (this.props.selectedPlaylistId !== null) {
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
    };

    const swipeToSelectPlaylistText = (isSelected) => {
      if (isSelected === true) {
        return <Text>Deselect Playlist</Text>
      }
      return <Text>Select Playlist</Text>
    };
    //visible={this.props.isAddPlaylistModalVisible}
    return (
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={true}
        onRequestClose={() => console.log('point me to a function')}
      >
        <View style={styles.container}>
          <ScrollView style={styles.scrollWrapper}>
            <View style={styles.topWrapper}>
                <Text style={styles.topHeading}>Select Playlist to Add Episode</Text>
              <View style={styles.createPlaylistWrapper}>
                <TextInput onChangeText={(text) => this.props.dispatch(playlistActions.updateAddNewPlaylistInput(text))} style={styles.addPlaylistInput} value={this.props.addNewPlaylistInputValue} placeholder="Enter Name of New Playlist"/>
                <TouchableOpacity onPress={this.handleAddNewPlaylist} style={styles.addPlaylistButton}>
                  <Text style={styles.addPlaylistButtonText}>Create + Add</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.props.playlists.map((playlist, index) => (
              <Swipeable
                key={index}
                leftActionActivationDistance={200}
                leftContent={(
                  <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'rgb(221, 95, 95)' : '#42f4c5'}]}>
                    {leftActionActivated ?
                      <Text>(( release ))</Text> :
                      swipeToSelectPlaylistText(this.isPlaylistSelected(playlist.id))}
                  </View>
                )}

                onLeftActionActivate={() => this.props.dispatch(swipeActions.updateLeftActivation(true))}
                onLeftActionDeactivate={() => this.props.dispatch(swipeActions.updateLeftActivation(false))}
                onLeftActionComplete={() => this.handlePlaylistToggle(playlist.id)}
              >
              <TouchableWithoutFeedback>
                <View style={playlistStyle(index)}>
                  <View style={styles.playlistIconWrapper}>
                    <TouchableOpacity onPress={this.handlePlaylistToggle.bind(this, playlist.id)}>
                      {iconStyle(this.isPlaylistSelected(playlist.id))}
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
                    <Text style={styles.totalNumber}>{playlist.totalTime > 999 ? 999 + '+' : playlist.totalTime}min</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Swipeable>
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
    backgroundColor: '#eeeeee',
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
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#eeeeee',
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
  }
})

export default connect(mapStateToProps)(AddPlaylistModal);

// visible={this.props.isAddPlaylistModalVisible}
