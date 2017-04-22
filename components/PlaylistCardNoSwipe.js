import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { actionCreators as swipeActions } from '../actions/Swipe';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { headerActions } from '../actions/Header';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  token: state.main.token,
  rightActionActivated: state.swipe.isRightActionActivated,
});

class PlaylistCardNoSwipe extends Component {
  removePlaylist(playlistId){
    fetch("http://siren-server.herokuapp.com/api/playlists/remove-playlist", {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({playlistId: playlistId})
    })
    .then(function(data){
      console.log('REMOVED');
    })
    .catch(function(error){
      console.log('Error removing playlist: ', error);
    })

  }
  convertMinutesToHrsMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);
    return hours + 'h' + ' ' + minutes + 'm';
  }

  render() {
    const {rightActionActivated, rightToggle} = this.props;
    return (

      <View style={[styles.cardContainer]}>
        <View style={[styles.image]}>
          <TouchableOpacity onPress={() => {
            this.props.dispatch(actionCreators.updatePlaylistFilter(this.props.playlist.name));
            this.props.dispatch(headerActions.changeView(this.props.playlist.name + ' Playlist'));
          }}>
            <Image source={{uri: 'http://www.iconsfind.com/wp-content/uploads/2015/11/20151104_5639735648c34.png'}} style={styles.image}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.content]}>
          <Text style={styles.title}>{this.props.playlist.name}</Text>
          {this.props.playlist.Episodes.slice(0,2).map((episode, index) => {
            var title = episode.title.slice(0, 25) + '...';
            return <Text key={index}>{title}</Text>
          })}
        </View>
        <View>
          <Text style={[styles.time]}>{this.convertMinutesToHrsMinutes(this.props.playlist.totalTime)}</Text>
        </View>
      </View>


    );
  }

}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
  },
  title:{
    fontWeight: "500",
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
    marginLeft: 5
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

export default connect(mapStateToProps)(PlaylistCardNoSwipe);
