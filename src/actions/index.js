import {
  ADD_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_COURSE_REQUEST,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  CHANGE_COURSE_REQUEST,
  CHANGE_COURSE_SUCCESS,
  CHANGE_COURSE_FAILURE
} from "../constants";

import AdminService from "../service/";

const adminService = new AdminService();

let id = 0;

export const login = (username, password) => dispatch => {
  adminService
    .login(username, password)
    .then(response => {
      localStorage.setItem("userId", response.body.token);
      window.history.pushState({}, "", "/courses");
      window.history.go();
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        token: response.body.token
      });
    })
    .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE }));
};

export const getAllCourses = token => dispatch => {
  dispatch({
    type: FETCH_COURSE_REQUEST
  });

  adminService
    .getAllCourses(token)
    .then(response => {
      dispatch({
        type: FETCH_COURSE_SUCCESS,
        courses: response
      });
    })
    .catch(error => dispatch({ type: FETCH_COURSE_FAILURE }));
};

export const addCourses = (title, description, token) => dispatch => {
  dispatch({
    type: ADD_COURSE_REQUEST
  });

  adminService
    .addCourses(title, description, token)
    .then(response => {
      dispatch({
        type: ADD_COURSE_SUCCESS,
        courses: response
      });
    })
    .catch(error => dispatch({ type: ADD_COURSE_FAILURE }));
};

export const newCourse = (title, description) => {
  return { type: ADD_COURSE_ELEMENT, id: id++, title, description };
};

export const delCourse = (courseIndex, token) => dispatch => {
  dispatch({
    type: DELETE_COURSE_REQUEST
  });

  adminService
    .delCourse(courseIndex, token)
    .then(response => {
      dispatch({
        type: DELETE_COURSE_SUCCESS,
        courseIndex: courseIndex
      });
    })
    .catch(error => dispatch({ type: DELETE_COURSE_FAILURE }));
};

export const changeCourse = (
  courseIndex,
  title,
  description,
  token
) => dispatch => {
  dispatch({
    type: CHANGE_COURSE_REQUEST
  });

  adminService
    .changeCourse(courseIndex, title, description, token)
    .then(response => {
      dispatch({
        type: CHANGE_COURSE_SUCCESS,
        course: response.course
      });
    })
    .catch(error => dispatch({ type: CHANGE_COURSE_FAILURE }));
};

// export const changeCourse = (courseIndex, title, description) => {
//   return { type: CHANGE_COURSE_ELEMENT, courseIndex, title, description };
// };
