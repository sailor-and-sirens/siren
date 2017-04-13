import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Image, Platform, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import EpisodeListCard from './EpisodeListCard';

let _ = require('lodash')

const mapStateToProps = (state) => ({
  inbox: state.inbox,
  filters: state.inboxFilters
})

class Filter extends Component {
    constructor(props) {
    super(props);
    this.state = {
      liked: props.filters.liked,
      bookmarked: props.filters.bookmarked,
      time: props.filters.time,
      tag: props.filters.tag,
    }
  }

  getTags = () => {
    var tags = ['All'];
    this.props.inbox.forEach((episode) => {
      tags.push(episode.tag);
    });
    return  _.uniq(tags);
  }

  render() {
   return (
      <View style={styles.mainView}>
        <ScrollView>
          <View style={styles.filterBar}>
            <Ionicons style={styles.icon} size={30} color='grey' name="ios-heart-outline"/>
            <Picker itemStyle={styles.pickerItem} style={styles.picker}
                selectedValue={this.state.liked}
                onValueChange={(value) => {this.setState({liked: value});}}>
              <Picker.Item style={styles.pickerItem} value="likedOff" label="All" />
              <Picker.Item style={styles.pickerItem} value="liked" label="Liked" />
              <Picker.Item style={styles.pickerItem} value="notLiked" label="Not Liked" />
            </Picker>
          </View>

          <View style={styles.filterBar}>
              <Ionicons style={styles.bookmark} size={30} color='grey' name="ios-bookmark-outline"/>
              <Picker style={styles.picker}
                  selectedValue={this.state.bookmarked}
                  onValueChange={(value) => {this.setState({bookmarked: value});}}>
                <Picker.Item value="bookmarkedOff" label="All" />
                <Picker.Item value="bookmarked" label="Bookmarked" />
                <Picker.Item value="notBookmarked" label="Not Bookmarked" />
              </Picker>
          </View>

          <View style={styles.filterBar}>
            <Image source={require('../assets/clockIcons/clock5.png')} style={styles.clock} />
            <Picker style={styles.picker}
                selectedValue={this.state.time}
                onValueChange={(value) => {this.setState({time: value});}}>
              <Picker.Item value="timeOff" label="All" />
              <Picker.Item value="5" label="< 5 min" />
              <Picker.Item value="15" label="< 15 min" />
              <Picker.Item value="30" label="< 30 min" />
              <Picker.Item value="45" label="< 45 min" />
              <Picker.Item value="60" label="< 60 min" />
              <Picker.Item value="60+" label="> 60 min" />
            </Picker>
          </View>
        </ScrollView>
          <View style={styles.filterBar}>
          <Ionicons style={styles.icon} size={30} color='grey' name="ios-pricetag-outline"/>
          <Picker style={styles.picker}
                selectedValue={this.state.tag}
                onValueChange={(value, i) => {this.setState({tag: value});}}>
              {this.getTags().map((tag, i) => (
                <Picker.Item value={tag} label={tag} key={i}/>
              ))}
          </Picker>
          </View>
        <View style={styles.buttonView}>
          <Button style={styles.done} color='grey' onPress={() =>{this.props.dispatch(actionCreators.toggleModal()); this.props.dispatch(actionCreators.updateInboxFilters(this.state));}} title='Filter'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 400,
  },
  filterBar:{
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
      android: {
        justifyContent: 'space-between',
      },
    }),
    alignItems: 'center',
    width: 250,
  },
  clock: {
    height: 28,
    width: 28,
  },
  bookmark: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  picker: {
    width: 200,
    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
      android: {
        justifyContent: 'space-between',
      },
    }),
  },
  pickerItem: {
 ...Platform.select({
      ios: {
        fontSize: 10,
      },
    }),
  },
  icon: {
    alignSelf: 'center',
  },
  done: {
    alignSelf: 'center',
    fontWeight: '500',
    padding: 5,
  },
  buttonView: {
    marginTop: 15,
  },
});

export default connect(mapStateToProps)(Filter);