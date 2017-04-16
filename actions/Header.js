export const types = {
  CHANGE_VIEW: 'CHANGE_VIEW'
}

export const actionCreators = {
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  }
}
