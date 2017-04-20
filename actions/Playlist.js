export const types = {
  ADD_NEW_PLAYLIST: 'ADD_NEW_PLAYLIST',
  STORE_ADD_MODAL_PLAYLISTS: 'STORE_ADD_MODAL_PLAYLISTS',
  TOGGLE_ADD_TO_PLAYLIST_MODAL: 'TOGGLE_ADD_TO_PLAYLIST_MODAL',
  TOGGLE_PLAYLIST_SELECTED: 'TOGGLE_PLAYLIST_SELECTED',
  UPDATE_NEW_PLAYLIST_INPUT: 'UPDATE_NEW_PLAYLIST_INPUT'
}

export const actionCreators = {
  addNewPlaylist: (playlistData) => {
    return {type: types.ADD_NEW_PLAYLIST, payload: playlistData}
  },
  storeAddModalPlaylists: (playlists) => {
    return {type: types.STORE_ADD_MODAL_PLAYLISTS, payload: playlists}
  },
  toggleAddToPlaylistModal: (isSaved) => {
    return {type: types.TOGGLE_ADD_TO_PLAYLIST_MODAL, payload: isSaved}
  },
  togglePlaylistSelected: (playlistId) => {
    return {type: types.TOGGLE_PLAYLIST_SELECTED, payload: playlistId}
  },
  updateAddNewPlaylistInput: (input) => {
    return {type: types.UPDATE_NEW_PLAYLIST_INPUT, payload: input}
  }
}
