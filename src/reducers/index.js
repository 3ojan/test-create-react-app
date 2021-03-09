import { combineReducers } from "redux";
import quizApi from './quizApi';
import gameLogic from './gameLogic';

export default combineReducers({ quizApi, gameLogic });

