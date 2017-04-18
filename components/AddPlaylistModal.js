import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

const AddPlaylistModal = (props) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={false}
      visible={props.isAddPlaylistModalVisible}
      onRequestClose={() => console.log('point me to a function')}
    >
      <View style={styles.container}>
        <Text>Add Playlist Modal</Text>
        <TouchableOpacity onPress={props.handleAddToPlaylistModalClose}><Text>x close me</Text></TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddPlaylistModal;
