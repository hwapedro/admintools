import { combineReducers } from "redux";

import Auth from "./Auth";
import Badges from "./Badges";
import Courses from "./Courses";
import Lessons from "./Lessons";
import News from "./News";
import reducer from "./reducer";

export default combineReducers({
  Auth,
  Courses,
  Lessons,
  News,
  Badges,
  reducer
});
