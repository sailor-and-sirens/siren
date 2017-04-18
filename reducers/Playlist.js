import { types } from '../actions/Playlist';

const initialState = {
  isPlaylistSelected: false,
  playlists: [
    {id: 1, name: 'Monday', totalEpisodes: 4, totalTime: '180+', isSelected: false},
    {id: 2, name: 'Tuesday', totalEpisodes: 1, totalTime: '75', isSelected: false},
    {id: 3, name: 'Wednesday', totalEpisodes: 2, totalTime: '90', isSelected: false},
    {id: 4, name: 'Thursday', totalEpisodes: 3, totalTime: '120', isSelected: false},
    {id: 5, name: 'Friday', totalEpisodes: 0, totalTime: '0', isSelected: false},
    {id: 6, name: 'Weekend', totalEpisodes: 1, totalTime: '56', isSelected: false},
    {id: 7, name: 'Productivity Mix', totalEpisodes: 5, totalTime: '180+', isSelected: false},
    {id: 8, name: 'A Really Long Title', totalEpisodes: 2, totalTime: '65', isSelected: false},
    {id: 9, name: 'Health & Wellness', totalEpisodes: 3, totalTime: '130', isSelected: false},
    {id: 10, name: 'Soul Food', totalEpisodes: 4, totalTime: '180+', isSelected: false},
    {id: 11, name: 'WebDev', totalEpisodes: 2, totalTime: '85', isSelected: false},
    {id: 12, name: 'Entrepreneurship', totalEpisodes: 3, totalTime: '120', isSelected: false}
  ]
}

const playlist = (state = initialState, action) => {
  if (action.type === types.TOGGLE_PLAYLIST_SELECTED) {
    let index = action.payload;
    let playlistsCopy = state.playlists.slice(0);
    playlistsCopy[index].isSelected = !playlistsCopy[index].isSelected;
    return {...state, playlists: playlistsCopy, isPlaylistSelected: !state.isPlaylistSelected};
  }

  return state;
}

export default playlist;
