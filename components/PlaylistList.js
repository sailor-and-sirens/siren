import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Button} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators as playerActions } from '../actions/Player';
import { actionCreators as swipeActions } from '../actions/Swipe';
import PlaylistCard from './PlaylistCard';
import PlaylistCardNoSwipe from './PlaylistCardNoSwipe';
import { actionCreators as playlistActions } from '../actions/Playlist';
import { getAllPlaylists } from '../helpers';

const mapStateToProps = (state) => ({
  allplaylists: state.playlist.allplaylists,
  token: state.main.token,
});

class PlaylistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      visible: false
    }
  }

  addPlaylist(){
    var that = this;
    fetch("http://siren-server.herokuapp.com/api/playlists/create-playlist", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      },
      body: JSON.stringify({name: this.state.text})
    })
    .then(function(response){
      that.setState({text: ""});
      if(response){
        getAllPlaylists(that.props);
      }
    });
  }

  componentDidMount(){
    if(!this.props.allplaylists.length){
      getAllPlaylists(this.props);
    }
  }

  render() {
   return (
      <View style={styles.mainView}>
        <ScrollView>
        <View style={styles.searchArea}>
          <Text>Create New Playlist</Text>
          <View style={styles.searchBar}>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.searchInput} onChangeText={(text) => {this.setState({text});}} onSubmitEditing={() => getAllPlaylists(this.props)} value={this.state.text}/>
            <Button style={styles.button} onPress={this.addPlaylist.bind(this)} underlayColor='#99d9f4' title='Create' />
          </View>
        </View>
        {this.props.allplaylists.slice(0,2).map((playlist, index) => {
          return (
            <PlaylistCardNoSwipe key={index} playlist={playlist}/>
          )
        })}
          {this.props.allplaylists.slice(2).map((playlist, index) => {
            return (
              <PlaylistCard key={index + 1} playlist={playlist}/>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{
    marginBottom: 185,
  },
  searchArea: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episodeList:{
    width: '100%',
    marginBottom: 210,
  },
  searchInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  searchButton: {
    marginLeft: 8,
  },
})

export default connect(mapStateToProps)(PlaylistList);
