export const types = {
  CHANGE_VIEW: 'CHANGE_VIEW',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  UPDATE_INBOX_FILTERS: 'UPDATE_INBOX_FILTERS',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
}

export const actionCreators = {
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  },
  toggleModal: () => {
    return {type: types.TOGGLE_MODAL}
  },
  updateInboxFilters: (filters) => {
    return {type: types.UPDATE_INBOX_FILTERS, payload: filters}
  },
  toggleLike: (inbox) => {
    return {type: types.TOGGLE_LIKE, payload: inbox}
  },
  toggleBookmark: (inbox) => {
    return {type: types.TOGGLE_BOOKMARK, payload: inbox}
  }
}
