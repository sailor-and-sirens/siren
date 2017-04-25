import React, { Component } from 'react';
import PodcastManagerCard from './PodcastManagerCard';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { actionCreators as swipeActions } from '../actions/Swipe';
import Spinner from 'react-native-loading-spinner-overlay';
import { getSubscriptions } from '../helpers';

const mapStateToProps = (state) => ({
  currentPodcast: state.podcasts.currentPodcast,
  inbox: state.main.inbox,
  token: state.main.token,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  visible: state.podcasts.searchSpinner,
  subscriptions: state.podcasts.subscriptions
})

// let subscriptions = [{id: 1, artistName: 'This Artist', name: 'A Great Podcast', primaryGenreName: 'Tester', artworkUrl: 'http://is1.mzstatic.com/image/thumb/Music71/v4/4f/67/ae/4f67aea3-f666-360e-703c-ffd419ea5a0c/source/100x100bb.jpg', createdAt: '2017-04-21 13:05:42.503-04'}, {id: 2, artistName: 'test', name: 'test', primaryGenreName: 'test', artworkUrl: 'http://is1.mzstatic.com/image/thumb/Music71/v4/4f/67/ae/4f67aea3-f666-360e-703c-ffd419ea5a0c/source/100x100bb.jpg', createdAt: '2017-04-21 13:05:42.503-04'}];

class PodcastManager extends Component {

  componentDidMount() {
    getSubscriptions(this.props);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.instructions}>Swipe to the left to unsubscribe</Text>
        <ScrollView style={styles.podcastList}>
          {this.props.visible ?
            <Spinner visible={this.props.visible} textContent={"Loading Subscriptions..."} textStyle={{color: '#FFF'}} />  :
          this.props.subscriptions.map((podcast, i) => (
              <PodcastManagerCard podcast={podcast} key={i} id={i}/>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
    marginTop: 8,
    marginBottom: 8,
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  podcastList:{
    width: '100%',
    marginBottom: 210,
  },
});

export default connect(mapStateToProps)(PodcastManager);