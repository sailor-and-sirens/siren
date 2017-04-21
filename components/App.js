import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header'
import { swipeActions } from '../actions/Swipe'
import EpisodeListCard from './EpisodeListCard';
import PodcastListCard from './PodcastListCard';
import EpisodeList from './EpisodeList';
import PodcastList from './PodcastList';
import Player from './Player';
import Header from './Header';
import ModalComponent from './Modal';
import Authentication from './Authentication';
import Settings from './Settings';
import PodcastViewCard from './PodcastViewCard';
import AddPlaylistModal from './AddPlaylistModal';

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
        console.log('TOKEN: ', this.props.token);
        this.props.dispatch(headerActions.changeView('Inbox'))
      }
    })
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
        {this.props.view === 'Search' ?
        <PodcastList/> :
        this.props.view === 'Inbox' ?
        <EpisodeList/> :
        this.props.view === 'Settings' ?
         <View>
          <Settings />
        </View> :
        this.props.view === 'Podcast' ?
        <View>
          <PodcastViewCard />
        </View> :
        <View>
          <ModalComponent><Text>Hey! I'm a modal!</Text></ModalComponent>
          <Button title="Show Modal" onPress={() => this.props.dispatch(actionCreators.toggleModal())} />
        </View>
        }
        <AddPlaylistModal isAddPlaylistModalVisible={this.props.isAddPlaylistModalVisible} />
        <Player />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  podcastEpisodes: {
    marginBottom: 245,
  },
});

export default connect(mapStateToProps)(App);
