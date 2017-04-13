import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Image, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import EpisodeListCard from './EpisodeListCard';

const mapStateToProps = (state) => ({
  inbox: state.main.inbox,
  filters: state.main.inboxFilters
})

class Filter extends Component {
    constructor(props) {
    super(props);
    this.state = {
      liked: props.filters.liked,
      bookmarked: props.filters.bookmarked,
      time: props.filters.time,
      tag: props.filters.tag
    }
  }

  render() {
   return (
      <ScrollView style={{flex: 1, width: 400}}>
        <View style={styles.mainView}>
        <View style={styles.filterBar}>
          <Ionicons style={styles.icon} size={30} color='grey' name="ios-heart-outline"/>
          <Picker style={styles.picker}
              selectedValue={this.state.liked}
              onValueChange={(value) => {this.setState({liked: value});}}>
            <Picker.Item value="likedOff" label="All" />
            <Picker.Item value="liked" label="Liked" />
            <Picker.Item value="notLiked" label="Not Liked" />
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

        <View style={styles.filterBar}>
        <Ionicons style={styles.icon} size={30} color='grey' name="ios-pricetag-outline"/>
        <Picker style={styles.picker}
              selectedValue={this.state.tag}
              onValueChange={(value, i) => {this.setState({tag: value});}}>
            {this.props.inbox.map((episode, i) => (
              <Picker.Item value={episode.tag} label={episode.tag} key={i}/>
            ))}
        </Picker>
        </View>
        <View style={styles.buttonView}>
          <Button style={styles.done} color='grey' onPress={() =>{this.props.dispatch(actionCreators.toggleModal()); this.props.dispatch(actionCreators.updateInboxFilters(this.state));}} title='Filter'/>
        </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: 400,
  },
  filterBar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
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
