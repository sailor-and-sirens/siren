export const types = {
  CHANGE_VIEW: 'CHANGE_VIEW',
  TOGGLE_MODAL: 'TOGGLE_MODAL'
}

export const actionCreators = {
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  },
  toggleModal: () => {
    return {type: types.TOGGLE_MODAL}
  }
}
