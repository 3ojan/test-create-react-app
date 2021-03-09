
import axios from 'axios';

export const questionsApiActions = {
  GET_DATA: 'GET_DATA',
  SET_DATA: 'SET_DATA',
}

export const setQuestionsData = payload => ({
  type: questionsApiActions.SET_DATA,
  payload
});

export function fetchData() {
  return function (dispatch) {
    axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then((response) => {
        return response.data
      })
      .then((data) => {
        dispatch(setQuestionsData(data))
      })
      .catch(error => {
        throw (error);
      });


  }
}