export const types = {
  REMOVE_EPISODE_FROM_INBOX: 'REMOVE_EPISODE_FROM_INBOX',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
  UPDATE_LIKED_FILTER: 'UPDATE_LIKED_FILTER',
  UPDATE_BOOKMARKED_FILTER: 'UPDATE_BOOKMARKED_FILTER',
  UPDATE_TIME_FILTER: 'UPDATE_TIME_FILTER',
  UPDATE_TAG_FILTER: 'UPDATE_TAG_FILTER',
  UPDATE_PLAYLIST_FILTER: 'UPDATE_PLAYLIST_FILTER',
  ADD_TOKEN: 'ADD_TOKEN',
  CHANGE_USERNAME: 'CHANGE_USERNAME',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_AUTHVIEW: 'CHANGE_AUTHVIEW',
  UPDATE_INBOX: 'UPDATE_INBOX',
  UPDATE_NAME_FILTER: 'UPDATE_NAME_FILTER',
  UPDATE_EPISODE_CURRENT_TIME: 'UPDATE_EPISODE_CURRENT_TIME',
  UPDATE_FILTERS: 'UPDATE_FILTERS'
}

export const actionCreators = {
  removeEpisodeFromInbox: (episodeId) => {
    return {type: types.REMOVE_EPISODE_FROM_INBOX, payload: episodeId}
  },
  toggleModal: () => {
    return {type: types.TOGGLE_MODAL}
  },
  toggleLike: (inbox) => {
    return {type: types.TOGGLE_LIKE, payload: inbox}
  },
  toggleBookmark: (inbox) => {
    return {type: types.TOGGLE_BOOKMARK, payload: inbox}
  },
  updateLikedFilter: (value) => {
    return {type: types.UPDATE_LIKED_FILTER, payload: value}
  },
  updateBookmarkedFilter: (value) => {
    return {type: types.UPDATE_BOOKMARKED_FILTER, payload: value}
  },
  updateTimeFilter: (value) => {
    return {type: types.UPDATE_TIME_FILTER, payload: value}
  },
  updateNameFilter: (value) => {
    return {type: types.UPDATE_NAME_FILTER, payload: value}
  },
  updateTagFilter: (value) => {
    return {type: types.UPDATE_TAG_FILTER, payload: value}
  },
  updatePlaylistFilter: (playlistName) => {
    return {type: types.UPDATE_PLAYLIST_FILTER, payload: playlistName}
  },
  addToken: (value) => {
    return {type: types.ADD_TOKEN, payload: value}
  },
  changeEmail: (value) => {
    return {type: types.CHANGE_EMAIL, payload: value}
  },
  changeUsername: (value) => {
    return {type: types.CHANGE_USERNAME, payload: value}
  },
  changePassword: (value) => {
    return {type: types.CHANGE_PASSWORD, payload: value}
  },
  changeAuthView: (value) => {
    return {type: types.CHANGE_AUTHVIEW, payload: value}
  },
  updateInbox: (value) => {
    return {type: types.UPDATE_INBOX, payload: value}
  },
  updateEpisodeCurrentTime: (episodeData) => {
    return {type: types.UPDATE_EPISODE_CURRENT_TIME, payload: episodeData}
  },
  updateFilters: () => {
    return {type: types.UPDATE_FILTERS}
  }
}
