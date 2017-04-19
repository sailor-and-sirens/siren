import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { actionCreators as mainActions } from '../actions';
import { actionCreators as swipeActions } from '../actions/Swipe';
import {hmsToSecondsOnly} from '../helpers';

let _ = require('lodash');

const mapStateToProps = (state) => ({
  currentEpisode: state.player.currentEpisode,
  inbox: state.main.inbox,
  token: state.main.token,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  rightActionActivated: state.swipe.isRightActionActivated
});

class EpisodeListCard extends Component {

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

  toggleLike = (id) => {
    var inbox = _.cloneDeep(this.props.inbox);
    inbox[id].liked = !inbox[id].liked;
    this.props.dispatch(mainActions.toggleLike(inbox));
    fetch("http:localhost:3000/api/users/likeEpisode", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({id: id, liked: !this.props.inbox[id].liked})
    })
  };

  toggleBookmark = (id) => {
    var inbox = _.cloneDeep(this.props.inbox);
    inbox[id].bookmark = !inbox[id].bookmark;
    this.props.dispatch(mainActions.toggleBookmark(inbox));
    fetch("http:localhost:3000/api/users/bookmarkEpisode", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({id: id, bookmark: !this.props.inbox[id].bookmark})
    })
  };

  render() {
    const {leftActionActivated, leftToggle, rightActionActivated, rightToggle} = this.props;
    return (
      <Swipeable
        leftActionActivationDistance={200}
        leftContent={(
          <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'rgb(221, 95, 95)' : '#42f4c5'}]}>
            {leftActionActivated ?
              <Text>(( release ))</Text> :
              <Text>Add to Playlist</Text>}
          </View>
        )}
        rightActionActivationDistance={200}
        rightContent={(
          <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#42f4c5' : 'rgb(221, 95, 95)'}]}>
            {rightActionActivated ?
              <Text>(( release ))</Text> :
              <Text>Remove Episode</Text>}
          </View>
        )}
        onLeftActionActivate={() => this.props.dispatch(swipeActions.updateLeftActivation(true))}
        onLeftActionDeactivate={() => this.props.dispatch(swipeActions.updateLeftActivation(false))}
        onLeftActionComplete={() => {
          this.props.dispatch(swipeActions.toggleAddToPlaylistModal());
        }}

        onRightActionActivate={() => this.props.dispatch(swipeActions.updateRightActivation(true))}
        onRightActionDeactivate={() => this.props.dispatch(swipeActions.updateRightActivation(false))}
        onRightActionComplete={() => {
            this.props.dispatch(mainActions.removeEpisodeFromInbox(this.props.id));
            if (this.props.currentEpisode && this.props.currentEpisode.feed.enclosure.url === this.props.episode.feed.enclosure.url) {
              this.props.handleRemovePlayingEpisode();
            }
        }}
      >


      <View style={[styles.cardContainer]}>
        <View style={[styles.image]}>
          <Text>Pic</Text>
        </View>
        <View style={[styles.content]}>
          <Text>Title</Text>
          <Text>Other stuff here</Text>
        </View>
        <View>
          <Text style={[styles.time]}>Time</Text>
        </View>
      </View>


    </Swipeable>
    );
  }

}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    backgroundColor: 'grey',
    flex: .25
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: "400",
    fontSize: 14,
    marginRight: 5,
    color: 'grey',
  },
  content: {
    flex: .60,
  },
  topView: {
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    flex: .75,
    marginBottom: 8,
    marginTop: 10,
    paddingRight: 5,
  },
  leftView: {
    flex: .25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightView: {
    paddingLeft: 3,
    flex: .75,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
  },
  bottomView: {
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 8,
  },
  mainView: {
    height: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
  episode: {
    fontWeight: "500",
    fontSize: 16,
  },
  subtitle: {
  fontWeight: "400",
  fontSize: 12,
  },
  podcast: {
    fontWeight: "600",
    fontSize: 16,
  },
  tag: {
    backgroundColor: '#42f4c5',
    alignSelf: 'center',
    padding: 2,
    width: 80,
    marginLeft: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontWeight: "400",
    fontSize: 12,
  },
  favorite: {
    alignSelf: 'center',
  },
  bookmark: {
    alignSelf: 'center',
  },
  clock: {
    marginRight: 7,
    height: 21,
    width: 21,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
});

export default connect(mapStateToProps)(EpisodeListCard);
