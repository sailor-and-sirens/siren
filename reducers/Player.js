import { types } from '../actions/Player';

const initialState = {
  currentEpisode: null,
  currentEpisodeTitle: null,
  currentPlayingTime: '0:00',
  currentSoundInstance: null,
  currentSpeed: 1.0,
  isModalVisible: false,
  isFullSizeModalVisible: false,
  isPlaying: false,
}

const player = (state = initialState, action) => {
  if (action.type === types.CREATE_NEW_SOUND_INSTANCE) {
    return {...state, currentSoundInstance: action.payload};
  }
  if (action.type === types.DECREASE_SPEED) {
    return {...state, currentSpeed: (state.currentSpeed - action.payload)}
  }
  if (action.type === types.INCREASE_SPEED) {
    return {...state, currentSpeed: (state.currentSpeed + action.payload)}
  }
  if (action.type === types.SET_FULL_SIZE_MODAL_VISIBLE) {
    return {...state, isFullSizeModalVisible: action.payload}
  }
  if (action.type === types.SET_MODAL_VISIBLE) {
    return {...state, isModalVisible: action.payload}
  }
  if (action.type === types.SET_PLAY_STATUS) {
    return {...state, isPlaying: action.payload}
  }
  if (action.type === types.STORE_EPISODE_DATA) {
    return {...state, currentEpisode: action.payload}
  }
  if (action.type === types.UPDATE_CURRENT_PLAYING_TIME) {
    return {...state, currentPlayingTime: action.payload}
  }
  if (action.type === types.UPDATE_CURRENTLY_PLAYING_EPISODE) {
    return {...state, currentEpisodeTitle: action.payload}
  }

  return state;
}

export default player;
