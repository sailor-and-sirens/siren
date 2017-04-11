import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import EpisodeListCard from './EpisodeListCard';

const mapStateToProps = (state) => ({
  podcast: state.podcast
})


class EpisodeList extends Component {

  render() {
   return (
      <View>
        <EpisodeListCard />
      </View>
    );
  }
}

export default connect(mapStateToProps)(EpisodeList);