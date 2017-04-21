import { Audio } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Image, ScrollView, Linking } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const PlayerFullSizeModal = (props) => {
  let episodeImage = '';
  let episodeLink;

  let episodeBookmark = () => {
    if (props.episode.bookmark) {
      return {name: 'ios-bookmark', color: 'gray'}
    } else {
      return {name: 'ios-bookmark-outline', color: 'gray'}
    }
  }

  let episodeLike = () => {
    if (props.episode.liked) {
      return {name: 'ios-heart', color: 'gray'}
    } else {
      return {name: 'ios-heart-outline', color: 'gray'}
    }
  }

  let playPauseImage = (
    <TouchableOpacity onPress={props.handlePlay}>
      <Image source={{uri: props.episode.image600}} style={styles.image}/>
    </TouchableOpacity>
  )

  let playPauseButton = (
    <TouchableOpacity onPress={props.handlePlay}>
      <SimpleLineIcons style={{textAlign: 'center'}} name="control-play" size={50} color="black" />
    </TouchableOpacity>
  )

  if (props.isPlaying) {
    playPauseButton = (
      <TouchableOpacity onPress={props.handlePause}>
        <SimpleLineIcons style={{textAlign: 'center'}} name="control-pause" size={50} color="black" />
      </TouchableOpacity>
    )

    playPauseImage = (
      <TouchableOpacity onPress={props.handlePause}>
        <Image source={{uri: props.episode.image600}} style={styles.image}/>
      </TouchableOpacity>
    )
  }

  if (props.episode.feed.link) {
    episodeLink = (
      <Ionicons style={styles.actionIcon} name="ios-link" size={35} color={'gray'} onPress={() => Linking.openURL(props.episode.feed.link)}></Ionicons>
    )
  }

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={props.isFullSizeModalVisible}
      onRequestClose={() => {props.handleFullSizeModalClose}}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={props.handleFullSizeModalClose} style={{alignSelf: 'flex-start'}}>
          <SimpleLineIcons name="arrow-down" size={20}/>
        </TouchableOpacity>
        <ScrollView style={styles.scrollableContentWrapper}>
          <View style={styles.imageEpisodeInfoWrapper}>
            {playPauseImage}
          </View>
          <View style={styles.actionIconsWrapper}>
            {episodeLink}
            <MaterialIcons style={styles.actionIcon} name="playlist-play" size={35} color={'gray'}></MaterialIcons>
            <Ionicons style={styles.actionIcon} name={episodeBookmark().name} size={35} color={episodeBookmark().color}></Ionicons>
            <Ionicons style={styles.actionIcon} name={episodeLike().name} size={35} color={episodeLike().color}></Ionicons>
          </View>
          <Text style={styles.episodeTitle}>{props.episode.feed.title}</Text>
          <Text style={styles.summaryHeading}>Episode Summary</Text>
          <Text>{props.episode.feed.description}</Text>
        </ScrollView>
        <View style={styles.playerWrapper}>
          <View style={styles.playerControls}>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={props.handleSkipToBeginning}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-start" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={props.handleSkipBack}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-rewind" size={35} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.playButton}>
              {playPauseButton}
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={props.handleSkipAhead}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-forward" size={35} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={props.handleSkipToEnd}>
                <SimpleLineIcons style={{textAlign: 'center'}} name="control-end" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.timeSpeedWrapper}>
          <View style={styles.currentTimeWrapper}>
            <SimpleLineIcons name="clock" size={25} color="black" /><Text style={{textAlign: 'left'}}> {props.currentPlayingTime}</Text>
          </View>
          <View style={styles.currentSpeedWrapper}>
            <Text style={{marginRight: 3}}>Current Speed: {props.currentSpeed}x </Text>
            <View style={{marginRight: 3}}>
              <TouchableOpacity onPress={props.handleDecreaseSpeed}><SimpleLineIcons name="minus" size={25} color="black" /></TouchableOpacity>
            </View>
            <View style={{marginLeft: 3}}>
              <TouchableOpacity onPress={props.handleIncreaseSpeed}><SimpleLineIcons name="plus" size={25} color="black" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 15,
    padding: 10
  },
  scrollableContentWrapper: {
    flex: 0.6
  },
  imageEpisodeInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  image: {
    height: width - 20,
    width: width - 20
  },
  episodeInfoWrapper: {
    height: (width / 2) - 15,
    width: (width / 2) - 15,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#ececec'
  },
  episodeInfoRow: {
    flexDirection: 'row'
  },
  infoText: {
    fontSize: 14
  },
  actionIconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  actionIcon: {
    marginLeft: 10,
    marginRight: 10
  },
  episodeTitle: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  summaryHeading: {
    fontWeight: 'bold'
  },
  summary: {
    flex: 0.5,
    marginBottom: 5
  },
  playerWrapper: {
    flex: 0.25,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc'
  },
  playerControls: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playButton: {
    flex: 0.2
  },
  skipButton: {
    flex: 0.2
  },
  timeSpeedWrapper: {
    flex: 0.05,
    flexDirection: 'row'
  },
  currentTimeWrapper: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  currentTime: {
    flex: 1
  },
  currentSpeedWrapper: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});

export default PlayerFullSizeModal;
