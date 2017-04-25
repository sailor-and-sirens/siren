import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header';
import { actionCreators as podcastsActions } from '../actions/Podcasts';

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
      this.props.dispatch(actionCreators.updateInbox([]));
      this.props.dispatch(actionCreators.changeEmail(''));
      this.props.dispatch(actionCreators.changeUsername(''));
      this.props.dispatch(actionCreators.addToken(null));
      this.props.dispatch(podcastsActions.searchText(''));
      this.props.dispatch(headerActions.changeView('Authentication'));
    })
  }

  render() {
    return (
        <View style={styles.main}>
          <Button title="Logout" style={styles.button} onPress={() => this.logoutUser()}
          />
           <Button title="Manage Subscriptions" style={styles.button} onPress={() => this.props.dispatch(headerActions.changeView('Manage Subscriptions'))}
          />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    height: '34%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'center',
    width: '70%'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
  },
})

export default connect(mapStateToProps)(Settings);
