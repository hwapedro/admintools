import {
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  GETALL_COURSE_SUCCESS,
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_LESSON_SUCCESS,
  GETALL_BADGE_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_BADGE_SUCCESS,
  ADD_LESSON_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_BADGE_SUCCESS,
  DELETE_LESSON_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_COURSE_SUCCESS,
  CHANGE_BADGE_SUCCESS,
  CHANGE_LESSON_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  GET_LESSON_REQUEST,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAILURE
} from "../constants";

import AdminService from "../../service";

const adminService = new AdminService();

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

export const getAllElements = (token, name) => dispatch => {
  dispatch({
    type: GETALL_ELEMENT_REQUEST
  });

  adminService
    .getAll(token, name)
    .then(response => {
      console.log(response);
      switch (name) {
        case "course":
          dispatch({
            type: GETALL_COURSE_SUCCESS,
            courses: response.courses
          });
          break;
        case "badge":
          dispatch({
            type: GETALL_BADGE_SUCCESS,
            badges: response.badges
          });
          break;
        case "lesson":
          dispatch({
            type: GETALL_LESSON_SUCCESS,
            lessons: response.lessons
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: GETALL_ELEMENT_FAILURE }));
};

export const addElement = (title, description, token, name) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });

  adminService
    .add(title, description, token, name)
    .then(response => {
      console.log(response);
      switch (name) {
        case "course":
          dispatch({
            type: ADD_COURSE_SUCCESS,
            courses: response.course
          });
          break;
        case "badge":
          dispatch({
            type: ADD_BADGE_SUCCESS,
            badges: response.badge
          });
          break;
        case "lesson":
          dispatch({
            type: ADD_LESSON_SUCCESS,
            lessons: response.lesson
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE }));
};

export const deletElement = (index, token, name) => dispatch => {
  dispatch({
    type: DELETE_ELEMENT_REQUEST
  });

  adminService
    .delet(index, token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: DELETE_COURSE_SUCCESS,
            index: index
          });
          break;
        case "badge":
          dispatch({
            type: DELETE_BADGE_SUCCESS,
            index: index
          });
          break;
        case "lesson":
          dispatch({
            type: DELETE_LESSON_SUCCESS,
            index: index
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: DELETE_ELEMENT_FAILURE }));
};

export const changeElement = (
  index,
  title,
  description,
  exam,
  token,
  name
) => dispatch => {
  console.log(token)
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  adminService
    .change(index, title, description, exam, token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: CHANGE_COURSE_SUCCESS,
            course: response.course
          });
          break;
        case "badge":
          dispatch({
            type: CHANGE_BADGE_SUCCESS,
            badge: response.badge
          });
          break;
        case "lesson":
          dispatch({
            type: CHANGE_LESSON_SUCCESS,
            lesson: response.lesson
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE }));
};

export const getLesson = (token, id) => dispatch => {
  dispatch({
    type: GET_LESSON_REQUEST
  });

  adminService
    .getLesson(token, id)
    .then(response => {
      dispatch({
        type: GET_LESSON_SUCCESS,
        lesson: response.lesson
      });
    })
    .catch(error => dispatch({ type: GET_LESSON_FAILURE }));
};

// export const changeCourse = (courseIndex, title, description) => {
//   return { type: CHANGE_COURSE_ELEMENT, courseIndex, title, description };
// };
