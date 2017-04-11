import React, { Component } from 'react';
import { Audio } from 'expo';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import EpisodeListCard from './EpisodeListCard';
import PodcastListCard from './PodcastListCard';

// App is connected to the store using connect - check out line 47 as well
// it also gives us the dispatch method on this.props - see line 21.
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import Player from './Player';
import  Header  from './Header';
import  ModalComponent  from './Modal';

// connect gives us mapStateToProps, which gives us access to our state
const mapStateToProps = (state) => ({
  view: state.view
})

class App extends Component {
  componentDidMount = () => {
    Audio.setIsEnabledAsync(true)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header></Header>
        <Text>Episode Card:</Text>
        <EpisodeListCard/>
        <Text>Podcast Card:</Text>
        <PodcastListCard/>
        <ModalComponent>Hey! I'm a modal!</ModalComponent>
        <Button title="Show Modal" onPress={() => this.props.dispatch(actionCreators.toggleModal())} />
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
