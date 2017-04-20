import React, { Component } from 'react';
import PodcastListCard from './PodcastListCard';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { actionCreators as swipeActions } from '../actions/Swipe';
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = (state) => ({
  podcasts: state.podcasts.iTunesResult,
  currentEpisode: state.player.currentEpisode,
  inbox: state.main.inbox,
  token: state.main.token,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  visible: state.podcasts.searchSpinner,
  text: state.podcasts.searchText
})

class PodcastList extends Component {

  getPodcasts () {
    query = this.props.text.slice().split().join('+');
    this.props.dispatch(podcastsActions.searchText(''));
    this.props.dispatch(podcastsActions.toggleSearchSpinner(true));
    fetch('http://itunes.apple.com/search?entity=podcast&term=' + query)
      .then(response => response.json())
      .then(response => {
        this.props.dispatch(podcastsActions.searchPodcasts(response.results));
        this.props.dispatch(podcastsActions.toggleSearchSpinner(false));
      })
      .catch(console.warn);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.searchBar}>
          <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.searchInput} onChangeText={(text) => {this.props.dispatch(podcastsActions.searchText(text));}} onSubmitEditing={this.getPodcasts.bind(this)} value={this.props.text}/>
          <Ionicons style={styles.searchButton} onPress={this.getPodcasts.bind(this)} size={30} color='grey' name="ios-search" />
        </View>
        <ScrollView style={styles.podcastList}>
          {this.props.visible ?
            <Spinner visible={this.props.visible} textContent={"Searching..."} textStyle={{color: '#FFF'}} />  :
          this.props.podcasts.map((podcast, i) => (
              <PodcastListCard podcast={podcast} key={i}/>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchButton: {
    marginLeft: 8,
  },
  podcastList:{
    width: '100%',
    marginBottom: 210,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default connect(mapStateToProps)(PodcastList);
