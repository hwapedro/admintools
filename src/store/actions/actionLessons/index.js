import {
  ADD_ELEMENT_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_LESSON_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  GET_LESSON_REQUEST,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAILURE,
  ADD_PAGE_REQUEST,
  ADD_PAGE_SUCCESS,
  ADD_PAGE_FAILURE,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  CHANGE_TASK_REQUEST,
  CHANGE_TASK_SUCCESS,
  CHANGE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  CHANGE_DND_REQUEST,
  CHANGE_DND_FAILURE,
  CHANGE_DND_LESSON_SUCCESS,
  ADD_ELEMENT_SUCCESS,
  CHANGE_ELEMENT_SUCCESS
} from "../../constants";

import AdminService from "../../../service";

const token = localStorage.getItem("token");

export const changeLesson = (
  index,
  title,
  description,
  exam,
  name,
  courseIndex
) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  AdminService
    .changeLesson(index, title, description, exam, token, name, courseIndex)
    .then(response => {
      dispatch({
        type: CHANGE_LESSON_SUCCESS,
        lesson: response.lesson
      });
    })
    .then(() => dispatch({ type: CHANGE_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE }));
};

export const getLesson = id => dispatch => {
  dispatch({
    type: GET_LESSON_REQUEST
  });

  AdminService
    .getLesson(token, id)
    .then(response => {
      dispatch({
        type: GET_LESSON_SUCCESS,
        lesson: response.lesson
      });
    })
    .catch(error => dispatch({ type: GET_LESSON_FAILURE }));
};

export const addLesson = (
  title,
  description,
  exam,
  name,
  courseIndex
) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });
  AdminService
    .addLesson(title, description, exam, token, name, courseIndex)
    .then(response => {
      dispatch({
        type: ADD_LESSON_SUCCESS,
        lessons: response.lesson,
        name
      });
    })
    .then(() => dispatch({ type: ADD_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE }));
};

export const addPage = (id, text, tasks, needToComplete) => dispatch => {
  dispatch({
    type: ADD_PAGE_REQUEST
  });
  AdminService
    .addPage(token, id, text, tasks, needToComplete)
    .then(response => {
      dispatch({
        type: ADD_PAGE_SUCCESS,
        lesson: response.lesson
      });
    })
    .catch(error => dispatch({ type: ADD_PAGE_FAILURE }));
};

export const deletePage = id => dispatch => {
  dispatch({ type: DELETE_PAGE_REQUEST });

  AdminService
    .deletePage(token, id)
    .then(response => {
      dispatch({
        type: DELETE_PAGE_SUCCESS,
        lesson: response.body.lesson
      });
    })
    .catch(error => dispatch({ type: DELETE_PAGE_FAILURE }));
};

export const addTask = (pageId, type, info) => dispatch => {
  dispatch({
    type: ADD_TASK_REQUEST
  });

  AdminService
    .createTask(token, pageId, type, info)
    .then(response => {
      dispatch({
        type: ADD_TASK_SUCCESS,
        task: response.body.task,
        pageId: pageId
      });
    })
    .catch(error => dispatch({ type: ADD_TASK_FAILURE }));
};

export const changeTask = (taskId, type, info, pageId) => dispatch => {
  dispatch({
    type: CHANGE_TASK_REQUEST
  });
  AdminService
    .changeTask(token, taskId, type, info)
    .then(response => {
      dispatch({
        type: CHANGE_TASK_SUCCESS,
        task: response.body.task,
        taskId: taskId,
        pageId: pageId
      });
    })
    .catch(error => dispatch({ type: CHANGE_TASK_FAILURE }));
};

export const deleteTask = (pageId, taskid) => dispatch => {
  dispatch({ type: DELETE_TASK_REQUEST });

  AdminService
    .deleteTask(token, pageId, taskid)
    .then(response => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        lesson: response.body.lesson,
        pageId: pageId
      });
    })
    .catch(error => dispatch({ type: DELETE_TASK_FAILURE }));
};

export const changeDndLesson = (id1, id2, courseIndex) => dispatch => {
  dispatch({
    type: CHANGE_DND_REQUEST
  });
  AdminService
    .DragAndDropLesson(token, id1, id2, courseIndex)
    .then(response => {
      dispatch({
        type: CHANGE_DND_LESSON_SUCCESS,
        payload: {
          id1: id1,
          id2: id2
        }
      });
    })
    .catch(error => dispatch({ type: CHANGE_DND_FAILURE }));
};
