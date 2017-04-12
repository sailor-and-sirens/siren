import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { MaterialIcons } from '@expo/vector-icons';

const mapStateToProps = (state) => ({
  view: state.main.view
})

class Header extends Component {

  render() {
    return (
      <View>
        <Text style={styles.header}>{this.props.view}</Text>
        <View style={styles.navigation}>
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Inbox'))} size={30} name='inbox'/>
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Playlist'))} size={30} name='playlist-play'/>
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Search'))} size={30} name='search'/>
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Filter'))} size={30} name='filter-list' />
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.changeView('Settings'))} size={30} name='settings' />
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
    backgroundColor: '#cccccc',
  },
  navigationLink: {
    padding: 8,
  }
});

export default connect(mapStateToProps)(Header);
