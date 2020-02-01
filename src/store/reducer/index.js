import { combineReducers } from "redux";

import Auth from "./Auth";

import CoursesModule from "../modules/CoursesModule";
import ViewModule from "../modules/ViewModule";
import LessonModule from "../modules/LessonModule";
import BadgesModule from "../modules/BadgesModule";
import NewsModule from "../modules/NewsModule";
import PageModule from "../modules/PageModule";

const lesson = LessonModule.reduce;
const News = NewsModule.reduce;
const Courses = CoursesModule.reduce;
const Badges = BadgesModule.reduce;
const view = ViewModule.reduce;
const page = PageModule.reduce;

export default combineReducers({
  Auth,
  Courses,
  lesson,
  page,
  News,
  Badges,
  view
});
