import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { actionCreators as swipeActions } from '../actions/Swipe';
import Swipeable from 'react-native-swipeable';

const mapStateToProps = (state) => ({
  addNewPlaylistInputValue: state.playlist.addNewPlaylistInputValue,
  isAddPlaylistModalVisible: state.playlist.isAddPlaylistModalVisible,
  isPlaylistSelected: state.playlist.isPlaylistSelected,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  playlists: state.playlist.playlists,
  selectedPlaylistId: state.playlist.selectedPlaylistId
});

class AddPlaylistModal extends Component {

  handleAddNewPlaylist = () => {
    this.props.dispatch(playlistActions.addNewPlaylist(this.props.addNewPlaylistInputValue));
  };

  handlePlaylistToggle = (index) => {
    if (this.props.isPlaylistSelected === false || this.props.playlists[index].isSelected === true) {
      this.props.dispatch(playlistActions.togglePlaylistSelected(index));
    } else {
      Alert.alert('Please deselect the currently selected playlist before selecting a new one.');
    }
  };

  handleAddToPlaylistModalClose = () => {
    this.props.dispatch(playlistActions.toggleAddToPlaylistModal());
  };

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
    };

    const swipeToSelectPlaylistText = (isSelected) => {
      if (isSelected === true) {
        return <Text>Deselect Playlist</Text>
      }
      return <Text>Select Playlist</Text>
    };

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
                      swipeToSelectPlaylistText(playlist.isSelected)}
                  </View>
                )}

                onLeftActionActivate={() => this.props.dispatch(swipeActions.updateLeftActivation(true))}
                onLeftActionDeactivate={() => this.props.dispatch(swipeActions.updateLeftActivation(false))}
                onLeftActionComplete={() => this.handlePlaylistToggle(index)}
              >
              <TouchableWithoutFeedback>
                <View style={playlistStyle(index)}>
                  <View style={styles.playlistIconWrapper}>
                    <TouchableOpacity onPress={this.handlePlaylistToggle.bind(this, index)}>
                      {iconStyle(playlist.isSelected)}
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
                    <Text style={styles.totalNumber}>{playlist.totalTime}min</Text>
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
