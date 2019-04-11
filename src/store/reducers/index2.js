import { combineReducers } from "redux";
import reducerCourses from "../reducers/reducerCourses";
import reducers from "../reducers";

export default combineReducers({ reducerCourses, reducers });
