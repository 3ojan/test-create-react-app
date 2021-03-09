import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from 'redux-thunk'
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export default createStore(rootReducer, applyMiddleware(thunk));
