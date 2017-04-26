import { combineReducers } from 'redux';
import { types } from '../actions';
import { removeItemFromObjectById, updateEpisodeCurrentTime } from '../helpers'
import player from './Player';
import swipe from './Swipe';
import header from './Header';
import playlist from './Playlist';
import podcasts from './Podcasts';

// add your key/values for initialState here
const initialState = {
  token: null,
  modalVisible: false,
  view: 'Authentication',
  inboxFilters: {
    liked: "likedOff",
    bookmarked: "bookmarkedOff",
    time: "timeOff",
    tag: "All Tags",
    playlist: "All Playlists",
    name: "All Podcasts"
  },
  username: '',
  password: '',
  email: '',
  authView: 'login',
  inbox: [],
}

// store.dispatch(...) is what triggers the reducer
const main = (state = initialState, action) => {
  if (action.type === types.REMOVE_EPISODE_FROM_INBOX) {
    let newInbox = removeItemFromObjectById(state.inbox, action.payload);
    return {...state, inbox: newInbox}
  }
  if (action.type === types.TOGGLE_MODAL) {
    return {...state, modalVisible: !state.modalVisible};
  }
  if (action.type === types.TOGGLE_LIKE) {
    return {...state, inbox: action.payload}
  }
  if (action.type === types.TOGGLE_BOOKMARK) {
    return {...state, inbox: action.payload}
  }
  if (action.type === types.TOGGLE_OPEN_SWIPEABLE) {
    return {...state, currentlyOpenSwipeable: action.payload}
  }
  if (action.type === types.UPDATE_FILTERS) {
    return {...state, inboxFilters: {
    liked: "likedOff",
    bookmarked: "bookmarkedOff",
    time: "timeOff",
    tag: "Tags",
    playlist: "Playlists",
    name: "Name"
  }}
  }
  if (action.type === types.UPDATE_LIKED_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, liked: action.payload}}
  }
  if (action.type === types.UPDATE_BOOKMARKED_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, bookmarked: action.payload}}
  }
  if (action.type === types.UPDATE_TIME_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, time: action.payload}}
  }
  if (action.type === types.UPDATE_TAG_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, tag: action.payload}}
  }
  if (action.type === types.UPDATE_PLAYLIST_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, playlist: action.payload}}
  }
  if (action.type === types.UPDATE_NAME_FILTER) {
    return {...state, inboxFilters: {...state.inboxFilters, playlist: action.payload}}
  }
  if (action.type === types.ADD_TOKEN) {
    return {...state, token: action.payload}
  }
  if (action.type === types.CHANGE_USERNAME) {
    return {...state, username: action.payload}
  }
  if (action.type === types.CHANGE_PASSWORD) {
    return {...state, password: action.payload}
  }
  if (action.type === types.CHANGE_EMAIL) {
    return {...state, email: action.payload}
  }
  if (action.type === types.CHANGE_AUTHVIEW) {
    return {...state, authView: action.payload}
  }
  if (action.type === types.UPDATE_INBOX) {
    return {...state, inbox: action.payload}
  }
  if (action.type === types.UPDATE_EPISODE_CURRENT_TIME) {
    let newInbox = updateEpisodeCurrentTime(state.inbox, action.payload);
    return {...state, inbox: newInbox}
  }
  return state;
}

const rootReducer = combineReducers({
  main,
  player,
  swipe,
  header,
  playlist,
  podcasts
});

export default rootReducer;
