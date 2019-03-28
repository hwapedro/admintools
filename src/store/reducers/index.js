import {
  FETCH_LOGIN_REQUEST,
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
  GET_LESSON_FAILURE,
  ADD_TEST_TASK,
  DELETE_TASK,
  CHANGE_TEST_TASK,
  ADD_PAGE_REQUEST,
  ADD_PAGE_SUCCESS,
  ADD_PAGE_FAILURE,
  DELETE_PAGE_REQUEST,
DELETE_PAGE_SUCCESS,
DELETE_PAGE_FAILURE
} from "../constants";

import { startLoading, stopLoading } from "../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  courses: [],
  badges: [],
  lessons: [],
  lesson: {},
  tasks: []
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    //LOGIN BLOCK
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
        error: false
      };

    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };

    //ADD BLOCK
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);

    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        courses: [...state.courses, action.courses]
      };

    case ADD_LESSON_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        lessons: [...state.lessons, action.lessons]
      };

    case ADD_BADGE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        badges: [...state.badges, action.badges]
      };

    case ADD_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET COURSES BLOCK
    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);

    case GETALL_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.courses,
        loading: false,
        error: false
      };

    case GETALL_LESSON_SUCCESS:
      return {
        ...state,
        lessons: action.lessons,
        loading: false,
        error: false
      };

    case GETALL_BADGE_SUCCESS:
      return {
        ...state,
        badges: action.badges,
        loading: false,
        error: false
      };

    case GETALL_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(
          courses => courses.courseIndex !== action.index
        ),
        loading: false,
        error: false
      };

    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.filter(badges => badges._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case CHANGE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          action.course.courseIndex === course.courseIndex
            ? {
                _id: action.course._id,
                title: action.course.title,
                description: action.course.description,
                courseIndex: action.course.courseIndex
              }
            : course
        ),
        loading: false,
        error: false
      };

    case CHANGE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.map(badge =>
          action.badge._id === badge._id
            ? {
                _id: action.badge._id,
                title: action.badge.title,
                description: action.badge.description,
                lessonIndex: action.badge.badgeIndex
              }
            : badge
        ),
        loading: false,
        error: false
      };

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
      return{
        ...state,
        lesson: action.lesson,
        error: false,
        loading: false
      }
      case ADD_PAGE_FAILURE:
      return stopLoading(state, action);

      case DELETE_PAGE_REQUEST:
      return startLoading(state, action);

      case DELETE_PAGE_SUCCESS:
      return{
        ...state,
        lesson: action.lesson,
        error: false,
        loading: false
      }
      case DELETE_PAGE_FAILURE:
      return stopLoading(state, action);
      
    //tasks block start
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      };

    case ADD_TEST_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        answerOptions: []
      };

    case CHANGE_TEST_TASK:
      //console.log(action)
      return {
        ...state,
        tasks: state.tasks.map(task => {
          console.log(task);
          return action.task.id === task.id
            ? {
                id: action.task.id,
                name: action.task.name,
                description: action.task.description,
                question: action.task.question,
                type: action.task.taskType,
                options: action.task.options
              }
            : task;
        })
        // loading: false,
        // error: false
      };
    // tasks block end

    default:
      return {
        ...state
      };
  }
}

export default reducer;
