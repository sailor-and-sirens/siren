export const types = {
  CHANGE_VIEW: 'CHANGE_VIEW',
  REMOVE_EPISODE_FROM_INBOX: 'REMOVE_EPISODE_FROM_INBOX',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
  UPDATE_LIKED_FILTER: 'UPDATE_LIKED_FILTER',
  UPDATE_BOOKMARKED_FILTER: 'UPDATE_BOOKMARKED_FILTER',
  UPDATE_TIME_FILTER: 'UPDATE_TIME_FILTER',
  UPDATE_TAG_FILTER: 'UPDATE_TAG_FILTER'
}

export const actionCreators = {
  changeView: (view) => {
    return {type: types.CHANGE_VIEW, payload: view}
  },
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
  updateTagFilter: (value) => {
    return {type: types.UPDATE_TAG_FILTER, payload: value}
  }
}
