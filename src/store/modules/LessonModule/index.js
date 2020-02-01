import DuckModule from "simple-duck";
import LessonService from "../../../service/lesson";
import { DND } from "../../utils";
import ViewModule from "../ViewModule";
import PageModule from "../PageModule"

const initialState = {
  lessons: [],
  lesson: { pages: [] }
};

class LessonModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.GETALL_LESSON_SUCCESS = `${this.prefix}GETALL_LESSON_SUCCESS`;
    this.CHANGE_LESSON_SUCCESS = `${this.prefix}CHANGE_LESSON_SUCCESS`;
    this.DELETE_LESSON_SUCCESS = `${this.prefix}DELETE_LESSON_SUCCESS`;
    this.ADD_LESSON_SUCCESS = `${this.prefix}ADD_LESSON_SUCCESS`;
    this.GET_LESSON_SUCCESS = `${this.prefix}GET_LESSON_SUCCESS`;
    this.CHANGE_DND_LESSON_SUCCESS = `${this.prefix}CHANGE_DND_LESSON_SUCCESS`;
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

      case this.CHANGE_DND_LESSON_SUCCESS:
        return DND(state, action.payload.id1, action.payload.id2, "lessons");

      default:
        return super.reduce(state, action);
    }
  };

  getAllLessons = () => dispatch => {
    dispatch(ViewModule.setLoading(true));
    
    LessonService.getAll()
      .then(response => {
        dispatch({
          type: this.GETALL_LESSON_SUCCESS,
          lessons: response.lessons
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeLesson = (index, title, description, exam, courseIndex) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    LessonService.change(index, title, description, exam, courseIndex)
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

    LessonService.getOne(id)
      .then(response => {
        dispatch(PageModule.setPages(response.lesson.pages))
        dispatch({
          type: this.GET_LESSON_SUCCESS,
          lesson: response.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  addLesson = (title, description, exam, courseIndex, flag) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    LessonService.add(title, description, exam, courseIndex)
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

  deleteLesson = (index, flag) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    LessonService.delete(index)
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

  getLessons = state => {
    return this.getRoot(state).lessons;
  };

  getOneLesson = state => {
    return this.getRoot(state).lesson;
  };
}

export default new LessonModule("/LESSON/", state => state.lesson);
