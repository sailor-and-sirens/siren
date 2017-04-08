import { types } from '../actions';

// add your key/values for initialState here
const initialState = {greeting: 'Hello there!'};

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

  return state;
}
