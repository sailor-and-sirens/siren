//UNDER CONSTRUCTION -M
import React, { Component } from 'react';
import Swipeable from 'react-native-swipeable';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Platform, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header'
import { actionCreators as swipeActions } from '../actions/Swipe';
import { actionCreators as mainActions } from '../actions';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { connect } from 'react-redux';
import { subscribePodcast } from '../helpers';

const mapStateToProps = (state) => ({
  token: state.main.token,
  view: state.header.view,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
});


class PodcastListCard extends Component {

  getEpisodes = () => {
    this.props.dispatch(podcastsActions.updateCurrentPodcast(this.props.podcast))
    this.props.dispatch(headerActions.changeView('Podcast'))
    query = this.props.podcast.feedUrl;
    this.props.dispatch(podcastsActions.toggleEpisodesLoading(true));
    fetch('http://siren-server.herokuapp.com/api/podcasts/feeds/?url=' + query, {
      method: "GET",
      headers: {
        'Authorization': this.props.token,
        'Accept': 'application/json'
      }
      })
      .then(response =>  response.json())
      .then(response => {
        this.props.dispatch(podcastsActions.podcastEpisodes(response.slice(0, 20)));
        this.props.dispatch(podcastsActions.toggleEpisodesLoading(false));
      })
      .catch(err => console.log(err));
  }

  render() {
    const {leftActionActivated, leftToggle} = this.props;
    return (
      <Swipeable
            leftActionActivationDistance={200}
            leftContent={(
              <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#114B5F' : '#288D91'}]}>
                {leftActionActivated ?
                  <Text style={styles.swipeText}>(( release ))</Text> :
                  <Text style={styles.swipeText}>Subscribe</Text>}
              </View>
            )}
            onLeftActionActivate={() => this.props.dispatch(swipeActions.updateLeftActivation(true))}
            onLeftActionDeactivate={() => this.props.dispatch(swipeActions.updateLeftActivation(false))}
            onLeftActionComplete={() => {
              subscribePodcast(this.props);
              Alert.alert('Subscribed to ' + this.props.podcast.collectionName);
            }}
          >
        <View style={styles.mainView}>
          <View style={styles.leftView}>
            <TouchableOpacity onPress={() => {this.getEpisodes()}}>
              <Image source={{uri: this.props.podcast.artworkUrl100}} style={styles.image}/>
            </TouchableOpacity>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.title} numberOfLines={1} onPress={() => {this.getEpisodes()}}>{this.props.podcast.collectionName}</Text>
            <Text style={styles.artist} numberOfLines={2} onPress={() => {this.getEpisodes()}}>{this.props.podcast.artistName}</Text>
            <View style={styles.tagAddView}>
              <Text style={styles.tag}>{this.props.podcast.primaryGenreName}</Text>
              <TouchableOpacity onPress={ () => {subscribePodcast(this.props); Alert.alert('Subscribed to ' + this.props.podcast.collectionName)}}>
                <Ionicons style={styles.subscribeButton} size={25} color='grey' name="ios-add-circle-outline" onPress={ () => {subscribePodcast(this.props); Alert.alert('Subscribed to ' + this.props.podcast.collectionName)}}/>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  leftView: {
    height: 90,
    width: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  rightView: {
    flex: 1,
    height: 90,
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  image: {
    height: 90,
    width: 90,
  },
  title: {
    fontSize: 15,
    ...Platform.select({
       ios: {
         fontWeight: '500',
       },
       android: {
         fontWeight: '400'
       },
    }),
    marginBottom: -3
  },
  artist: {
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
      android: {
        fontSize: 13,
      },
    })
  },
  tagAddView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  tag: {
    padding: 3,
    textAlign: 'center',
    backgroundColor: '#50BFB9',
    ...Platform.select({
      ios: {
        fontSize: 13,
      },
      android: {
        fontSize: 12,
      },
    }),
  },
  subscribeButton: {
    paddingRight: 5,
    ...Platform.select({
      ios: {
        marginBottom: -3,
      },
      android: {
        marginBottom: -2,
      },
    })
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  swipeText: {
    color: '#ffffff'
  }
});

export default connect(mapStateToProps)(PodcastListCard);
