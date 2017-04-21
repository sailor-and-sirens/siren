import { actionCreators as playlistActions } from '../actions/Playlist';
import { actionCreators as playerActions } from '../actions/Player';

export const toggleAddToPlaylistModal = (dispatch, episodeId, authToken) => {
  dispatch(playerActions.setFullSizeModalVisible(false));
  dispatch(playlistActions.toggleAddToPlaylistModal());
  dispatch(playlistActions.setSelectedEpisode(episodeId));
  fetch("http://localhost:3000/api/playlists/add-playlist-modal", {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Authorization': authToken
    }
  })
  .then(response => response.json())
  .then(playlists => {
    playlists.map(playlist => {
      if (playlist.episodeIds.length > 0 && playlist.episodeIds.includes(Number(episodeId))) {
        dispatch(playlistActions.togglePlaylistSelected(playlist.id));
      }
    })
    dispatch(playlistActions.storeAddModalPlaylists(playlists));
  });
}
