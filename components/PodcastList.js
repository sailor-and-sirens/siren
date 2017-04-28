import React, { Component } from 'react';
import PodcastListCard from './PodcastListCard';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { headerActions } from '../actions/Header';
import { getSubscriptions } from '../helpers';
import Spinner from 'react-native-loading-spinner-overlay';

const mapStateToProps = (state) => ({
  podcasts: state.podcasts.iTunesResult,
  discovered: state.podcasts.discoveryResults,
  currentEpisode: state.player.currentEpisode,
  inbox: state.main.inbox,
  token: state.main.token,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  visible: state.podcasts.searchSpinner,
  text: state.podcasts.searchText,
  view: state.header.view,
  subscriptions: state.podcasts.subscriptions
})

class PodcastList extends Component {
  componentDidMount () {
    getSubscriptions(this.props);
  }

  getPodcasts () {
    let query = this.props.text.slice().split().join('+');
    this.props.dispatch(podcastsActions.searchText(''));
    this.props.dispatch(podcastsActions.toggleSearchSpinner(true));
    fetch('http://itunes.apple.com/search?entity=podcast&term=' + query)
      .then(response => response.json())
      .then(response => {
        this.props.dispatch(podcastsActions.searchPodcasts(response.results));
        this.props.dispatch(podcastsActions.toggleSearchSpinner(false));
      })
      .catch(console.log);
  }

  getDiscovery () {
    if(this.props.subscriptions.length === 0) {
      return;
    }
      this.props.dispatch(podcastsActions.toggleSearchSpinner(true));
      fetch("https://siren-discovery.herokuapp.com/api/recommend", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.subscriptions)
      })
      .then(response => response.json())
      .then(response => {
        this.props.dispatch(podcastsActions.searchDiscovery(response));
        this.props.dispatch(podcastsActions.toggleSearchSpinner(false));
      })
      .catch(console.log);
  }

  render() {
    var list = this.props.podcasts;
    if (this.props.view === 'Discovery') {
      list = this.props.discovered;
    }
    return (
      <View style={styles.mainView}>
          {this.props.view === 'Search' ?
          <View style={styles.tabRow}>
            <View style={[styles.searchTab, styles.activeTab]}>
              <Text style={styles.searchText}>Search</Text>
            </View>
            <TouchableOpacity style={styles.discoveryTab} onPress={() => {this.getDiscovery(); this.props.dispatch(headerActions.changeView('Discovery'))}}>
              <Text style={styles.discoveryText}>Recommendations</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.tabRow}>
            <TouchableOpacity style={styles.searchTab} onPress={() => {this.props.dispatch(headerActions.changeView('Search'))}}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
            <View style={[styles.discoveryTab, styles.activeTab]}>
              <Text style={styles.discoveryText}>Recommendations</Text>
            </View>
          </View>
          }
         {this.props.view === 'Search' ?
          <View style={styles.searchBar}>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' placeholder='Seach for podcast' style={styles.searchInput} onChangeText={(text) => {this.props.dispatch(podcastsActions.searchText(text));}} onSubmitEditing={this.getPodcasts.bind(this)} value={this.props.text}/>
            <Ionicons style={styles.searchButton} onPress={this.getPodcasts.bind(this)} size={30} color='grey' name="ios-search" />
          </View> :
          <View style={styles.discoverySpacer}></View>
        }
        <ScrollView style={styles.podcastList}>
          {this.props.visible ?
            <Spinner visible={this.props.visible} textContent={"Searching..."} textStyle={{color: '#FFF'}} />  :
          list.map((podcast, i) => (
              <PodcastListCard podcast={podcast} key={i}/>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tabRow: {
    flexDirection: 'row',
    height: 35,
    margin: 5
  },
  searchTab: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRightWidth: 0.5,
    borderColor: 'lightgrey'
  },
  discoveryTab: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderLeftWidth: 0.5,
    borderColor: 'lightgrey'
  },
  activeTab: {
    backgroundColor: '#50BFB9'
  },
  searchText: {
    textAlign: 'center'
  },
  discoverySpacer: {
    marginBottom: 10
  },
  discoveryText: {
    textAlign: 'center'
  },
  searchInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 6,
  },
  searchButton: {
    marginLeft: 8,
  },
  recommendationBar: {
    justifyContent: 'center',
  },
  recommended: {
    height: 30,
    marginTop: 10,
    color: 'grey',
    fontSize: 22,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  switchTo: {
    height: 20,
    marginTop: 10,
    color: 'grey',
    fontSize: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  podcastList:{
    width: '100%',
    marginBottom: 80,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default connect(mapStateToProps)(PodcastList);
