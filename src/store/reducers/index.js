import {
  ADD_COURSE_ELEMENT,
  CHANGE_COURSE_ELEMENT,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_COURSE_REQUEST,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_COURSE_REQUEST,
  CHANGE_COURSE_REQUEST,
  CHANGE_COURSE_SUCCESS,
  CHANGE_COURSE_FAILURE
} from "../constants";

import { startLoading, stopLoading } from "../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  courses: []
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
    case ADD_COURSE_REQUEST:
      return startLoading(state, action);

    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        courses: [...state.courses, action.courses]
      };

    case ADD_COURSE_FAILURE:
      return stopLoading(state, action);

    //GET COURSES BLOCK
    case FETCH_COURSE_REQUEST:
      return startLoading(state, action);

    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.courses,
        loading: false,
        error: false
      };

    case FETCH_COURSE_FAILURE:
      return stopLoading(state, action);

    case ADD_COURSE_ELEMENT:
      return {
        ...state,
        courses: [
          ...state.courses,
          {
            title: action.title,
            description: action.description,
            id: action.id
          }
        ]
      };

    //DELETE COURSES BLOCK
    case DELETE_COURSE_REQUEST:
      return startLoading(state, action);

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(
          courses => courses.courseIndex !== action.courseIndex
        ),
        loading: false,
        error: false
      };

    case DELETE_COURSE_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case CHANGE_COURSE_REQUEST:
      return startLoading(state, action);

    case CHANGE_COURSE_SUCCESS:
      const todoId = action.course.courseIndex;
      const itemIndex = state.courses.findIndex(
        ({ courseIndex }) => courseIndex === todoId
      );
      const before = state.courses.slice(0, itemIndex);
      const after = state.courses.slice(itemIndex + 1);
      return {
        ...state,
        courses: [
          ...before,
          {
            _id: state.courses[itemIndex]._id,
            title: action.course.title,
            description: action.course.description,
            courseIndex: action.course.courseIndex
          },
          ...after
        ],
        loading: false,
        error: false
      };

    case CHANGE_COURSE_FAILURE:
      return stopLoading(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducer;
