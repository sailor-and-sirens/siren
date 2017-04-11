import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

// connect gives us mapStateToProps, which gives us access to our state
const mapStateToProps = (state) => ({
  modalVisible: state.modalVisible
})

class ModalComponent extends Component {

  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.outerView}>
          <View style={styles.innerView}>
            <Text>{this.props.children}</Text>
              <Text onPress={() => this.props.dispatch(actionCreators.toggleModal())}>Hide Modal</Text>
          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
           this.setModalVisible(true)
         }}>
           <Text onPress={() => this.props.dispatch(actionCreators.toggleModal())}>Show Modal</Text>
         </TouchableHighlight>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
    flex: 1
  },
  innerView : {
    backgroundColor: '#fff',
    padding: 20
  }
});

export default connect(mapStateToProps)(ModalComponent);
