import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const PlayerFullSizeModal = (props) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={props.isFullSizeModalVisible}
      >
      <View style={styles.modalContainer}>
        {/* <Image source={{uri: props.episode.image}} /> */}
        <Text>Hello World</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 40,
    padding: 5
  },
  modalWrapper: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
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
    justifyContent: 'center',
    marginBottom: 5
  }
});

export default PlayerFullSizeModal;
