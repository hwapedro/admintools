import DuckModule from "simple-duck";
import AdminService from "../../../service";
import { DND } from "../../utils";
import {
  DELETE_LESSON_SUCCESS,
  ADD_LESSON_SUCCESS
} from "../../constants";

import ViewModule from "../ViewModule";

const token = localStorage.getItem("token");

const initialState = {
  courses: [],
  course: {}
};

class CoursesModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.ADD_COURSE_SUCCESS = `${this.prefix}ADD_COURSE_SUCCESS`;
    this.GETALL_COURSE_SUCCESS = `${this.prefix}GETALL_COURSE_SUCCESS`;
    this.DELETE_COURSE_SUCCESS = `${this.prefix}DELETE_COURSE_SUCCESS`;
    this.CHANGE_COURSE_SUCCESS = `${this.prefix}CHANGE_COURSE_SUCCESS`;
    this.GET_COURSE_SUCCESS = `${this.prefix}GET_COURSE_SUCCESS`;
    this.ADD_LESSON_SUCCESS = `${this.prefix}ADD_LESSON_SUCCESS`;
    this.CHANGE_DND_LESSON_SUCCESS = `${this.prefix}CHANGE_DND_LESSON_SUCCESS`;
    this.CHANGE_DND_SUCCESS = `${this.prefix}CHANGE_DND_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.ADD_COURSE_SUCCESS:
        return {
          ...state,
          courses: [...state.courses, action.courses]
        };

      case this.GETALL_COURSE_SUCCESS:
        return {
          ...state,
          courses: action.courses
        };

      case this.DELETE_COURSE_SUCCESS:
        return {
          ...state,
          courses: state.courses
            .filter(courses => courses._id !== action.index)
            .map((course, index) => {
              return { ...course, courseIndex: index + 1 };
            })
        };

      case this.CHANGE_COURSE_SUCCESS:
        return {
          ...state,
          courses: state.courses.map(course =>
            action.course.courseIndex === course.courseIndex
              ? action.course
              : course
          )
        };

      case this.CHANGE_DND_SUCCESS:
        return DND(
          state,
          action.payload.id1,
          action.payload.id2,
          action.payload.name
        );

      case this.GET_COURSE_SUCCESS:
        return {
          ...state,
          course: action.course
        };

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
                state.course.lessons.filter(
                  lesson => lesson._id !== action.index
                )
            },
            loading: false,
            error: false
          };
        }
        return { ...state };
    }
    return super.reduce(state, action);
  };

  getAllElements = name => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.getAll(token, name)
      .then(response => {
        dispatch({
          type: this.GETALL_COURSE_SUCCESS,
          courses: response.courses
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  addElement = (title, annotation, description ) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.addCourse(title, annotation, description, token )
      .then(response => {
        dispatch({
          type: this.ADD_COURSE_SUCCESS,
          courses: response.course
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  deletElement = (index, name) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.delet(index, token, name)
      .then(() => {
        dispatch({
          type: this.DELETE_COURSE_SUCCESS,
          index: index
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeElement = (index, title, annotation, description, name) => dispatch => {
    dispatch(ViewModule.setLoading(true));
    AdminService.changeCourse(index, title, annotation, description, token)
      .then(async response => {
        switch (name) {
          case "course":
            dispatch({
              type: this.CHANGE_COURSE_SUCCESS,
              course: response.course
            });
            break;
          default:
            break;
        }
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeDnD = (id1, id2, name, courseIndex = 0) => dispatch => {
    dispatch(ViewModule.setLoading(true));
    if (name === "lessons") {
      AdminService.DragAndDropLesson(token, id1, id2, courseIndex)
        .then(() => {
          dispatch({
            type: this.CHANGE_DND_SUCCESS,
            payload: {
              id1,
              id2,
              name
            }
          });
        })
        .then(() => dispatch(ViewModule.setLoading(false)))
        .catch(error => dispatch(ViewModule.setError(true)));
    } else
      AdminService.DragAndDropCourse(token, id1, id2)
        .then(() => {
          dispatch({
            type: this.CHANGE_DND_SUCCESS,
            payload: {
              id1,
              id2,
              name
            }
          });
        })
        .then(() => dispatch(ViewModule.setLoading(false)))
        .catch(error => dispatch(ViewModule.setError(true)));
  };

  getOneCourse = id => async dispatch => {
    dispatch(ViewModule.setLoading(true));
    AdminService.getOneCourse(token, id)
      .then(response => {
        dispatch({
          type: this.GET_COURSE_SUCCESS,
          course: response.course
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getAllCourses = state => {
    return this.getRoot(state).courses;
  };

  getCourse = state => {
    return this.getRoot(state).course;
  };
}

export default new CoursesModule("/COURSE/", state => state.Courses);
