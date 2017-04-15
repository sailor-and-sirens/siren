import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, Platform, Button, Alert} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
const options = {};

const mapStateToProps = (state) => ({
  view: state.main.view
})

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
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    if(this.state.password === '' || this.state.username === '' || this.state.email === '') {
      Alert.alert('Missing fields');
      return;
    }
    if(this.state.password.length < 6) {
      Alert.alert('Password must be at least 6 characters long.');
      return;
    }
    if(!this.state.email.includes('@')) {
      Alert.alert('Please enter a valid email.');
      return;
    }
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
          .then((responseData) => Alert.alert(responseData.message))
          .catch(console.warn);
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData) {
          this.props.dispatch(actionCreators.changeView('Inbox'))
          return this._onValueChange('id_token', responseData.id_token)
        }
      })
      .catch((error) => {
        console.warn('Error: ', error);
      })
      .done();
  }

  _userLogin() {
    if(this.state.password === '' || this.state.username === '') {
      Alert.alert('Missing fields');
      return;
    }
    var value = {username: this.state.username, password: this.state.password};
      fetch("http://localhost:3000/api/users/login", {
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
          this.props.dispatch(actionCreators.changeView('Inbox'))
          return this._onValueChange('id_token', responseData.id_token)
        }
      })
      .catch((error) => {
        console.warn('Error: ', error);
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Siren</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.form}>
            <TextInput value={this.state.username} placeholder="Username" autoCapitalize="none" onChangeText={(text) => {this.setState({username: text});}} style={{ width: 200, height: 44, padding: 8 }} />
            <TextInput value={this.state.password} autoCapitalize="none" secureTextEntry={true} placeholder="Password" onChangeText={(text) => {this.setState({password: text});}} style={{ width: 200, height: 44, padding: 8 }} />
            {this.state.view === 'signup' ?
              <TextInput value={this.state.email} autoCapitalize="none" placeholder="Email" onChangeText={(text) => {this.setState({email: text});}} style={{ width: 200, height: 44, padding: 8 }} /> : <Text></Text>
            }
          </View>
        </View>
        <View style={styles.buttonRow}>
          {this.state.view === 'login' ?
            <View>
              <Button style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4' title='Login' />
              <Text style={styles.switchTo} onPress={() => this.setState({view: 'signup'})}>Switch to signup</Text>
            </View> :
            <View>
              <Button style={styles.button} onPress={this._userSignup.bind(this)} underlayColor='#99d9f4' title='Signup' />
              <Text style={styles.switchTo} onPress={() => this.setState({view: 'login'})}>Switch to login</Text>
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
