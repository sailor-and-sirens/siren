import React, { Component } from 'react';
import { StyleSheet, View, Modal} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  modalVisible: state.main.modalVisible
})

class ModalComponent extends Component {

  render() {
    return (
      <View>
        <Modal
          onRequestClose = {() => console.log('Modal closed')}
          animationType={"fade"}
          transparent={true}
          visible={this.props.modalVisible}
          >
         <View style={styles.outerView}>
          <View style={styles.innerView}>
            <View>{this.props.children}</View>
          </View>
         </View>
        </Modal>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
  },
  innerView : {
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default connect(mapStateToProps)(ModalComponent);

