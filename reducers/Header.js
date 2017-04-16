import { types } from '../actions/Header';

export const initialState = {
  view: 'Inbox'
}

const header = (state = initialState, action) => {
  if (action.type === types.CHANGE_VIEW) {
    return {...state, view: action.payload};
  }
  return state;
}

export default header;
