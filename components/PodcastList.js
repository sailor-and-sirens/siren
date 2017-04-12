import React, { Component } from 'react';
import PodcastListCard from './PodcastListCard';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  podcasts: state.main.iTunesResult
})


class PodcastList extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      podcasts: [],
    }
  }

  getPodcasts () {
    query = this.state.text.slice().split().join('+');
    this.setState({text: ""});
    fetch('http://itunes.apple.com/search?entity=podcast&term=' + query)
      .then(response => response.json())
      .then(response => {
        this.setState({
          podcasts: response.results
        });
      })
      .catch(console.warn);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.searchBar}>
          <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.searchInput} onChangeText={(text) => {this.setState({text});}} onSubmitEditing={this.getPodcasts.bind(this)} value={this.state.text}/>
          <Ionicons style={styles.searchButton} onPress={this.getPodcasts.bind(this)} size={30} color='grey' name="ios-search" />
        </View>
        <ScrollView style={styles.podcastList}>
          {this.state.podcasts.map((podcast, i) => (
              <PodcastListCard podcast={podcast} key={i}/>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchButton: {
    marginLeft: 8,
  },
  podcastList:{
    width: '100%',
    marginBottom: 180 //Prevents list from being cut off
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  }
})

export default connect(mapStateToProps)(PodcastList);
