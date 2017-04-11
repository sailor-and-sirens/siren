import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
// App is connected to the store using connect - check out line 47 as well
// it also gives us the dispatch method on this.props - see line 21
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import  Header  from './Header';
import  ModalComponent  from './Modal';

// connect gives us mapStateToProps, which gives us access to our state
const mapStateToProps = (state) => ({
  greeting: state.greeting,
  view: state.view
})

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ModalComponent>Hey! I'm a modal!</ModalComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  greetingInput: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    borderColor: 'grey',
    borderWidth: 1
  }
});

export default connect(mapStateToProps)(App);
