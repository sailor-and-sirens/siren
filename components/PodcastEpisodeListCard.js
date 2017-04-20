import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AsyncStorage, Alert, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { actionCreators as mainActions } from '../actions';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import {hmsToSecondsOnly} from '../helpers';
import moment from 'moment';

let _ = require('lodash');

const mapStateToProps = (state) => ({
  currentEpisode: state.player.currentEpisode,
  inbox: state.main.inbox,
  token: state.main.token,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  podcast: state.podcasts.currentPodcast
});

class PodcastEpisodeListCard extends Component {
  addToInbox = () => {
     fetch("http://siren-server.herokuapp.com/api/episodes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({podcast: this.props.podcast, episode: this.props.episode})
    });
    fetch("http://siren-server.herokuapp.com/api/users/inbox", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
    })
    .then(inbox => inbox.json())
    .then((inbox) => {
      this.props.dispatch(mainActions.updateInbox(inbox));
    })
    .catch((err) => console.warn(err));
  }

  renderClock = (duration) => {
    if (duration.length < 5) {
      duration = '00:' + duration;
    }
    duration = hmsToSecondsOnly(duration);
    if (duration <= 300) {
      return <Image source={require('../assets/clockIcons/clock5.png')} style={styles.clock} />
    }
    if (duration <= 900) {
      return <Image source={require('../assets/clockIcons/clock15.png')} style={styles.clock} />
    }
    if (duration <= 1800) {
      return <Image source={require('../assets/clockIcons/clock30.png')} style={styles.clock} />
    }
    if (duration <= 2700) {
      return <Image source={require('../assets/clockIcons/clock45.png')} style={styles.clock} />
    }
    if (duration > 2700) {
      return <Image source={require('../assets/clockIcons/clock60.png')} style={styles.clock} />
    }
  };

  render() {
    const {leftActionActivated, leftToggle, episode} = this.props;
    return (
      <Swipeable
        leftActionActivationDistance={200}
        leftContent={(
          <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'rgb(221, 95, 95)' : '#42f4c5'}]}>
            {leftActionActivated ?
              <Text>(( release ))</Text> :
              <Text>Add to Inbox</Text>}
          </View>
        )}
        onLeftActionActivate={() => this.props.dispatch(swipeActions.updateLeftActivation(true))}
        onLeftActionDeactivate={() => this.props.dispatch(swipeActions.updateLeftActivation(false))}
        onLeftActionComplete={() => {
          this.addToInbox();
          Alert.alert('Added ' + ' to inbox.')
        }}
      >
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <View style={styles.rightView}>
            <Text style={styles.episode} numberOfLines={1}>{episode.title}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>{episode.description}</Text>
            <View style={styles.timeDateView}>
              <Text style={styles.date}>{moment(episode.published.substring(0,10)).format('ddd, DD MMM YYYY')}</Text>
               <View style={styles.timeView}>
                {this.renderClock(episode.duration)}
                <Text style={styles.time}>{episode.duration}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
    );
  }

}

const styles = StyleSheet.create({
  topView: {
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    flex: .75,
    marginBottom: 4,
    marginTop: 4,
    paddingRight: 5,
  },
  rightView: {
    paddingLeft: 3,
    flex: .75,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
    paddingLeft: (Platform.OS === 'ios') ? 10 : 0,
  },
  timeDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    marginTop: 8,
  },
  mainView: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    borderTopColor: 'lightgrey',
    marginLeft: 6,
    marginRight: 2,
  },
  episode: {
    fontWeight: "500",
    marginBottom: 5,
   ...Platform.select({
      ios: {
        fontSize: 14,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
  fontWeight: "400",
   ...Platform.select({
      ios: {
        fontSize: 12,
      },
      android: {
        fontSize: 14,
      },
    }),
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
  date: {
    fontWeight: "400",
  ...Platform.select({
    ios: {
      fontSize: 13,
    },
    android: {
      fontSize: 14,
    },
  }),
    color: 'grey',
  },
  time: {
    fontWeight: "400",
  ...Platform.select({
    ios: {
      fontSize: 13,
    },
    android: {
      fontSize: 14,
    },
  }),
    marginRight: 5,
    color: 'grey',
  },
  clock: {
    marginRight: 7,
    height: 15,
    width: 15,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 3,
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
});

export default connect(mapStateToProps)(PodcastEpisodeListCard);