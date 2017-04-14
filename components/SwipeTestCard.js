import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import Swipeable from 'react-native-swipeable';

const mapStateToProps = (state) => ({
  inbox: state.main.inbox,
});

class SwipeTestCard extends Component {

  state = {
    leftActionActivated: false,
    rightActionActivated: false,
    toggle: false,
    rightToggle: false
  };

  render() {
    const {leftActionActivated, rightActionActivated, toggle, rightToggle} = this.state;

    return (
      <Swipeable
        leftActionActivationDistance={200}
        leftContent={(
          <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'green' : 'green'}]}>
            {leftActionActivated ?
              <Text>Toggle Playlist Selection Modal</Text> :
              <Text>Add to Playlist</Text>}
          </View>
        )}
        rightActionActivationDistance={200}
        rightContent={(
          <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? 'green' : 'red'}]}>
            {rightActionActivated ?
              <Text>Removed!</Text> :
              <Text>Remove Episode</Text>}
          </View>
        )}
        onLeftActionActivate={() => this.setState({leftActionActivated: true})}
        onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
        onLeftActionComplete={() => this.setState({toggle: !toggle})}
        onRightActionActivate={() => this.setState({rightActionActivated: true})}
        onRightActionDeactivate={() => this.setState({rightActionActivated: false})}
        onRightActionComplete={() => this.setState({rightToggle: !rightToggle})}
      >
        <View style={[styles.listItem, {backgroundColor: rightToggle ? 'black' : 'darkseagreen'}]}>
          <Text>Episode Card</Text>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },

});

export default connect(mapStateToProps)(SwipeTestCard);
