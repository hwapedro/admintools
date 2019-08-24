import { combineReducers } from "redux";

import Auth from "./Auth";


import CoursesModule from "../modules/CoursesModule";
import ViewModule from "../modules/ViewModule";
import LessonsModule from "../modules/LessonsModule";
import BadgesModule from "../modules/BadgesModule";
import NewsModule from "../modules/NewsModule";

const Lessons = LessonsModule.reduce;
const News = NewsModule.reduce;
const Courses = CoursesModule.reduce;
const Badges = BadgesModule.reduce;
const view = ViewModule.reduce;

export default combineReducers({
  Auth,
  Courses,
  Lessons,
  News,
  Badges,
  view
});
