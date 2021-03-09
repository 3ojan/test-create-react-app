
import { gameLogicActions } from '../actions/gameLogic'

const initialState = {
  currentLevel: 0, //index
  points: 0,
  gameActive: false,
  totalTime: 4000,
  lastLevel: 9, //index
};


function gameLogic(state = initialState, action) {
  if (action.type === gameLogicActions.START_GAME) {
    return {
      ...state,
      gameActive: true,
      totalTime: initialState.totalTime,
    };
  }
  if (action.type === gameLogicActions.STOP_GAME) {
    return {
      ...state,
      gameActive: false,
      totalTime: initialState.totalTime,
    };
  }
  if (action.type === gameLogicActions.NEXT_LEVEL) {
    return {
      ...state,
      gameActive: false,
      currentLevel: action.payload.currentLevel + 1,
    };
  }
  if (action.type === gameLogicActions.ANSWER_CORRECT) {
    return {
      ...state,
      points: action.payload.points + 1,
      currentLevel: action.payload.currentLevel + 1,
    };
  }
  if (action.type === gameLogicActions.RESTART) {
    return { ...initialState }
  }
  return state;
};

export default gameLogic