export const types = {
  TOGGLE_ADD_TO_PLAYLIST_MODAL: 'TOGGLE_ADD_TO_PLAYLIST_MODAL',
  TOGGLE_OPEN_SWIPEABLE: 'TOGGLE_OPEN_SWIPEABLE',
  UPDATE_LEFT_ACTIVATION: 'UPDATE_LEFT_ACTIVATION',
  UPDATE_LEFT_TOGGLE: 'UPDATE_LEFT_TOGGLE',
  UPDATE_RIGHT_ACTIVATION: 'UPDATE_RIGHT_ACTIVATION'
}

export const actionCreators = {
  toggleAddToPlaylistModal: () => {
    return {type: types.TOGGLE_ADD_TO_PLAYLIST_MODAL}
  },
  toggleOpenSwipeable: (value) => {
    return {type: types.TOGGLE_OPEN_SWIPEABLE, payload: value}
  },
  updateLeftActivation: (boolean) => {
    return {type: types.UPDATE_LEFT_ACTIVATION, payload: boolean}
  },
  updateLeftToggle: (boolean) => {
    return {type: types.UPDATE_LEFT_TOGGLE, payload: boolean}
  },
  updateRightActivation: (boolean) => {
    return {type: types.UPDATE_RIGHT_ACTIVATION, payload: boolean}
  }

}
