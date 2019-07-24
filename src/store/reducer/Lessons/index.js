import {
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_LESSON_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_ELEMENT_FAILURE,
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
} from "../../constants";

import { startLoading, stopLoading } from "../../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  lessons: [],
  lesson: { pages: [] }
};

function reducerLesson(state = initialState, action = {}) {
  switch (action.type) {
    //ADD BLOCK
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);

    case ADD_LESSON_SUCCESS:
      if (action.flag === "lesson") {
        return {
          ...state,
          error: false,
          loading: false,
          lessons: [...state.lessons, action.lessons]
        };
      } 
      return {...state}

    case ADD_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET ALL BLOCK
    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);

    case GETALL_LESSON_SUCCESS:
      return {
        ...state,
        lessons: action.lessons,
        loading: false,
        error: false
      };

    case GETALL_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case DELETE_LESSON_SUCCESS:
      if (action.flag === "lesson") {
        return {
          ...state,
          lessons: state.lessons.filter(lesson => lesson._id !== action.index),
          loading: false,
          error: false
        };
      } 
      return {...state}

    case DELETE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //CHANGE BLOCK
    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case CHANGE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: action.lesson,
        loading: false,
        error: false
      };

    case CHANGE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET LESSON
    case GET_LESSON_REQUEST:
      return startLoading(state, action);

    case GET_LESSON_SUCCESS:
      return {
        ...state,
        lesson: action.lesson,
        loading: false,
        error: false
      };

    case GET_LESSON_FAILURE:
      return stopLoading(state, action);

    case ADD_PAGE_REQUEST:
      return startLoading(state, action);

    case ADD_PAGE_SUCCESS:
      return {
        ...state,
        lesson: action.lesson,
        error: false,
        loading: false
      };
    case ADD_PAGE_FAILURE:
      return stopLoading(state, action);

    case DELETE_PAGE_REQUEST:
      return startLoading(state, action);

    case DELETE_PAGE_SUCCESS:
      return {
        ...state,
        lesson: action.lesson,
        error: false,
        loading: false
      };
    case DELETE_PAGE_FAILURE:
      return stopLoading(state, action);

    case ADD_TASK_REQUEST:
      return startLoading(state, action);

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        lesson: {
          ...state.lesson,
          pages: state.lesson.pages.map(page =>
            page._id === action.pageId
              ? { ...page, tasks: [...page.tasks, action.task] }
              : page
          )
        },
        error: false,
        loading: false
      };
    case ADD_TASK_FAILURE:
      return stopLoading(state, action);

    case CHANGE_TASK_REQUEST:
      return startLoading(state, action);

    //unfinished
    case CHANGE_TASK_SUCCESS:
      return {
        ...state,

        lesson: {
          ...state.lesson,
          pages: state.lesson.pages.map(page =>
            page._id === action.pageId
              ? {
                  ...page,
                  tasks: page.tasks.map(task =>
                    task._id === action.taskId ? action.task : task
                  )
                }
              : page
          )
        },

        error: false,
        loading: false
      };
    case CHANGE_TASK_FAILURE:
      return stopLoading(state, action);

    case DELETE_TASK_REQUEST:
      return startLoading(state, action);

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        lesson: { ...action.lesson, pages: action.lesson.pages },
        error: false,
        loading: false
      };
    case DELETE_TASK_FAILURE:
      return stopLoading(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducerLesson;
