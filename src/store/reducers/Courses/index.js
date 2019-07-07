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
  CHANGE_DND_FAILURE,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  DELETE_LESSON_SUCCESS,
  CHANGE_DND_LESSON_SUCCESS,
  ADD_LESSON_SUCCESS
} from "../../constants";

import { startLoading, stopLoading, DND } from "../../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  courses: [],
  course: {}
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
        courses: state.courses
          .filter(courses => courses._id !== action.index)
          .map((course, index) => {
            return { ...course, courseIndex: index+1 };
          }),
        loading: false,
        error: false
      };

    case DELETE_LESSON_SUCCESS:
      console.log(state.course);
      return {
        ...state,
        course: {
          ...state.course,
          lessons:
            state.course.lessons &&
            state.course.lessons.filter(lesson => lesson._id !== action.index)
        },
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
            ? action.course
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
      return DND(state, action.payload.id1, action.payload.id2, "courses");

    case CHANGE_DND_FAILURE:
      return stopLoading(state, action);

    //GET COURSE
    case GET_COURSE_REQUEST:
      return startLoading(state, action);

    case GET_COURSE_SUCCESS:
      return {
        ...state,
        course: action.course,
        loading: false,
        error: false
      };

    case CHANGE_DND_LESSON_SUCCESS:
      return DND(state, action.payload.id1, action.payload.id2, "lessons");

    case GET_COURSE_FAILURE:
      return stopLoading(state, action);

    case ADD_LESSON_SUCCESS:
      console.log("!!!");
      return {
        ...state,
        error: false,
        loading: false,
        course:
          state.course !== {}
            ? {
                ...state.course,
                lessons: [...state.course.lessons, action.lessons]
              }
            : {}
      };

    default:
      return {
        ...state
      };
  }
}

export default reducerCourses;
