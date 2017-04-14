import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const PlayerSpeedModal = (props) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => {props.handleModalClose}}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalCurrentSpeed}>
            <Text>Change Playback Speed</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold',  marginTop: 5, marginBottom: 5}}>{props.currentSpeed}x</Text>
            <View style={styles.modalSpeedButtons}>
              <TouchableOpacity onPress={props.handleDecreaseSpeed}><SimpleLineIcons style={{textAlign: 'center', marginRight: 5}} name="minus" size={25} color="black" /></TouchableOpacity>
              <TouchableOpacity onPress={props.handleIncreaseSpeed}><SimpleLineIcons style={{textAlign: 'center', marginLeft: 5}} name="plus" size={25} color="black" /></TouchableOpacity>
            </View>
          </View>
          <View style={{position: 'absolute', bottom: 5, right: 5}}>
            <TouchableOpacity onPress={props.handleModalClose}><SimpleLineIcons name="close" size={20} color="black" /></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export default PlayerSpeedModal;
