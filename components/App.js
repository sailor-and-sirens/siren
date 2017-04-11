import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
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
        <Button title="Show Modal" onPress={() => this.props.dispatch(actionCreators.toggleModal())} />

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
