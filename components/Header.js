import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

const mapStateToProps = (state) => ({
  view: state.view
})

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.view}</Text>
        <View style={styles.navigation}>
          <Text style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Inbox'))}>I</Text>
          <Text style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Playlist'))}>P</Text>
          <Text style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Search'))}>S</Text>
          <Text style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Time Filter'))}>T</Text>
          <Text style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Settings'))}>S</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    padding: 10,
    textAlign: 'center'
  },
  navigation: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'grey',
  },
  navigationLink: {
    padding: 20
  }
});

export default connect(mapStateToProps)(Header);
