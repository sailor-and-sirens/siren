import { types } from '../actions/Podcasts';

const initialState = {
  currentPodcast: null,
  iTunesResult: [],
  searchText: '',
  searchSpinner: false,
  currentPodcast: null,
  podcastEpisodes: [{podcast: {description:{long: ''}}}],
  episodesLoading: false,
  subscriptions: []
}

const podcasts = (state = initialState, action) => {
  if (action.type === types.SEARCH_PODCASTS) {
    return {...state, iTunesResult: action.payload}
  }
  if (action.type === types.SEARCH_TEXT) {
    return {...state, searchText: action.payload}
  }
  if (action.type === types.TOGGLE_SEARCH_SPINNER) {
    return {...state, searchSpinner: action.payload}
  }
  if (action.type === types.UPDATE_CURRENT_PODCAST) {
    return {...state, currentPodcast: action.payload}
  }
  if (action.type === types.PODCAST_EPISODES) {
    return {...state, podcastEpisodes: action.payload}
  }
  if (action.type === types.TOGGLE_EPISODES_LOADING) {
    return {...state, episodesLoading: action.payload}
  }
  if (action.type === types.UPDATE_SUBSCRIPTIONS) {
    return {...state, subscriptions: action.payload}
  }
  return state;
}


export default podcasts;
