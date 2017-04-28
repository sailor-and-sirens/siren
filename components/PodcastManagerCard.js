import React, { Component } from 'react';
import Swipeable from 'react-native-swipeable';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert} from 'react-native';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { actionCreators as podcastsActions } from '../actions/Podcasts';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => ({
  token: state.main.token,
  view: state.header.view,
  rightActionActivated: state.swipe.isRightActionActivated,
  rightToggle: state.swipe.isRightToggled,
  subscriptions: state.podcasts.subscriptions
});


class PodcastManagerCard extends Component {

  unsubscribe = (id) => {
    var subscriptions = this.props.subscriptions.slice().filter((item) => {
      return item['id'] !== id;
    });
    this.props.dispatch(podcastsActions.updateSubscriptions(subscriptions));
    fetch("http://siren-server.herokuapp.com/api/podcasts/" + id, {
      method: "DELETE",
      headers: {
        'Authorization': this.props.token
      }
    })
    .catch(console.log);
  }

  render() {
    const {rightActionActivated} = this.props;
    return (
      <Swipeable
            rightActionActivationDistance={200}
            rightContent={(
              <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#114B5F' : '#D62828'}]}>
                {rightActionActivated ?
                  <Text style={styles.swipeText}>(( release ))</Text> :
                  <Text style={styles.swipeText}>Unsubscribe</Text>}
              </View>
            )}
            onRightActionActivate={() => this.props.dispatch(swipeActions.updateRightActivation(true))}
            onRightActionDeactivate={() => this.props.dispatch(swipeActions.updateRightActivation(false))}
            onRightActionComplete={() => {
              this.unsubscribe(this.props.podcast['id']);
              Alert.alert('Unsubscribed');
            }}
          >
        <View style={styles.mainView}>
          <View style={styles.leftView}>
            <TouchableOpacity onPress={() => {this.getEpisodes()}}>
              <Image source={{uri: this.props.podcast['artworkUrl']}} style={styles.image}/>
            </TouchableOpacity>
          </View>
          <View style={styles.rightView}>
            <Text style={styles.title} numberOfLines={1}>{this.props.podcast['name']}</Text>
            <Text style={styles.artist} numberOfLines={2}>{this.props.podcast['artistName']}</Text>
            <Text style={styles.date}>Added {moment(this.props.podcast['createdAt']).format('ddd, DD MMM YYYY')} </Text>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftView: {
    width: 70,
    height: 70,
    flex: .25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightView: {
    flex: 1,
    height: 70,
    paddingRight: 5,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: (Platform.OS === 'ios') ? 10 : 7,
  },
  mainView: {
    height: 85,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  image: {
    height: 70,
    width: 70,
  },
  title: {
    fontWeight: "500",
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
      android: {
        fontSize: 16,
      },
    })
  },
  artist: {
  ...Platform.select({
    ios: {
      fontSize: 12,
    },
    android: {
      fontSize: 13,
    },
  })
  },
  date: {
    color: 'grey',
    ...Platform.select({
      ios: {
        fontSize: 11,
      },
      android: {
        fontSize: 12,
      },
    })
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  swipeText: {
    color: '#ffffff'
  }
});

export default connect(mapStateToProps)(PodcastManagerCard);
