import { types } from '../actions';

const currentEpisode = {
  title: '#232: The Tim Ferriss Radio Hour: Controlling Stress, Nutrition Upgrades, and Improved Health',
  url: 'http://traffic.libsyn.com/timferriss/The_Tim_Ferriss_Show_-_Radio_Hour_episode_2.mp3?dest-id=189939'

};

// add your key/values for initialState here
const initialState = {greeting: 'Hello there!', currentEpisode: currentEpisode, isPlaying: false, currentPlayingTime: '0:00'};

// store.dispatch(...) is what triggers the reducer
export const reducer = (state = initialState, action) => {
  /*
    if (action.type === types.ACTION_TYPE) {
      return {...state, stateToChange: action.payload}
    }
  */
  if (action.type === types.CHANGE_GREETING) {
    return {...state, greeting: action.payload};
  }
  if (action.type === types.SET_PLAY_STATUS) {
    return {...state, isPlaying: action.payload}
  }
  if (action.type === types.UPDATE_CURRENT_PLAYING_TIME) {
    return {...state, currentPlayingTime: action.payload}
  }

  return state;
}
