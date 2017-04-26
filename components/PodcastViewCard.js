import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform, Alert} from 'react-native';
import PodcastEpisodeList from './PodcastEpisodeList';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/index';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { actionCreators as mainActions } from '../actions';
import { headerActions } from '../actions/Header';
import { subscribePodcast } from '../helpers';
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = (state) => ({
  podcast: state.podcasts.currentPodcast,
  episodes: state.podcasts.podcastEpisodes,
  token: state.main.token,
  view: state.header.view,
  visible: state.podcasts.episodesLoading
});

class PodcastViewCard extends Component {

  getEpisodeDiscovery () {
    //Add/evaluate podcast if not in Siren-Disovery yet
    podcast = [this.props.podcast];
    fetch("https://siren-discovery.herokuapp.com/api/subscribe", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.podcast)
      })
      .then((response) => {
        console.log(response);
        podcast = [{
          name: this.props.podcast.collectionName
        }];
        //fetch recommendations
        fetch("https://siren-discovery.herokuapp.com/api/recommend", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(podcast)
        })
        .then(response => response.json())
        .then(response => {
          console.log('GET DISCOVERY RESPONSE: ', response.slice(0,1));
          this.props.dispatch(podcastsActions.searchDiscovery(response.slice(0, 10)));
          this.props.dispatch(headerActions.changeView('Discovery'));
        })
      })
      .catch(console.log);
  }

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
              <Text style={styles.description}>{this.props.episodes[0].podcast.description.long}</Text>
            </ScrollView>
            <View style={styles.tagAddView}>
              <Text style={styles.tag} numberOfLines={1}> {this.props.podcast.primaryGenreName} </Text>
              <Ionicons style={styles.favorite} size={30} color='grey' name="ios-add-circle-outline" onPress={ () => {subscribePodcast(this.props); Alert.alert('Subscribed to ' + this.props.podcast.collectionName);}}/>
            </View>
            <View style={styles.discoveryBar}>
              <Text style={styles.discovery} onPress={ () => {this.getEpisodeDiscovery();}}>See more like this</Text>
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
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 150,
    paddingTop: 5,
    paddingBottom: 3,
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
    height: 100,
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
    paddingRight: 8,
    marginBottom: 1,
  },
  discovery: {
    height: 20,
    color: 'grey',
    fontSize: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  tag: {
    backgroundColor: '#f4a442',
    padding: 2,
    alignSelf: 'flex-start',
    marginTop: 6,
    width: 120,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps)(PodcastViewCard);
