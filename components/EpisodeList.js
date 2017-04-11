import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import EpisodeListCard from './EpisodeListCard';

const mapStateToProps = (state) => ({
  inbox: state.inbox
})


class EpisodeList extends Component {

  render() {
   return (
      <View style={styles.mainView}>
         <ScrollView style={styles.episodeList}>
          {this.props.inbox.map((episode, i) => (
              <EpisodeListCard episode={episode} key={i}/>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episodeList:{
    width: '100%',
  },
})

export default connect(mapStateToProps)(EpisodeList);