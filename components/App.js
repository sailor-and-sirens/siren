import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Button } from 'react-native';
import EpisodeListCard from './EpisodeListCard';
import PodcastListCard from './PodcastListCard';
import EpisodeList from './EpisodeList';
import PodcastList from './PodcastList';

// App is connected to the store using connect - check out line 47 as well
// it also gives us the dispatch method on this.props - see line 21.
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import Player from './Player';
import Header from './Header';
import ModalComponent from './Modal';
import Authentication from './Authentication';

// connect gives us mapStateToProps, which gives us access to our state
const mapStateToProps = (state) => ({
  view: state.main.view,
  token: state.main.token
})

class App extends Component {

componentWillMount() {
  AsyncStorage.getItem('id_token', (err, res) => {
      if (err) {
        this.props.dispatch(actionCreators.changeView('Authentication'))
      } else {
        console.warn('res:', res);
        this.props.dispatch(actionCreators.addToken(res))
        // this.props.dispatch(actionCreators.changeView('Inbox'))
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
    console.warn('this.props.token', this.props.token);
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


