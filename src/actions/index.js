import {
  ADD_COURSE_ELEMENT,
  DELETE_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE
} from "../constants";

import AdminService from "../service/";

const adminService = new AdminService();

let id = 0;

export const login = (username, password) => dispatch => {
  adminService
    .login(username, password)
    .then(response => {
      localStorage.setItem("userId", response.body.token);
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        token: response.body.token
      });
    })
    .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE }));
};

export const newCourse = (title, description) => {
  return { type: ADD_COURSE_ELEMENT, id: id++, title, description };
};

export const deleteCourse = uuid => {
  return { type: DELETE_COURSE_ELEMENT, uuid };
};

export const changeCourse = (uuid, title, description) => {
  return { type: CHANGE_COURSE_ELEMENT, uuid, title, description };
};
