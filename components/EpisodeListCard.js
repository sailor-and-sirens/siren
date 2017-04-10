import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  podcast: state.podcast
})

class EpisodeListCard extends Component {

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.leftView}>
          <Image source={{uri: this.props.podcast.image}} style={styles.image}/>
        </View>
        <View style={styles.centerView}>
          <Text style={styles.podcast}>{this.props.podcast.title}</Text>
          <Text style={styles.episode} numberOfLines={1}>{this.props.podcast.feed.title}</Text>
          <Text style={styles.date}>{this.props.podcast.feed.pubDate.substring(0,16)}</Text>
          <View style={styles.tagTimeView}>
            <Text style={styles.time}>{this.props.podcast.tag}</Text>
            <Text style={styles.time}>{this.props.podcast.feed.duration}</Text>
          </View>
        </View>
        <View style={styles.rightView}>
          <Ionicons style={styles.favorite} size={40} name="ios-heart-outline"/>
          <Text style={styles.clock}>◑</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
  leftView: {
    flex: .25,
    // backgroundColor: 'blue',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centerView: {
    paddingLeft: 3,
    flex: .625,
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
  },
  rightView: {
    flex: .125,
    height: 80,
    // backgroundColor: 'yellow',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
  },
  textView: {
  },
  episode: {
  },
  podcast: {
  },
  subtitle: {
  },
  tagTimeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
  },
  time: {
  },
  favorite: {
  },
  clock: {
    fontSize: 30,
  },
});

// export default EpisodeListCard;
export default connect(mapStateToProps)(EpisodeListCard);