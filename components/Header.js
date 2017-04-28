import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import { headerActions } from '../actions/Header';
import { MaterialIcons } from '@expo/vector-icons';
import ModalComponent from './Modal';
import Filter from './Filter';

const mapStateToProps = (state) => ({
  view: state.header.view
})

class Header extends Component {

  render() {
    let filter = null;
    if (this.props.view === 'Inbox' ||
        this.props.view === 'Playlists') {
      filter = (<View>
        <ModalComponent>
          <Filter/>
        </ModalComponent>
        <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(actionCreators.toggleModal())} size={30} name='filter-list' />
      </View>)
    }
    return (
      <View>
        <Text style={styles.header}>{this.props.view}</Text>
        <View style={styles.navigation}>
          <MaterialIcons style={styles.navigationLink} onPress={() => {
            this.props.dispatch(actionCreators.updatePlaylistFilter('All'));
            this.props.dispatch(actionCreators.updateFilters());
            this.props.dispatch(headerActions.changeView('Inbox'));
          }} size={30} name='inbox'/>
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(headerActions.changeView('Playlists'))} size={30} name='playlist-play'/>
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(headerActions.changeView('Search'))} size={30} name='search'/>
          {filter}
          <MaterialIcons style={styles.navigationLink} onPress={() => this.props.dispatch(headerActions.changeView('Settings'))} size={30} name='settings' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    padding: 10,
    paddingTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#50BFB9'
  },
  navigation: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#BCDDD4',
  },
  navigationLink: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#000',
    textShadowColor: '#999',
    textShadowOffset: {width: 1.25, height: 1.25},
    textShadowRadius: 2
  }
});

export default connect(mapStateToProps)(Header);
