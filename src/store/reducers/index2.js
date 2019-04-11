import { combineReducers } from "redux";
import reducerCourses from "../reducers/reducerCourses";
import reducerLessons from "../reducers/reducerLessons";
import reducerBadges from "../reducers/reducerBadges";
import reducers from "../reducers";

export default combineReducers({
  reducerCourses,
  reducerLessons,
  reducerBadges,
  reducers
});
