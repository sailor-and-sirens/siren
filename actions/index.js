export const types = {
  // ACTION_TYPE = 'ACTION_TYPE'
  CHANGE_GREETING: 'CHANGE_GREETING',
  CHANGE_VIEW: 'CHANGE_VIEW',
  TOGGLE_MODAL: 'TOGGLE_MODAL'
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
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  },
  toggleModal: () => {
    return {type: types.TOGGLE_MODAL}
  }
}
