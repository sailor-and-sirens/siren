import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const PlayerFullSizeModal = (props) => {
  let episodeImage = ''
  let imgUrl = "https://fhww.files.wordpress.com/2014/04/timferrissshowart-500x500.jpg?quality=80&strip=all&w=640"
  if (props.episode) {
    episodeImage = <Image source={{uri: props.episode.image}} style={styles.image}/>;
  }

  let playPauseButton = (
    <TouchableOpacity>
      <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={50} color="black" />
    </TouchableOpacity>
  )

  if (props.isPlaying) {
    playPauseButton = (
      <TouchableOpacity>
        <SimpleLineIcons style={{textAlign: 'center'}} name="control-pause" size={50} color="black" />
      </TouchableOpacity>
    )
  }
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={props.isFullSizeModalVisible}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={props.handleFullSizeModalClose} style={{alignSelf: 'flex-start'}}>
          <SimpleLineIcons name="arrow-down" size={15}/>
        </TouchableOpacity>
        <Image source={{uri: imgUrl}} style={styles.image}/>
        <Text>Podcast Title</Text>
        <Text>Episode Title</Text>
        <Text>Show Summary</Text>
        <View style={styles.playerControls}>
          <View style={styles.skipButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-start" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.skipButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-rewind" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.playButton}>
            {playPauseButton}
          </View>
          <View style={styles.skipButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-forward" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.skipButton}>
            <TouchableOpacity>
              <SimpleLineIcons style={{textAlign: 'center'}} name="control-end" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 30,
    padding: 10,
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200,
  },
  playerControls: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playButton: {
    flex: 0.2
  },
  skipButton: {
    flex: 0.2
  },
});

export default PlayerFullSizeModal;
