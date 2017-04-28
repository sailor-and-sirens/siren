import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, Platform, Button, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { headerActions } from '../actions/Header';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  view: state.header.view,
  token: state.main.token,
  username: state.main.username,
  password: state.main.password,
  email: state.main.email,
  authView: state.main.authView
})

class Authentication extends Component {

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      await this.props.dispatch(actionCreators.addToken(selectedValue));
      this.props.dispatch(headerActions.changeView('Inbox'))
     } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    if(this.props.password === '' || this.props.username === '' || this.props.email === '') {
      Alert.alert('Missing fields');
      return;
    }
    if(this.props.password.length < 6) {
      Alert.alert('Password must be at least 6 characters long.');
      return;
    }
    if(!this.props.email.includes('@')) {
      Alert.alert('Please enter a valid email.');
      return;
    }
    var value = {username: this.props.username, password: this.props.password, email: this.props.email};
      fetch("http://siren-server.herokuapp.com/api/users/createUser", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      .then((response) => {
        if (response.status !== 201) {
          response.json()
          .then((responseData) => Alert.alert(responseData.message))
          .catch(console.log);
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData) {
          return this._onValueChange('id_token', responseData.id_token)
        }
      })
      .catch(console.log);
  }

  _userLogin() {
    if(this.props.password === '' || this.props.username === '') {
      Alert.alert('Missing fields');
      return;
    }
    var value = {username: this.props.username, password: this.props.password};
      fetch("http://siren-server.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
       .then((response) => {
        if (response.status !== 201) {
          response.json()
          .then((responseData) => Alert.alert(responseData.message))
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData) {

          return this._onValueChange('id_token', responseData.id_token)
        }
      })
      .catch(console.log);
  }

  render() {

    let emailField = null;
    if (this.props.authView === 'signup') {
      emailField =  <TextInput value={this.props.email} autoCapitalize="none" placeholder="Email" onChangeText={(text) => {this.props.dispatch(actionCreators.changeEmail(text))}} style={{ width: 200, height: 44, padding: 8 }} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Siren</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.form}>
            <TextInput value={this.props.username} placeholder="Username" autoCapitalize="none" onChangeText={(text) => {this.props.dispatch(actionCreators.changeUsername(text))}} style={{ width: 200, height: 44, padding: 8 }} />
            <TextInput value={this.props.password} autoCapitalize="none" secureTextEntry={true} placeholder="Password" onChangeText={(text) => {this.props.dispatch(actionCreators.changePassword(text))}} style={{ width: 200, height: 44, padding: 8 }} />
            {emailField}
          </View>
        </View>
        <View style={styles.buttonRow}>
          {this.props.authView === 'login' ?
            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this._userLogin.bind(this)}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.switchTo} onPress={() => {this.props.dispatch(actionCreators.changeAuthView('signup'))}}>Switch to signup</Text>
            </View> :
            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this._userSignup.bind(this)}>
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.switchTo} onPress={() => {this.props.dispatch(actionCreators.changeAuthView('login'))}}>Switch to login</Text>
            </View>
          }
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  buttonContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    height: 40,
    flex: 0.35,
    justifyContent: 'center',
    backgroundColor: '#288D91'
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    paddingBottom: 2,
  },
  switchTo: {
    height: 36,
    marginTop: 10,
    color: 'grey',
    fontSize: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  titleRow: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputRow: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  }
});

export default connect(mapStateToProps)(Authentication);
