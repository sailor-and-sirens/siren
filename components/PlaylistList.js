import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import PlaylistCardNoSwipe from './PlaylistCardNoSwipe';
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
        <ScrollView style={styles.scrollArea}>
          <View style={styles.createPlaylistWrapper}>
            <TextInput underlineColorAndroid="transparent" style={styles.addPlaylistInput} onChangeText={(text) => {this.setState({text});}} onSubmitEditing={() => getAllPlaylists(this.props)} placeholder={'Enter Name of New Playlist'} value={this.state.text} />
            <TouchableOpacity onPress={this.addPlaylist.bind(this)} style={styles.addPlaylistButton}><Text style={styles.addPlaylistButtonText}>Create Playlist</Text></TouchableOpacity>
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
    flex: 1,
    marginRight: 5,
    marginLeft: 10
  },
  scrollArea: {
    marginBottom: 80
  },
  createPlaylistWrapper: {
    flexDirection: 'row',
    margin: 5,
    marginBottom: 5,
    marginLeft: 0
  },
  addPlaylistInput: {
    height: 40,
    flex: 0.65,
    alignSelf: 'center',
    marginRight: 5,
    padding: 5,
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    borderWidth: 1
  },
  addPlaylistButton: {
    height: 40,
    flex: 0.35,
    justifyContent: 'center',
    backgroundColor: '#288D91'
  },
  addPlaylistButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
  }
})

export default connect(mapStateToProps)(PlaylistList);
