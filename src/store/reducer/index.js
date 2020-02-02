import { combineReducers } from "redux";

import AuthModule from "../modules/AuthModule";
import CoursesModule from "../modules/CoursesModule";
import ViewModule from "../modules/ViewModule";
import LessonModule from "../modules/LessonModule";
import BadgesModule from "../modules/BadgesModule";
import NewsModule from "../modules/NewsModule";
import PageModule from "../modules/PageModule";
import TaskModule from "../modules/TaskModule";

const auth = LessonModule.reduce;
const lesson = LessonModule.reduce;
const News = NewsModule.reduce;
const Courses = CoursesModule.reduce;
const Badges = BadgesModule.reduce;
const view = ViewModule.reduce;
const page = PageModule.reduce;
const task = TaskModule.reduce;

export default combineReducers({
  auth,
  Courses,
  lesson,
  page,
  task,
  News,
  Badges,
  view
});
