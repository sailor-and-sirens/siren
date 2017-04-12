import { Audio } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, Image, ScrollView } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const episode = {
  title: 'Note to Self', liked: true, bookmark: false, tag: 'Tech News',
  image: 'https://media2.wnyc.org/i/1400/1400/l/80/1/NoteToSelf_WAAA_2016.png', creator: 'NPR',
  summary: "Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they can use that data to create personality profiles. Assessments of each of our hopes, fears, and desires - and target us accordingly.\n\nThis is the science of psychometrics. And, as the story went, Cambridge Analytica’s dark digital arts helped Trump win, with ads designed to ring every reader’s individual bell.\n\nOr, did they? Over the past few weeks, reporters and data experts started asking questions. Where did this data come from? Could the Trump campaign really execute a micro-targeted social media strategy? Did they have a secret sauce? Or was it just more ketchup?\n\nThis week, psychometrics and the future of campaign data-mining. With Matt Oczkowski of Cambridge Analytica, psychometrics pioneer Michal Kosinski, and Nicholas Confessore of the New York Times.\n\nAnd if you're curious about Apply Magic Sauce, the psychometric tool we all tried during the Privacy Paradox, you can find it right here.",
  feed: {title:"Deep-Dark-Data-Driven Politics\r\n", link:"http://www.wnyc.org/story/cambridge-analytica-psychometrics/", duration:"26:14",
  subtitle:"Data mining is nothing new in presidential campaigns. But in 2016, the Trump team took voter research to a new level. They hired consultants called Cambridge Analytica, which says it has thousands of data points on every American. They also claim they ca",
  pubDate: "Wed, 29 Mar 2017 00:00:00 -0400",
  enclosure: {"url":"https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/notetoself/notetoself032917_cms745660_pod.mp3", length: 0, type: "audio/mpeg"}}
};

const PlayerFullSizeModal = (props) => {
  let episodeImage = '';
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
        <View style={styles.imageEpisodeInfoWrapper}>
          <Image source={{uri: episode.image}} style={styles.image}/>
          <View style={styles.episodeInfoWrapper}>
            <View style={styles.episodeInfoRow}>
              <SimpleLineIcons name="user" size={15}></SimpleLineIcons><Text style={styles.infoText}> NPR</Text>
            </View>
            <View style={styles.episodeInfoRow}>
              <SimpleLineIcons name="calendar" size={15}></SimpleLineIcons><Text style={styles.infoText}> April 6, 2017</Text>
            </View>
            <View style={styles.episodeInfoRow}>
              <SimpleLineIcons name="clock" size={15}></SimpleLineIcons><Text style={styles.infoText}> 76min</Text>
            </View>
            <View style={styles.episodeInfoRow}>
              <SimpleLineIcons name="tag" size={15}></SimpleLineIcons><Text style={styles.infoText}> Productivity</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionIconsWrapper}>
          <Ionicons style={styles.actionIcon} name="ios-link" size={35}></Ionicons>
          <MaterialIcons style={styles.actionIcon} name="playlist-play" size={35}></MaterialIcons>
          <Ionicons style={styles.actionIcon} name="ios-bookmark-outline" size={35}></Ionicons>
          <Ionicons style={styles.actionIcon} name="ios-heart-outline" size={35}></Ionicons>
        </View>
        <Text style={styles.episodeTitle}>{episode.feed.title}</Text>
        <Text style={styles.summaryHeading}>Episode Summary</Text>
        <ScrollView style={styles.summary}>
          <Text>{episode.summary}</Text>
        </ScrollView>
        <View style={styles.playerWrapper}>
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
        <View style={styles.timeSpeedWrapper}>
          <View style={styles.currentTimeWrapper}>
            <SimpleLineIcons name="clock" size={25} color="black" /><Text style={{textAlign: 'left'}}> 0:00</Text>
          </View>
          <View style={styles.currentSpeedWrapper}>
            <Text style={{marginRight: 3}}>Current Speed: 1x </Text>
            <View style={{marginRight: 3}}>
              <TouchableOpacity><SimpleLineIcons name="minus" size={25} color="black" /></TouchableOpacity>
            </View>
            <View style={{marginLeft: 3}}>
              <TouchableOpacity><SimpleLineIcons name="plus" size={25} color="black" /></TouchableOpacity>
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
    marginTop: 30,
    padding: 10
  },
  imageEpisodeInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  image: {
    height: (width / 2) - 15,
    width: (width / 2) - 15
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
    fontSize: 16,
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
    flex: 0.35,
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
    flex: 0.15,
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
