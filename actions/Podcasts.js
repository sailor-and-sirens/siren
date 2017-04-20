export const types = {
  SEARCH_PODCASTS: 'SEARCH_PODCASTS',
  SEARCH_TEXT: 'SEARCH_TEXT',
  TOGGLE_SEARCH_SPINNER: 'TOGGLE_SEARCH_SPINNER',
  UPDATE_CURRENT_PODCAST: 'UPDATE_CURRENT_PODCAST',
  PODCAST_EPISODES: 'PODCAST_EPISODES',
  TOGGLE_EPISODES_LOADING: 'TOGGLE_EPISODES_LOADING'
}

export const actionCreators = {
  searchPodcasts: (value) => {
    return {type: types.SEARCH_PODCASTS, payload: value}
  },
    searchText: (value) => {
    return {type: types.SEARCH_TEXT, payload: value}
  },
    toggleSearchSpinner: (value) => {
    return {type: types.TOGGLE_SEARCH_SPINNER, payload: value}
  },
    updateCurrentPodcast: (value) => {
    return {type: types.UPDATE_CURRENT_PODCAST, payload: value}
  },
    podcastEpisodes: (value) => {
    return {type: types.PODCAST_EPISODES, payload: value}
  },
    toggleEpisodesLoading: (value) => {
    return {type: types.TOGGLE_EPISODES_LOADING, payload: value}
  }
}
