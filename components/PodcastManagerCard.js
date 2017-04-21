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
import moment from 'moment';

const mapStateToProps = (state) => ({
  token: state.main.token,
  view: state.header.view,
  rightActionActivated: state.swipe.isRightActionActivated,
  rightToggle: state.swipe.isRightToggled,
  subscriptions: state.main.subscriptions
});


class PodcastManagerCard extends Component {

  unsubscribe = (id) => {
  //   var subscriptions = this.props.subscriptions.slice().splice(id, 1);
  //   fetch("http://siren-server.herokuapp.com/api/podcasts/delete", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': this.props.token
  //     },
  //     body: JSON.stringify({id: key})
  //   })
  //     .then(response =>  response.json())
  //     .then(response => {
  //       this.this.props.dispatch(podcastsActions.updateSubscriptions(subscriptions));
  //     })
  //     .catch(err => console.log(err));
  console.warn('Unsubscribe under construction. Key = ', id);
  }

  render() {
    const {rightActionActivated, rightToggle} = this.props;
    return (
      <Swipeable
            rightActionActivationDistance={200}
            rightContent={(
              <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#42f4c5' : 'rgb(221, 95, 95)'}]}>
                {rightActionActivated ?
                  <Text>(( release ))</Text> :
                  <Text>Unsubscribe</Text>}
              </View>
            )}
            onRightActionActivate={() => this.props.dispatch(swipeActions.updateRightActivation(true))}
            onRightActionDeactivate={() => this.props.dispatch(swipeActions.updateRightActivation(false))}
            onRightActionComplete={() => {
              this.unsubscribe(this.props.id);
              Alert.alert('Unsubscribed from ' + this.props.podcast.name);
            }}
          >
        <View style={styles.mainView}>
          <View style={styles.leftView}>
            <TouchableOpacity onPress={() => {this.getEpisodes()}}>
              <Image source={{uri: this.props.podcast.artworkUrl}} style={styles.image}/>
            </TouchableOpacity>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.title} numberOfLines={1}>{this.props.podcast.name}</Text>
            <Text style={styles.artist} numberOfLines={1}>{this.props.podcast.artistName}</Text>
            <Text style={styles.date}> Added {moment(this.props.podcast.createdAt).format('ddd, DD MMM YYYY')} </Text>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: (Platform.OS === 'ios') ? 10 : 0,
  },
  mainView: {
    height: 85,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  },
  image: {
    height: 70,
    width: 70,
    marginLeft: 5,
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
    paddingLeft: 2,
    paddingTop: 2,
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
  paddingLeft: 2,
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
  date: {
    color: 'grey',
  },
    rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
});

export default connect(mapStateToProps)(PodcastManagerCard);
