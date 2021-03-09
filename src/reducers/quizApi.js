
import { questionsApiActions } from '../actions/apiQuestions'
import { gameLogicActions } from '../actions/gameLogic';

const initialState = {
  questions: [],
  loading: true,
};


function quizApi(state = initialState, action) {
  if (action.type === questionsApiActions.GET_DATA) {
    return {
      questions: null,
      loading: true,
    };
  }
  if (action.type === questionsApiActions.SET_DATA) {
    return {
      questions: action.payload.results,
      loading: false,
    };
  }
  if (action.type === gameLogicActions.ANSWER_CORRECT) {
    const _questions = [...state.questions]
    _questions[action.payload.currentLevel].userReallyKnowsTheAnswer = true;
    return {
      ...state,
      questions: _questions
    }

  }
  return state;
};

export default quizApi