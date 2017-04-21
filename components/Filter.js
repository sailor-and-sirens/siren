import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Image, Platform, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import EpisodeListCard from './EpisodeListCard';

let _ = require('lodash')

const mapStateToProps = (state) => ({
  inbox: state.main.inbox,
  filters: state.main.inboxFilters
})

class Filter extends Component {

  getTags = () => {
    var tags = ['All'];
    Object.keys(this.props.inbox).forEach((key) => {
      tags.push(this.props.inbox[key].tag);
    });
    return  _.uniq(tags);
  }

  render() {
   return (
      <View style={styles.mainView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.filterBar}>
            <Ionicons style={styles.icon} size={30} color='grey' name="ios-heart-outline"/>
            <Picker itemStyle={styles.pickerItem} style={styles.picker}
                selectedValue={this.props.filters.liked}
                onValueChange={(value) => {this.props.dispatch(actionCreators.updateLikedFilter(value))}}>
              <Picker.Item style={styles.pickerItem} value="likedOff" label="All" />
              <Picker.Item style={styles.pickerItem} value="liked" label="Liked" />
              <Picker.Item style={styles.pickerItem} value="notLiked" label="Not Liked" />
            </Picker>
          </View>

          <View style={styles.filterBar}>
              <Ionicons style={styles.bookmark} size={30} color='grey' name="ios-bookmark-outline"/>
              <Picker style={styles.picker}
                  selectedValue={this.props.filters.bookmarked}
                  onValueChange={(value) => {this.props.dispatch(actionCreators.updateBookmarkedFilter(value))}}>
                <Picker.Item value="bookmarkedOff" label="All" />
                <Picker.Item value="bookmarked" label="Bookmarked" />
                <Picker.Item value="notBookmarked" label="Not Bookmarked" />
              </Picker>
          </View>

          <View style={styles.filterBar}>
            <Image source={require('../assets/clockIcons/clock5.png')} style={styles.clock} />
            <Picker style={styles.picker}
                selectedValue={this.props.filters.time}
                onValueChange={(value) => {this.props.dispatch(actionCreators.updateTimeFilter(value))}}>
              <Picker.Item value="timeOff" label="All" />
              <Picker.Item value="5" label="< 5 min" />
              <Picker.Item value="15" label="< 15 min" />
              <Picker.Item value="30" label="< 30 min" />
              <Picker.Item value="45" label="< 45 min" />
              <Picker.Item value="60" label="< 60 min" />
              <Picker.Item value="60+" label="> 60 min" />
            </Picker>
          </View>
          <View style={styles.filterBar}>
          <Ionicons style={styles.icon} size={30} color='grey' name="ios-pricetag-outline"/>
          <Picker style={styles.picker}
                selectedValue={this.props.filters.tag}
                onValueChange={(value, i) => {this.props.dispatch(actionCreators.updateTagFilter(value))}}>
              {this.getTags().map((tag, i) => (
                <Picker.Item value={tag} label={tag} key={i}/>
              ))}
          </Picker>
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button style={styles.done} color='grey' onPress={() =>{this.props.dispatch(actionCreators.toggleModal());}} title='Filter'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    ...Platform.select({
      ios: {
        height: '70%',
        marginBottom: 10
      },
    }),
  },
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
  },
});

export default connect(mapStateToProps)(Filter);
