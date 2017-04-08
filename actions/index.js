export const types = {
  // ACTION_TYPE = 'ACTION_TYPE'
  CHANGE_GREETING: 'CHANGE_GREETING'
}

export const actionCreators = {
  /*
    actionType: (payload) => {
      return {type: types.ACTION_TYPE, payload: payload}
    }
  */
  changeGreeting: (greeting) => {
    return {type: types.CHANGE_GREETING, payload: greeting}
  }
}
