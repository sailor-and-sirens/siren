import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// App is connected to the store using connect - check out line 47 as well
// it also gives us the dispatch method on this.props - see line 21
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import Player from './Player';

// connect gives us mapStateToProps, which gives us access to our state
const mapStateToProps = (state) => ({
  greeting: state.greeting
})

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Player />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default connect(mapStateToProps)(App);
