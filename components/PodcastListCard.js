import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

// const mapStateToProps = (state) => ({
//   podcast: state.iTunesResult
// })

class PodcastListCard extends Component {

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.leftView}>
          <Image source={{uri: this.props.podcast.artworkUrl100}} style={styles.image}/>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title} numberOfLines={1}>{this.props.podcast.collectionName}</Text>
          <Text style={styles.artist} numberOfLines={2}>{this.props.podcast.artistName}</Text>
          <View style={styles.tagAddView}>
            <Text style={styles.tag}> {this.props.podcast.primaryGenreName} </Text>
            <Ionicons style={styles.favorite} size={30} color='grey' name="ios-add-circle-outline"/>
          </View>
        </View>
      </View>
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
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  mainView: {
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },
  image: {
    height: 80,
    width: 80,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
  },
  artist: {
  fontWeight: "400",
  fontSize: 16,
  marginBottom: 5,
  },
  podcast: {
    fontWeight: "600",
    fontSize: 16,
  },
  tagAddView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  tag: {
    backgroundColor: '#f4a442',
    padding: 2,
    alignSelf: 'flex-start',
  },
});

// export default connect(mapStateToProps)(PodcastListCard);
export default PodcastListCard;