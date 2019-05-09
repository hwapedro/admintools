import { combineReducers } from "redux";
import Courses from "../reducers/Courses";
import Lessons from "../reducers/Lessons";
import Badges from "../reducers/Badges";
import News from "../reducers/News";
import reducers from "../reducers";

export default combineReducers({
  Courses,
  Lessons,
  News,
  Badges,
  reducers
});
