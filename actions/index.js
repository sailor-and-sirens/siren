export const types = {
  // ACTION_TYPE = 'ACTION_TYPE'
  CHANGE_GREETING: 'CHANGE_GREETING',
  SET_PLAY_PAUSE: 'SET_PLAY_PAUSE',
  UPDATE_CURRENT_PLAYING_TIME: 'UPDATE_CURRENT_PLAYING_TIME'
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
  setPlayPause: (boolean) => {
    return {type: types.SET_PLAY_PAUSE, payload: boolean}
  },
  updateCurrentPlayingTime: (time) => {
    return {type: types.UPDATE_CURRENT_PLAYING_TIME, payload: time}
  }
}
