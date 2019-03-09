import {
  ADD_COURSE_ELEMENT,
  DELETE_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_COURSE_REQUEST,
  ADD_COURSE_SUCCESS
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



export const getAllCourses = (token) => dispatch => {
  dispatch({
    type: FETCH_COURSE_REQUEST
  });

  adminService.getAllCourses(token)
    .then(response => {
      dispatch({
        type:FETCH_COURSE_SUCCESS,
        courses: response.courses
      });
    })
    .catch(error => dispatch({ type: FETCH_COURSE_FAILURE }));
};

export const addCourses = (title, description,token) => dispatch => {
  
  

  adminService.addCourses(title, description,token)
    .then(response => {
      dispatch({
        type:ADD_COURSE_SUCCESS,
      });
    })
    .catch(error => dispatch({ type: FETCH_COURSE_FAILURE }));
};



export const newCourse = (title, description) => {
  return { type: ADD_COURSE_ELEMENT, id: id++, title, description };
};



export const deleteCourse = courseIndex => {
  return { type: DELETE_COURSE_ELEMENT, courseIndex };
};



export const changeCourse = (courseIndex, title, description) => {
  return { type: CHANGE_COURSE_ELEMENT, courseIndex, title, description };
};
