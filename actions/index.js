export const types = {
  SET_PLAY_STATUS: 'SET_PLAY_STATUS',
  UPDATE_CURRENT_PLAYING_TIME: 'UPDATE_CURRENT_PLAYING_TIME',
  DECREASE_SPEED: 'DECREASE_SPEED',
  INCREASE_SPEED: 'INCREASE_SPEED',
  SET_MODAL_VISIBLE: 'SET_MODAL_VISIBLE',
  CHANGE_VIEW: 'CHANGE_VIEW',
  TOGGLE_MODAL: 'TOGGLE_MODAL'
}

export const actionCreators = {
  setPlayStatus: (boolean) => {
    return {type: types.SET_PLAY_STATUS, payload: boolean}
  },
  updateCurrentPlayingTime: (time) => {
    return {type: types.UPDATE_CURRENT_PLAYING_TIME, payload: time}
  },
  decreaseSpeed: (speed) => {
    return {type: types.DECREASE_SPEED, payload: speed}
  },
  increaseSpeed: (speed) => {
    return {type: types.INCREASE_SPEED, payload: speed}
  },
  setModalVisible: (boolean) => {
    return {type: types.SET_MODAL_VISIBLE, payload: boolean}
  },
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  },
  toggleModal: () => {
    return {type: types.TOGGLE_MODAL}
  }
}
