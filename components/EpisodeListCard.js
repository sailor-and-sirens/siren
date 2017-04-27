import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AsyncStorage, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { actionCreators as mainActions } from '../actions';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { hmsToSecondsOnly, toggleBookmark, toggleLike } from '../helpers';
import { toggleAddToPlaylistModal } from '../helpers/playlistHelpers';
import moment from 'moment';

const mapStateToProps = (state) => ({
  currentEpisode: state.player.currentEpisode,
  inbox: state.main.inbox,
  token: state.main.token,
  leftActionActivated: state.swipe.isLeftActionActivated,
  leftToggle: state.swipe.isLeftToggled,
  rightActionActivated: state.swipe.isRightActionActivated,
  view: state.header.view
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
              <Text>{`Remove From ${this.props.view}`}</Text>}
          </View>
        )}
        onLeftActionActivate={() => this.props.dispatch(swipeActions.updateLeftActivation(true))}
        onLeftActionDeactivate={() => this.props.dispatch(swipeActions.updateLeftActivation(false))}
        onLeftActionComplete={() => {
          toggleAddToPlaylistModal(this.props.dispatch, this.props.id, this.props.token);
        }}

        onRightActionActivate={() => this.props.dispatch(swipeActions.updateRightActivation(true))}
        onRightActionDeactivate={() => this.props.dispatch(swipeActions.updateRightActivation(false))}
        onRightActionComplete={() => {
          let { currentEpisode, id, episode } = this.props;
          this.props.handleRemoveEpisode(id, currentEpisode, episode);
        }}
      >
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <View style={styles.leftView}>
            <TouchableOpacity onPress={this.props.handlePlay.bind(this, this.props.episode, this.props.id)}>
              <Image source={{uri: this.props.episode.image}} style={styles.image}/>
            </TouchableOpacity>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.date}>{moment(this.props.episode['feed']['pubDate'].substring(0,16)).format('ddd, DD MMM YYYY')}</Text>
            <Text style={styles.episode} numberOfLines={2}>{this.props.episode['feed']['title']}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {this.props.episode['feed']['subtitle']}
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.tag} numberOfLines={1} ellipsizeMode='tail'> {this.props.episode['tag']} </Text>
          <View style={styles.timeView}>
            {this.renderClock(this.props.episode['feed']['duration'])}
            <Text style={styles.time}>{this.props.episode['feed']['duration']}</Text>
          </View>
          {this.props.episode.bookmark === true ?
          <Ionicons style={styles.favorite} size={25} color='grey' name="ios-bookmark" onPress={()=>(toggleBookmark(this.props.id, this.props))}/> :
          <Ionicons style={styles.favorite} size={25} color='grey' name="ios-bookmark-outline" onPress={() =>(toggleBookmark(this.props.id, this.props))}/>
          }
          {this.props.episode.liked === true ?
          <Ionicons style={styles.favorite} size={25} color='grey' name="ios-heart" onPress={() =>(toggleLike(this.props.id, this.props))}/> :
          <Ionicons style={styles.favorite} size={25} color='grey' name="ios-heart-outline" onPress={() =>(toggleLike(this.props.id, this.props))}/>
          }
        </View>
      </View>
    </Swipeable>
    );
  }

}

const styles = StyleSheet.create({
  mainView: {
    height: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  topView: {
    flex: .75,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 5,
    paddingRight: 5,
  },
  leftView: {
    height: 90,
    width: 90,
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  rightView: {
    paddingLeft: 5,
    flex: 1,
    justifyContent: 'flex-start',
    height: 90,
  },
  bottomView: {
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginLeft: 10,
    paddingRight: 15
  },
  image: {
    height: 90,
    width: 90,
  },
  date: {
    marginBottom: 3,
    ...Platform.select({
       ios: {
         fontSize: 11,
       },
       android: {
         fontSize: 10
       },
     }),
  },
  episode: {
    marginBottom: 4,
    fontSize: 14,
    ...Platform.select({
       ios: {
         fontWeight: '500',
       },
       android: {
         fontWeight: '400'
       },
     }),
  },
  subtitle: {
    ...Platform.select({
       ios: {
         fontSize: 12,
       },
       android: {
         fontSize: 11
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
  tag: {
    width: 90,
    padding: 2,
    alignSelf: 'center',
    backgroundColor: '#50BFB9',
    fontSize: 12,
    textAlign: 'center',
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
