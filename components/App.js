import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { actionCreators } from '../actions';

class App extends Component {

  state = {}

  componentWillMount() {
      const {store} = this.props;

      const {greeting} = store.getState();
      this.setState({greeting});

      this.unsubscribe = store.subscribe(() => {
        const {greeting} = store.getState();
        this.setState({greeting});
      })
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

  render() {
    const {store} = this.props;
    return (
      <View style={styles.container}>
        {/* I'm just an example - delete me */}
        <TextInput
          style={styles.greetingInput}
          onChangeText={(text) => store.dispatch(actionCreators.changeGreeting(text))}
        />
        <Text>{this.state.greeting}</Text>
        {/* end example */}
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

export default App;
