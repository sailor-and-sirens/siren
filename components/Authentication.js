import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';


var STORAGE_KEY = 'id_token';
const options = {};

class Authentication extends Component {
  constructor() {
  super();
  this.state = {
    username: '',
    password: '',
    email: '',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    view: 'login'
  }
}

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      AsyncStorage.getItem(STORAGE_KEY, (err, res) => {
        if (err) {
          console.warn('err: ', err);
        } else {
          console.warn('res:', res);
        }
      })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    var value = {username: this.state.username, password: this.state.password, email: this.state.email, avatarUrl: this.state.avatarUrl};
      fetch("http:localhost:3000/api/users/", {
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
          .then((responseData) => console.warn('Warning!: ', responseData.message))
          .catch(console.warn);
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData) {
          return this._onValueChange(STORAGE_KEY, responseData.id_token),
          console.warn(
            "Signup Success!"
          )
        }
      })
      .catch((error) => {
        console.warn('Error: ', error);
      })
      .done();
  }

  _userLogin() {
    var value = {username: this.state.username, password: this.state.password};
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.warn(
          "Login Success!",
        ),
        this._onValueChange(STORAGE_KEY, responseData.id_token)
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Siren</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.form}>
            <TextInput value={this.state.username} placeholder="Username" onChangeText={(text) => {this.setState({username: text});}} style={{ width: 200, height: 44, padding: 8 }} />
            <TextInput value={this.state.password} placeholder="Password" onChangeText={(text) => {this.setState({password: text});}} style={{ width: 200, height: 44, padding: 8 }} />
            {this.state.view === 'signup' ?
              <TextInput value={this.state.email} placeholder="Email" onChangeText={(text) => {this.setState({email: text});}} style={{ width: 200, height: 44, padding: 8 }} /> : <Text></Text>
            }
          </View>
        </View>
        <View style={styles.buttonRow}>
          {this.state.view === 'login' ?
            <View>
              <Button style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4' title='Login' />
              <Button style={styles.optButton} color='grey' onPress={() => this.setState({view: 'signup'})} title='Switch to signup' />
            </View> :
            <View>
              <Button style={styles.button} onPress={this._userSignup.bind(this)} underlayColor='#99d9f4' title='Signup' />
              <Button style={styles.optButton} color='grey' onPress={() => this.setState({view: 'login'})} title='Switch to login' />
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  optButton: {
    height: 36,
    color: 'grey',
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  }
});

export default Authentication;
