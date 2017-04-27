import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header'
import { getSubscriptions } from '../helpers';
import EpisodeList from './EpisodeList';
import PodcastList from './PodcastList';
import Player from './Player';
import Header from './Header';
import Authentication from './Authentication';
import Settings from './Settings';
import PodcastViewCard from './PodcastViewCard';
import AddPlaylistModal from './AddPlaylistModal';
import PlaylistList from './PlaylistList';
import PodcastManager from './PodcastManager';

const mapStateToProps = (state) => ({
  inbox: state.main.inbox,
  isAddPlaylistModalVisible: state.swipe.isAddPlaylistModalVisible,
  token: state.main.token,
  view: state.header.view,
})

class App extends Component {

  componentWillMount() {
    AsyncStorage.getItem('id_token', (err, res) => {
      if (err || res === null) {
        this.props.dispatch(headerActions.changeView('Authentication'))
      } else {
        this.props.dispatch(actionCreators.addToken(res))
        this.props.dispatch(headerActions.changeView('Inbox'))
      }
    })
  }

  componentDidMount() {
    getSubscriptions(this.props);
  }

  render() {
    if (this.props.view === 'Authentication') {
      return (
        <View style={styles.container}>
          <Authentication/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Header/>
        {this.props.view === 'Search' || this.props.view === 'Discovery' ?
        <PodcastList/> :
        this.props.view === 'Inbox' ?
        <EpisodeList/> :
        this.props.view === 'Settings' ?
        <Settings/> :
        this.props.view === 'Podcast' ?
        <PodcastViewCard/> :
         this.props.view === 'Manage Subscriptions' ?
        <PodcastManager/> :
        this.props.view === 'Playlists' ?
        <PlaylistList/> :
        <EpisodeList/>
        }
        <AddPlaylistModal isAddPlaylistModalVisible={this.props.isAddPlaylistModalVisible} />
        <Player/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default connect(mapStateToProps)(App);
