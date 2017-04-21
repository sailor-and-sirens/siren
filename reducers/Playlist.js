import { types } from '../actions/Playlist';

const initialState = {
  addNewPlaylistInputValue: '',
  isAddPlaylistModalVisible: false,
  selectedEpisodeId: null,
  selectedPlaylistId: null,
  playlists: []
};

const playlist = (state = initialState, action) => {
  if (action.type === types.GET_PLAYLISTS) {
    return {...state, playlists: action.payload};
  }
  if (action.type === types.ADD_NEW_PLAYLIST) {
    let newId = action.payload.id;
    let newPlaylist = { id: newId, name: action.payload.name, totalEpisodes: 0, totalTime: '0' };
    return {...state, addNewPlaylistInputValue: '', playlists: [newPlaylist, ...state.playlists], selectedPlaylistId: newId};
  }
  if (action.type === types.SET_SELECTED_EPISODE) {
    return {...state, selectedEpisodeId: action.payload}
  }
  if (action.type === types.STORE_ADD_MODAL_PLAYLISTS) {
    return {...state, playlists: action.payload}
  }
  if (action.type === types.TOGGLE_ADD_TO_PLAYLIST_MODAL) {
    return {...state, isAddPlaylistModalVisible: !state.isAddPlaylistModalVisible, selectedPlaylistId: null}
  }
  if (action.type === types.TOGGLE_PLAYLIST_SELECTED) {
    let playlistId = action.payload;
    let newSelectedPlaylistId = state.selectedPlaylistId === action.payload ? null : action.payload
    return {...state, selectedPlaylistId: newSelectedPlaylistId};
  }
  if (action.type === types.UPDATE_NEW_PLAYLIST_INPUT) {
    return {...state, addNewPlaylistInputValue: action.payload}
  }
  if (action.type === types.REMOVE_PLAYLIST) {
    console.log('playlists before',state.playlists);
    let updatedPlaylists = state.playlists;
    updatedPlaylists = updatedPlaylists.filter(playlist => {
      return playlist.id !== action.payload;
    })
    console.log('playlists after', updatedPlaylists);
    return {...state, playlists: updatedPlaylists}
  }

  return state;
};

export default playlist;
