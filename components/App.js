import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Modal } from 'react-native';
// App is connected to the store using connect - check out line 47 as well
// it also gives us the dispatch method on this.props - see line 21
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import  Header  from './Header';

// connect gives us mapStateToProps, which gives us access to our state
const mapStateToProps = (state) => ({
  greeting: state.greeting,
  view: state.view
})

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Header></Header>

        {/* I'm just an example - delete me */}
        <TextInput
          style={styles.greetingInput}
          onChangeText={(text) => this.props.dispatch(actionCreators.changeGreeting(text))}
        />

        <Text>{this.props.greeting}</Text>
        {/* end example */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // justifyContent: 'center',
  },
  greetingInput: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default connect(mapStateToProps)(App);
