import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform, Alert} from 'react-native';
import PodcastEpisodeList from './PodcastEpisodeList';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/index';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { actionCreators as mainActions } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = (state) => ({
  podcast: state.podcasts.currentPodcast,
  token: state.main.token,
  visible: state.podcasts.episodesLoading
});


class PodcastViewCard extends Component {

  subscribePodcast = () => {
    fetch("http://siren-server.herokuapp.com/api/podcasts/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify(this.props.podcast)
    })
    .then(() => {
      fetch("http://siren-server.herokuapp.com/api/users/inbox", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.props.token
        },
      })
    })
    .then(inbox => inbox.json())
    .then((inbox) => {
      console.warn('fetchInbox response: ', inbox);
      this.props.dispatch(mainActions.updateInbox(inbox));
    })
    .catch((err) => console.log(err));
  };

  render() {
    return (
      <View>
        <View style={styles.podcastView}>
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
        <View style={styles.episodeScroll}>
          <ScrollView>
          {this.props.visible ?
            <Spinner visible={this.props.visible} textContent={"Loading Episodes..."} textStyle={{color: '#FFF'}} />  :
            <PodcastEpisodeList/>}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftView: {
    flex: .5,
    justifyContent: 'center',
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
  episodeScroll: {
    marginBottom: 250,
  },
  podcastView: {
    height: 155,
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
    marginBottom: 4,
  },
  tag: {
    backgroundColor: '#f4a442',
    padding: 2,
    alignSelf: 'flex-start',
    marginTop: 6,
    width: 130,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps)(PodcastViewCard);
