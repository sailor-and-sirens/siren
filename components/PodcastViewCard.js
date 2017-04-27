import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import PodcastEpisodeList from './PodcastEpisodeList';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { headerActions } from '../actions/Header';
import { subscribePodcast } from '../helpers';
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = (state) => ({
  podcast: state.podcasts.currentPodcast,
  episodes: state.podcasts.podcastEpisodes,
  token: state.main.token,
  visible: state.podcasts.episodesLoading
});

class PodcastViewCard extends Component {

  getEpisodeDiscovery () {
    //Add/evaluate podcast if not in Siren-Disovery yet
    let podcast = [this.props.podcast];
    fetch("https://siren-discovery.herokuapp.com/api/subscribe", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.podcast)
      })
      .then(() => {
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
          this.props.dispatch(podcastsActions.searchDiscovery(response.slice(0, 10)));
          this.props.dispatch(headerActions.changeView('Discovery'));
        })
      })
      .catch(console.log);
  }

  render() {
    return (
      <View style={styles.wrapper}>
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
              <TouchableOpacity onPress={ () => {subscribePodcast(this.props); Alert.alert('Subscribed to ' + this.props.podcast.collectionName)}}>
                <Ionicons style={styles.subscribeIcon} size={25} color='grey' name="ios-add-circle-outline" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.podcastBottomView}>
          <View style={styles.discoveryBar}>
            <TouchableOpacity onPress={ () => {this.getEpisodeDiscovery()}}>
              <Text style={styles.discovery} >Discover more podcasts like this</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.episodeScroll}>
        {this.props.visible ?
          <Spinner visible={this.props.visible} textContent={"Loading Episodes..."} textStyle={{color: '#FFF'}} />  :
          <PodcastEpisodeList/>}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  podcastView: {
    height: 160,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
  leftView: {
    height: 150,
    width: 155,
    paddingLeft: 5
  },
  rightView: {
<<<<<<< HEAD
    paddingLeft: 3,
    flex: 1,
=======
    flex: .5,
>>>>>>> Linting
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 150,
    paddingTop: 5,
    paddingRight: 2
  },
  podcastBottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey'
  },
  episodeScroll: {
    marginBottom: 80,
  },
  descriptionView: {
    marginBottom: 5,
    height: 100,
  },
  image: {
    height: 150,
    width: 150,
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
    flexDirection: 'row'
  },
  tag: {
    flex: 0.8,
    alignSelf: 'flex-end',
    marginRight: 5,
    padding: 2,
    backgroundColor: '#50BFB9',
    textAlign: 'center',
  },
  subscribeIcon: {
    flex: 0.2,
    marginBottom: -4,
    paddingRight: 5,
    textAlign: 'right'
  },
  discoveryBar: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  discovery: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  }
});

export default connect(mapStateToProps)(PodcastViewCard);
