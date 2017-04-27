import React, { Component } from 'react';
import PodcastManagerCard from './PodcastManagerCard';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { connect } from 'react-redux';
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
});


class PodcastManager extends Component {

  componentDidMount() {
    getSubscriptions(this.props);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View><Text style={styles.instructions}>Swipe to the left to unsubscribe</Text></View>
        <ScrollView style={styles.podcastList}>
          {this.props.visible ?
            <Spinner visible={this.props.visible} textContent={"Loading Subscriptions..."} textStyle={{color: '#FFF'}} />  :
            this.props.subscriptions.map((podcast, i) => (
              <PodcastManagerCard podcast={podcast} key={i} id={i}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
    marginTop: 8,
    marginBottom: 8
  },
  podcastList:{
    marginBottom: 80,
  },
});

export default connect(mapStateToProps)(PodcastManager);
