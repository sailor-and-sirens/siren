import { actionCreators as playlistActions } from '../actions/Playlist';
import { actionCreators as playerActions } from '../actions/Player';

export const toggleAddToPlaylistModal = (dispatch, episodeId, authToken) => {
  dispatch(playerActions.setFullSizeModalVisible(false));
  dispatch(playlistActions.toggleAddToPlaylistModal());
  dispatch(playlistActions.setSelectedEpisode(episodeId));
  fetch("http://siren-server.herokuapp.com/api/playlists/add-playlist-modal", {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Authorization': authToken
    }
  })
  .then(response => response.json())
  .then(playlists => {
    dispatch(playlistActions.storeAddModalPlaylists(playlists));
  });
}
