import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header';

const mapStateToProps = (state) => ({
  token: state.main.token
})

class Settings extends Component {

  async deleteToken(item) {
    try {
      await AsyncStorage.removeItem(item);
    } catch (error) {
     console.log('AsyncStorage error: ' + error.message);
    }
  }

  logoutUser () {
    fetch("http://siren-server.herokuapp.com/logout", { method: "GET" });
    this.deleteToken('id_token')
    .then (() => {
      this.props.dispatch(actionCreators.userLogout());
      this.props.dispatch(headerActions.changeView('Authentication'));
    })
  }

  render() {
    return (
        <View style={styles.main}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.dispatch(headerActions.changeView('Manage Subscriptions'))}>
            <Text style={styles.buttonText}>Manage Subscriptions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.logoutUser()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    height: 35,
    width: '50%',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#288D91',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
  }
})

export default connect(mapStateToProps)(Settings);
