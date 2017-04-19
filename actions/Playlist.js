export const types = {
  ADD_NEW_PLAYLIST: 'ADD_NEW_PLAYLIST',
  TOGGLE_ADD_TO_PLAYLIST_MODAL: 'TOGGLE_ADD_TO_PLAYLIST_MODAL',
  TOGGLE_PLAYLIST_SELECTED: 'TOGGLE_PLAYLIST_SELECTED',
  UPDATE_NEW_PLAYLIST_INPUT: 'UPDATE_NEW_PLAYLIST_INPUT'
}

export const actionCreators = {
  addNewPlaylist: (newPlaylist) => {
    return {type: types.ADD_NEW_PLAYLIST, payload: newPlaylist}
  },
  toggleAddToPlaylistModal: () => {
    return {type: types.TOGGLE_ADD_TO_PLAYLIST_MODAL}
  },
  togglePlaylistSelected: (playlistId) => {
    return {type: types.TOGGLE_PLAYLIST_SELECTED, payload: playlistId}
  },
  updateAddNewPlaylistInput: (input) => {
    return {type: types.UPDATE_NEW_PLAYLIST_INPUT, payload: input}
  }
}
