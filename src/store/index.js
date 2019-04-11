import { createStore, applyMiddleware, compose } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../store/reducers";
import reducer from '../store/reducers/index2'
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default createStore(reducer, enhancer);