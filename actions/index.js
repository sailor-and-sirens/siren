export const types = {
  // ACTION_TYPE = 'ACTION_TYPE'
  CHANGE_GREETING: 'CHANGE_GREETING',
  SET_PLAY_STATUS: 'SET_PLAY_STATUS',
  UPDATE_CURRENT_PLAYING_TIME: 'UPDATE_CURRENT_PLAYING_TIME',
  DECREASE_SPEED: 'DECREASE_SPEED',
  INCREASE_SPEED: 'INCREASE_SPEED',
  SET_MODAL_VISIBLE: 'SET_MODAL_VISIBLE'
}

export const actionCreators = {
  /*
    actionType: (payload) => {
      return {type: types.ACTION_TYPE, payload: payload}
    }
  */
  changeGreeting: (greeting) => {
    return {type: types.CHANGE_GREETING, payload: greeting}
  },
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
  }
}
