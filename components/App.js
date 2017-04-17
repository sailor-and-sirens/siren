import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Button } from 'react-native';
import EpisodeListCard from './EpisodeListCard';
import PodcastListCard from './PodcastListCard';
import EpisodeList from './EpisodeList';
import PodcastList from './PodcastList';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import Player from './Player';
import Header from './Header';
import ModalComponent from './Modal';
import Authentication from './Authentication';

const mapStateToProps = (state) => ({
  view: state.main.view,
  token: state.main.token
})

class App extends Component {

  // componentWillMount() {
  //   AsyncStorage.getItem('id_token', (err, res) => {
  //     if (err) {
  //       this.props.dispatch(actionCreators.changeView('Authentication'))
  //     } else {
  //       this.props.dispatch(actionCreators.addToken(res))
  //       this.props.dispatch(actionCreators.changeView('Inbox'))
  //     }
  //   })
  // }

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
        <View>
          <ModalComponent><Text>Hey! I'm a modal!</Text></ModalComponent>
          <Button title="Show Modal" onPress={() => this.props.dispatch(actionCreators.toggleModal())} />
        </View>
        }
        <Player />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }

});
export default connect(mapStateToProps)(App);


