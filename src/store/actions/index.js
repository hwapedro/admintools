import {
  ADD_ELEMENT_SUCCESS,
  GETALL_ELEMENT_SUCCESS,
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
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_SUCCESS,
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
  CHANGE_DND_FAILURE,
  CHANGE_NEWS_SUCCESS,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  CHANGE_ELEMENT_SUCCESS,
  FETCH_COURSE_SUCCESS,
  FETCH_DND_SUCCESS,
  CHANGE_BADGE_ICON_SUCCESS
} from "../constants";

import AdminService from "../../service";

const token = localStorage.getItem("token");

export const getAllElements = name => dispatch => {
  dispatch({
    type: GETALL_ELEMENT_REQUEST
  });

  AdminService.getAll(token, name)
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
    .then(() => dispatch({ type: GETALL_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: GETALL_ELEMENT_FAILURE }));
};

export const addElement = (title, description, name) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });

  AdminService.add(title, description, token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: ADD_COURSE_SUCCESS,
            courses: response.course
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
    .then(() => dispatch({ type: ADD_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE }));
};

export const deletElement = (index, name) => dispatch => {
  dispatch({
    type: DELETE_ELEMENT_REQUEST
  });

  AdminService.delet(index, token, name)
    .then(() => {
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
    .then(() => dispatch({ type: DELETE_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: DELETE_ELEMENT_FAILURE }));
};

export const changeElement = (
  index,
  title,
  description,
  name
) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });
  AdminService.change(index, title, description, token, name)
    .then(async response => {
      switch (name) {
        case "course":
          dispatch({
            type: CHANGE_COURSE_SUCCESS,
            course: response.course
          });
          break;

        case "news":
          dispatch({
            type: CHANGE_NEWS_SUCCESS,
            article: response.article
          });
          break;
        default:
          break;
      }
    })
    .then(() => dispatch({ type: CHANGE_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE }));
};

export const changeDnD = (id1, id2) => dispatch => {
  dispatch({
    type: CHANGE_DND_REQUEST
  });
  AdminService.DragAndDropCourse(token, id1, id2)
    .then(() => {
      dispatch({
        type: CHANGE_DND_SUCCESS,
        payload: {
          id1: id1,
          id2: id2
        }
      });
    })
    .then(() => dispatch({ type: FETCH_DND_SUCCESS }))
    .catch(error => dispatch({ type: CHANGE_DND_FAILURE }));
};

export const getCourse = id => async dispatch => {
  dispatch({
    type: GET_COURSE_REQUEST
  });
  AdminService.getOneCourse(token, id)
    .then(response => {
      dispatch({
        type: GET_COURSE_SUCCESS,
        course: response.course
      });
    })
    .then(() => dispatch({ type: FETCH_COURSE_SUCCESS }))
    .catch(error => dispatch({ type: GET_COURSE_FAILURE }));
};
