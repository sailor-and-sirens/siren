import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/index';

const mapStateToProps = (state) => ({
  podcast: state.main.iTunesResult[0]
});


class PodcastViewCard extends Component {

  subscribePodcast = () => {
    //TODO
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.leftView}>
          <Image source={{uri: this.props.podcast.artworkUrl600}} style={styles.image}/>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title} numberOfLines={1}>{this.props.podcast.collectionName}</Text>
          <Text style={styles.artist} numberOfLines={1}>{this.props.podcast.artistName}</Text>
          <ScrollView style={styles.descriptionView}>
            <Text style={styles.description}>Podcast description goes here. There are many show details that appear here. Guests, topics, info, galore! Even more info. These could be quite long.</Text>
          </ScrollView>
          <View style={styles.tagAddView}>
            <Text style={styles.tag}> {this.props.podcast.primaryGenreName} </Text>
            <Ionicons style={styles.favorite} size={30} color='grey' name="ios-add-circle-outline" onPress={ () => {this.subscribePodcast(); Alert.alert('Subscribed to ' + this.props.podcast.collectionName);}}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftView: {
    flex: .5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightView: {
    paddingLeft: 2,
    flex: .5,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 150,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: (Platform.OS === 'ios') ? 2 : 0,
    paddingRight: 2,
  },
  mainView: {
    height: 150,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
  descriptionView: {
    marginBottom: 4,
  },
  image: {
    height: 146,
    width: 146,
  },
  description: {
     ...Platform.select({
      ios: {
        fontSize: 12,
      },
      android: {
        fontSize: 14,
      },
    }),
  },
  title: {
    fontWeight: "500",
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontSize: 18,
      },
    }),
  },
  artist: {
  fontWeight: "400",
  ...Platform.select({
    ios: {
      fontSize: 13,
    },
    android: {
      fontSize: 14,
    },
  }),
  marginBottom: 5,
  },
  podcast: {
    fontWeight: "600",
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  tagAddView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  tag: {
    backgroundColor: '#f4a442',
    padding: 2,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
});

export default connect(mapStateToProps)(PodcastViewCard);
