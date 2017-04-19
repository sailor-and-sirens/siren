import { types } from '../actions/Playlist';
import { deselectSelectedPlaylists } from '../helpers';


const initialState = {
  addNewPlaylistInputValue: '',
  isAddPlaylistModalVisible: false,
  selectedPlaylistId: null,
  playlists: [
    {id: 1, name: 'Monday', totalEpisodes: 4, totalTime: '180+'},
    {id: 2, name: 'Tuesday', totalEpisodes: 1, totalTime: '75'},
    {id: 3, name: 'Wednesday', totalEpisodes: 2, totalTime: '90'},
    {id: 4, name: 'Thursday', totalEpisodes: 3, totalTime: '120'},
    {id: 5, name: 'Friday', totalEpisodes: 0, totalTime: '0'},
    {id: 6, name: 'Weekend', totalEpisodes: 1, totalTime: '56'},
    {id: 7, name: 'Productivity Mix', totalEpisodes: 5, totalTime: '180+'},
    {id: 8, name: 'A Really Long Title', totalEpisodes: 2, totalTime: '65'},
    {id: 9, name: 'Health & Wellness', totalEpisodes: 3, totalTime: '130'},
    {id: 10, name: 'Soul Food', totalEpisodes: 4, totalTime: '180+'},
    {id: 11, name: 'WebDev', totalEpisodes: 2, totalTime: '85'},
    {id: 12, name: 'Entrepreneurship', totalEpisodes: 3, totalTime: '120'}
  ]
}

const playlist = (state = initialState, action) => {
  if (action.type === types.ADD_NEW_PLAYLIST) {
    let newId = state.playlists.length + 1;
    let newPlaylist = { id: newId, name: action.payload, totalEpisodes: 0, totalTime: '0' };
    return {...state, addNewPlaylistInputValue: '', playlists: [newPlaylist, ...state.playlists], selectedPlaylistId: newId};
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

  return state;
}

export default playlist;
