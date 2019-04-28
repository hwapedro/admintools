import {
  GETALL_COURSE_SUCCESS,
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_LESSON_SUCCESS,
  GETALL_NEWS_SUCCESS,
  ADD_NEWS_SUCCESS,
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
  DELETE_NEWS_SUCCESS,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_COURSE_SUCCESS,
  CHANGE_BADGE_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  CHANGE_DND_REQUEST,
  CHANGE_DND_SUCCESS,
  CHANGE_DND_FAILURE
} from "../constants";

import AdminService from "../../service";

const adminService = new AdminService();

export const getAllElements = (token, name) => dispatch => {
  dispatch({
    type: GETALL_ELEMENT_REQUEST
  });

  adminService
    .getAll(token, name)
    .then(response => {
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
        case "news":
          dispatch({
            type: GETALL_NEWS_SUCCESS,
            news: response.articles
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: GETALL_ELEMENT_FAILURE, error: true }));
};

export const addElement = (title, description, token, name) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });

  adminService
    .add(title, description, token, name)
    .then(response => {
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
        case "news":
          dispatch({
            type: ADD_NEWS_SUCCESS,
            news: response.article
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE, error: true }));
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
          case "news":
          dispatch({
            type: DELETE_NEWS_SUCCESS,
            index: index
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: DELETE_ELEMENT_FAILURE, error: true }));
};

export const changeElement = (
  index,
  title,
  description,
  token,
  name
) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  adminService
    .change(index, title, description, token, name)
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
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE, error: true }));
};

export const changeDnD = (token, id1, id2) => dispatch => {
  dispatch({
    type: CHANGE_DND_REQUEST
  });
  adminService
    .DragAndDropCourse(token, id1, id2)
    .then(response => {
      dispatch({
        type: CHANGE_DND_SUCCESS,
        payload: {
          id1: id1,
          id2: id2
        }
      });
    })
    .catch(error => dispatch({ type: CHANGE_DND_FAILURE }));
};
