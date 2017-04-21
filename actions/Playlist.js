export const types = {
  ADD_NEW_PLAYLIST: 'ADD_NEW_PLAYLIST',
  SET_SELECTED_EPISODE: 'SET_SELECTED_EPISODE',
  STORE_ADD_MODAL_PLAYLISTS: 'STORE_ADD_MODAL_PLAYLISTS',
  TOGGLE_ADD_TO_PLAYLIST_MODAL: 'TOGGLE_ADD_TO_PLAYLIST_MODAL',
  TOGGLE_PLAYLIST_SELECTED: 'TOGGLE_PLAYLIST_SELECTED',
  UPDATE_NEW_PLAYLIST_INPUT: 'UPDATE_NEW_PLAYLIST_INPUT',
  GET_PLAYLISTS: 'GET_PLAYLISTS',
  REMOVE_PLAYLIST: 'REMOVE_PLAYLIST'
}

export const actionCreators = {
  addNewPlaylist: (playlistData) => {
    return {type: types.ADD_NEW_PLAYLIST, payload: playlistData}
  },
  getPlaylists: (playlistData) => {
    return {type: types.GET_PLAYLISTS, payload: playlistData}
  },
  setSelectedEpisode: (episodeId) => {
    return {type: types.SET_SELECTED_EPISODE, payload: episodeId}
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
  },
  removePlaylist: (playlistId) => {
    return {type: types.REMOVE_PLAYLIST, payload: playlistId}
  }
}
