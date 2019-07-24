import {
  GETALL_COURSE_SUCCESS,
  ADD_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS,
  CHANGE_COURSE_SUCCESS,
  CHANGE_DND_SUCCESS,
  GET_COURSE_SUCCESS,
  DELETE_LESSON_SUCCESS,
  CHANGE_DND_LESSON_SUCCESS,
  ADD_LESSON_SUCCESS
} from "../../constants";

import { DND } from "../../utils";

const initialState = {
  courses: [],
  course: {}
};

function reducerCourses(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.courses]
      };

    case GETALL_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.courses
      };

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses
          .filter(courses => courses._id !== action.index)
          .map((course, index) => {
            return { ...course, courseIndex: index + 1 };
          })
      };

    case CHANGE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          action.course.courseIndex === course.courseIndex
            ? action.course
            : course
        )
      };

    case CHANGE_DND_SUCCESS:
      return DND(state, action.payload.id1, action.payload.id2, "courses");

    case GET_COURSE_SUCCESS:
      return {
        ...state,
        course: action.course
      };

    case CHANGE_DND_LESSON_SUCCESS:
      return DND(state, action.payload.id1, action.payload.id2, "lessons");

    case ADD_LESSON_SUCCESS:
      if (action.flag === "course") {
        return {
          ...state,
          error: false,
          loading: false,
          course: {
            ...state.course,
            lessons: [...state.course.lessons, action.lessons]
          }
        };
      }
      return { ...state };

    case DELETE_LESSON_SUCCESS:
      if (action.flag === "course") {
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
      }
      return { ...state };

    default:
      return {
        ...state
      };
  }
}

export default reducerCourses;
