import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { headerActions } from '../actions/Header';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  token: state.main.token,
  rightActionActivated: state.swipe.isRightActionActivated,
});

class PlaylistCardNoSwipe extends Component {

  componentWillMount(){
    this.imagesArr = [];
    this.setPlaylistImages();
  }

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
    .catch(console.log);
  }
  convertMinutesToHrsMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);
    return hours + 'h' + ' ' + minutes + 'm';
  }

  setPlaylistImages() {
    var placeholderImage = 'https://render.fineartamerica.com/images/rendered/small/print/images-square-real-5/soothing-sea-abstract-painting-linda-woods.jpg';
    this.props.playlist.Episodes.forEach(episode => {
      if(this.imagesArr.every(url => url !== episode.Podcast.artworkUrl) && this.imagesArr.length < 4){
        this.imagesArr.push(episode.Podcast.artworkUrl);
      }
    });
    if (this.imagesArr.length === 4) {
      this.imageClass = 'quad';
    } else if (this.imagesArr.length === 3) {
      this.imageClass = 'quad';
      this.imagesArr.push(this.imagesArr[0]);
    } else if (this.imagesArr.length === 2){
      this.imageClass = 'quad';
      this.imagesArr.splice(1, 0, this.imagesArr[1]);
      this.imagesArr.splice(3, 0, this.imagesArr[0]);
    } else if (this.imagesArr.length < 1) {
      this.imageClass = 'single';
      this.imagesArr.push(placeholderImage);
    } else {
      this.imageClass = 'single';
      this.imagesArr = this.imagesArr.slice(0,1);
    }
  }

  componentWillMount(){
    this.imagesArr = [];
    this.setPlaylistImages();
  }

  render() {
    return (

      <View style={[styles.cardContainer]}>
        <View style={[styles.image]}>
          <TouchableOpacity onPress={() => {
            this.props.dispatch(actionCreators.updatePlaylistFilter(this.props.playlist.name));
            this.props.dispatch(headerActions.changeView(this.props.playlist.name + ' Playlist'));
          }}>
            <View style={styles.image}>
              {this.imagesArr.map((image, index) => <Image key={index} source={{uri: image}} style={styles[this.imageClass]}/>)}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.playlistName}>{this.props.playlist.name}</Text>
          {this.props.playlist.Episodes.length > 0 ?
            <Text style={styles.recentlyAdded}>Recently Added:</Text> : <View></View>
          }
          {this.props.playlist.Episodes.slice(0,2).map((episode, index) => {
            return (
              <Text key={index} style={styles.episodeTitle} numberOfLines={1}>{episode.title}</Text>
            )
          })}
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{this.convertMinutesToHrsMinutes(this.props.playlist.totalTime)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  image: {
    height: 80,
    width: 80,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  quad: {
    height: 40,
    width: 40,
  },
  single: {
    height: 80,
    width: 80,
  },
  content: {
    flex: .60,
    height: 80,
    marginLeft: 5,
    paddingRight: 5,
    justifyContent: 'center'
  },
  playlistName: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5
  },
  recentlyAdded: {
    fontWeight: "500",
    fontSize: 12
  },
  episodeTitle: {
    fontSize: 12
  },
  timeContainer: {
    height: 80,
    justifyContent: 'center',
  },
  time: {
    fontWeight: "400",
    fontSize: 14,
    marginRight: 5,
    color: 'grey',
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
