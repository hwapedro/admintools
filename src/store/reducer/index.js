import { combineReducers } from "redux";

import Auth from "./Auth";
// import Badges from "./Badges";
// import Courses from "./Courses";
// import Lessons from "./Lessons";
import News from "./News";
import reducer from "./reducer";
import CoursesModule from "../modules/CoursesModule";
import ViewModule from "../modules/ViewModule";
import LessonsModule from "../modules/LessonsModule";
import BadgesModule from "../modules/BadgesModule";

const Lessons = LessonsModule.reduce;
const Courses = CoursesModule.reduce;
const Badges = BadgesModule.reduce;
const view = ViewModule.reduce;

export default combineReducers({
  Auth,
  Courses,
  Lessons,
  News,
  Badges,
  view,
  reducer
});
