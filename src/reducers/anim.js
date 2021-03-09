
import { animationsActions } from '../actions/anim'

const initialState = {
  questions: [],
  loading: true,
};


function anim(state = initialState, action) {
  if (action.type === animationsActions.ANIMATE_RED) {
    return state
  }
  if (action.type === animationsActions.ANIMATE_GREEN) {
    return state
  }
  return state;
};

export default anim