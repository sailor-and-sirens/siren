export const types = {
  CHANGE_VIEW: 'GET_PLAYLISTS'
}

export const headerActions = {
  getPlaylists: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  }
}
