import { types } from '../actions';

// add your key/values for initialState here
const initialState = {
  greeting: 'Hello there!',
  view: 'Inbox',
  modalVisible: false
};

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

  if (action.type === types.CHANGE_VIEW) {
    return {...state, view: action.payload};
  }

  if (action.type === types.TOGGLE_MODAL) {
    return {...state, modalVisible: !state.modalVisible};
  }

  return state;
}
