export const types = {
  CHANGE_VIEW: 'CHANGE_VIEW'
}

export const headerActions = {
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  }
}
