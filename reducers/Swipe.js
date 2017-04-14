import { types } from '../actions/Swipe';

const initialState = {
  currentlyOpenSwipeable: null,
  isLeftActionActivated: false,
  isLeftToggled: false,
  isRightActionActivated: false,
  isRightToggled: false
}

const swipe = (state = initialState, action) => {
  if (action.type === types.UPDATE_LEFT_ACTIVATION) {
    return {...state, isLeftActionActivated: action.payload};
  }
  if (action.type === types.UPDATE_LEFT_TOGGLE) {
    return {...state, isLeftToggled: action.payload};
  }
  if (action.type === types.UPDATE_RIGHT_ACTIVATION) {
    return {...state, isRightActionActivated: action.payload};
  }
  if (action.type === types.UPDATE_RIGHT_TOGGLE) {
    return {...state, isRightToggled: action.payload};
  }

  return state;
}

export default swipe;
