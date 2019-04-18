import {
  GETALL_COURSE_SUCCESS,
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  ADD_ELEMENT_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_COURSE_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  CHANGE_DND_REQUEST,
  CHANGE_DND_SUCCESS,
  CHANGE_DND_FAILURE
} from "../../constants";

import { startLoading, stopLoading, DND} from "../../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  courses: []
};

function reducerCourses(state = initialState, action = {}) {
  switch (action.type) {
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

    case CHANGE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    case CHANGE_DND_REQUEST:
      return startLoading(state, action);

    case CHANGE_DND_SUCCESS:
      return DND(state, action.payload.id1, action.payload.id2,'courses');


    case CHANGE_DND_FAILURE:
      return stopLoading(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducerCourses;
