import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import EpisodeListCard from './EpisodeListCard';

const mapStateToProps = (state) => ({
  inbox: state.inbox,
  filters: state.inboxFilters
})


class Filter extends Component {

  render() {
   return (
      <View style={styles.mainView}>

        <View style={styles.filterBar}>
          <Ionicons style={styles.favorite} size={30} color='grey' name="ios-heart-outline"/>
          <Picker style={styles.picker}>
            <Picker.Item value="bookmarksReset" label="All" />
            <Picker.Item value="bookmarksOnly" label="Liked" />
            <Picker.Item value="bookmarksHide" label="Not Liked" />
          </Picker>
        </View>

        <View style={styles.filterBar}>
            <Ionicons style={styles.favorite} size={30} color='grey' name="ios-bookmark-outline"/>
            <Picker style={styles.picker}>
              <Picker.Item value="bookmarksReset" label="All" />
              <Picker.Item value="bookmarksOnly" label="Bookmarked" />
              <Picker.Item value="bookmarksHide" label="Not Bookmarked" />
            </Picker>
        </View>

        <View style={styles.filterBar}>
          <Image source={require('../assets/clockIcons/clock5.png')} style={styles.clock} />
          <Picker style={styles.picker}>
            <Picker.Item value="bookmarksReset" label="All" />
            <Picker.Item value="bookmarksOnly" label="< 5 min" />
            <Picker.Item value="bookmarksHide" label="< 15 min" />
            <Picker.Item value="bookmarksHide" label="< 30 min" />
            <Picker.Item value="bookmarksHide" label="< 45 min" />
            <Picker.Item value="bookmarksHide" label="< 60 min" />
            <Picker.Item value="bookmarksHide" label="> 60 min" />
          </Picker>
        </View>

        <View style={styles.filterBar}>
        <Ionicons style={styles.favorite} size={30} color='grey' name="ios-pricetag-outline"/>
        <Picker style={styles.picker}>
            <Picker.Item value="bookmarksReset" label="All" />
             {this.props.inbox.map((episode, i) => (
               <Picker.Item value={episode.tag} label={episode.tag} />
            ))}
        </Picker>
        </View>
        <View>
          <Text style={styles.done} onPress={() => this.props.dispatch(actionCreators.toggleModal())}>Done</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
  },
  clock: {
    height: 28,
    width: 28,
  },
  picker: {
    width: 200,
  },
  done: {
    alignSelf: 'center',
    fontWeight: '500',
    color: 'grey',
  }
});

export default connect(mapStateToProps)(Filter);