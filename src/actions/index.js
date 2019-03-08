import {
  ADD_COURSE_ELEMENT,
  DELETE_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT
} from "../constants";

let id = 0;

export const newCourse = (title, description) => {
  return { type: ADD_COURSE_ELEMENT, id: id++, title, description };
};

export const deleteCourse = (id) => {
  return { type: DELETE_COURSE_ELEMENT, id };
};

export const changeCourse = (id, title, description) => {
  return { type: CHANGE_COURSE_ELEMENT, id, title, description };
};
