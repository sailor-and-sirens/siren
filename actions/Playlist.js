export const types = {
  TOGGLE_PLAYLIST_SELECTED: 'TOGGLE_PLAYLIST_SELECTED'
}

export const actionCreators = {
  togglePlaylistSelected: (playlistId) => {
    return {type: types.TOGGLE_PLAYLIST_SELECTED, payload: playlistId}
  }
}
