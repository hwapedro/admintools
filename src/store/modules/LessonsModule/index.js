import DuckModule from "simple-duck";
import AdminService from "../../../service";
import { DND } from "../../utils";
import {
  DELETE_LESSON_SUCCESS,
  GETALL_ELEMENT_REQUEST,
  GETALL_ELEMENT_SUCCESS,
  GETALL_ELEMENT_FAILURE,
  ADD_ELEMENT_REQUEST,
  ADD_ELEMENT_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_ELEMENT_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_DND_REQUEST,
  FETCH_DND_SUCCESS,
  CHANGE_DND_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_ELEMENT_SUCCESS,
  CHANGE_ELEMENT_FAILURE
} from "../../constants";
import ViewModule from "../ViewModule";

const token = localStorage.getItem("token");

const initialState = {
  token: null,
  loading: false,
  error: null,
  lessons: [],
  lesson: { pages: [] }
};

class LessonModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.GETALL_LESSON_SUCCESS = `${this.prefix}GETALL_LESSON_SUCCESS`;
    this.CHANGE_LESSON_SUCCESS = `${this.prefix}CHANGE_LESSON_SUCCESS`;
    this.GET_LESSON_SUCCESS = `${this.prefix}GET_LESSON_SUCCESS`;
    this.ADD_LESSON_SUCCESS = `${this.prefix}ADD_LESSON_SUCCESS`;
    this.DELETE_LESSON_SUCCESS = `${this.prefix}DELETE_LESSON_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.ADD_LESSON_SUCCESS:
        if (action.flag === "lesson") {
          return {
            ...state,
            lessons: [...state.lessons, action.lessons]
          };
        }
        return { ...state };

      case this.GETALL_LESSON_SUCCESS:
        return {
          ...state,
          lessons: action.lessons
        };

      case this.DELETE_LESSON_SUCCESS:
        if (action.flag === "lesson") {
          return {
            ...state,
            lessons: state.lessons.filter(lesson => lesson._id !== action.index)
          };
        }
        return { ...state };

      case this.CHANGE_LESSON_SUCCESS:
        return {
          ...state,
          lesson: action.lesson
        };

      case this.GET_LESSON_SUCCESS:
        return {
          ...state,
          lesson: action.lesson,

          loading: false,
          error: false
        };

      default:
        return {
          ...state
        };
    }
    return super.reduce(state, action);
  };

  getAllLessons = name => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.getAll(token, name)
      .then(response => {
        dispatch({
          type: this.GETALL_LESSON_SUCCESS,
          lessons: response.lessons
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeLesson = (
    index,
    title,
    description,
    exam,
    name,
    courseIndex
  ) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.changeLesson(
      index,
      title,
      description,
      exam,
      token,
      name,
      courseIndex
    )
      .then(response => {
        dispatch({
          type: this.CHANGE_LESSON_SUCCESS,
          lesson: response.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getLesson = id => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.getLesson(token, id)
      .then(response => {
        dispatch({
          type: this.GET_LESSON_SUCCESS,
          lesson: response.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  addLesson = (
    title,
    description,
    exam,
    name,
    courseIndex,
    flag
  ) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.addLesson(title, description, exam, token, name, courseIndex)
      .then(response => {
        dispatch({
          type: this.ADD_LESSON_SUCCESS,
          lessons: response.lesson,
          flag
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  deleteLesson = (index, name, flag) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.delet(index, token, name)
      .then(() => {
        dispatch({
          type: this.DELETE_LESSON_SUCCESS,
          index: index,
          flag
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };
}

export default new LessonModule("/LESSON/", state => state.Lesson);
