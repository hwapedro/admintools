import DuckModule from "simple-duck";
import CourseService from "../../../service/course";
import { DND } from "../../utils";

import ViewModule from "../ViewModule";

const initialState = {
  courses: [],
  course: {},
  lessons: []
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
    this.DELETE_LESSON_SUCCESS = `${this.prefix}DELETE_LESSON_SUCCESS`;
    this.SET_COURSE_LESSONS = `${this.prefix}SET_COURSE_LESSONS`;
    this.DELETE_LESSON_COURSE = `${this.prefix}DELETE_LESSON_COURSE`;
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
          course: action.course,
          lessons: action.course.lessons
        };

      case this.ADD_LESSON_SUCCESS:
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

      case this.SET_COURSE_LESSONS:
        console.log(action);
        return {
          ...state,
          lessons: [...state.lessons, action.lesson]
        };

      case this.DELETE_LESSON_COURSE:
        console.log(
          state.lessons.filter(lesson => lesson._id !== action.index)
        );
        return {
          ...state,
          lessons: state.lessons.filter(lesson => lesson._id !== action.index)
        };

      case this.DELETE_LESSON_SUCCESS:
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
      default:
        return super.reduce(state, action);
    }
  };

  getAll = () => dispatch => {
    dispatch(ViewModule.setLoading(true));

    CourseService.getAll()
      .then(response => {
        dispatch({
          type: this.GETALL_COURSE_SUCCESS,
          courses: response.courses
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  add = (title, annotation, description) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    CourseService.add(title, annotation, description)
      .then(response => {
        dispatch({
          type: this.ADD_COURSE_SUCCESS,
          courses: response.course
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  delete = index => dispatch => {
    dispatch(ViewModule.setLoading(true));

    CourseService.delete(index)
      .then(() => {
        dispatch({
          type: this.DELETE_COURSE_SUCCESS,
          index: index
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  change = (index, title, annotation, description) => dispatch => {
    dispatch(ViewModule.setLoading(true));
    CourseService.change(index, title, annotation, description)
      .then(async response =>
        dispatch({
          type: this.CHANGE_COURSE_SUCCESS,
          course: response.course
        })
      )
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeDnD = (id1, id2, name, courseIndex = 0) => dispatch => {
    dispatch(ViewModule.setLoading(true));
    if (name === "lessons") {
      CourseService.DragAndDropLesson(id1, id2, courseIndex)
        .then(() => {
          dispatch({
            type: this.CHANGE_DND_SUCCESS,
            payload: {
              id1,
              id2
            }
          });
        })
        .then(() => dispatch(ViewModule.setLoading(false)))
        .catch(error => dispatch(ViewModule.setError(true)));
    } else
      CourseService.dragAndDrop(id1, id2, name)
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
    CourseService.getOne(id)
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

  getCourseLessons = state => {
    return this.getRoot(state).lessons;
  };

  setCourseLesson = lesson => dispatch => {
    dispatch({
      type: this.SET_COURSE_LESSONS,
      lesson: lesson
    });
  };

  deleteLessonsCourse = index => dispatch => {
    dispatch({
      type: this.DELETE_LESSON_COURSE,
      index: index
    });
  };
}

export default new CoursesModule("/COURSE/", state => state.Courses);
