import DuckModule from "simple-duck";
import AdminService from "../../../service";
import { DND } from "../../utils";
import { DELETE_LESSON_SUCCESS, ADD_LESSON_SUCCESS } from "../../constants";
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
    this.CHANGE_DND_LESSON_SUCCESS = `${this.prefix}CHANGE_DND_LESSON_SUCCESS`;
    this.ADD_PAGE_SUCCESS = `${this.prefix}ADD_PAGE_SUCCESS`;
    this.DELETE_PAGE_SUCCESS = `${this.prefix}ADD_PAGE_SUCCESS`;
    this.ADD_TASK_SUCCESS = `${this.prefix}ADD_TASK_SUCCESS`;
    this.CHANGE_TASK_SUCCESS = `${this.prefix}CHANGE_TASK_SUCCESS`;
    this.DELETE_TASK_SUCCESS = `${this.prefix}DELETE_TASK_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case ADD_LESSON_SUCCESS:
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

      case DELETE_LESSON_SUCCESS:
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

      case this.ADD_PAGE_SUCCESS:
        return {
          ...state,
          lesson: action.lesson
        };

      case this.DELETE_PAGE_SUCCESS:
        return {
          ...state,
          lesson: action.lesson
        };

      case this.ADD_TASK_SUCCESS:
        return {
          ...state,
          lesson: {
            ...state.lesson,
            pages: state.lesson.pages.map(page =>
              page._id === action.pageId
                ? { ...page, tasks: [...page.tasks, action.task] }
                : page
            )
          }
        };

      case this.CHANGE_TASK_SUCCESS:
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
          }
        };

      case this.DELETE_TASK_SUCCESS:
        return {
          ...state,
          lesson: { ...action.lesson, pages: action.lesson.pages }
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
          type: ADD_LESSON_SUCCESS,
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
          type: DELETE_LESSON_SUCCESS,
          index: index,
          flag
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  addPage = (id, text, tasks, needToComplete) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.addPage(token, id, text, tasks, needToComplete)
      .then(response => {
        dispatch({
          type: this.ADD_PAGE_SUCCESS,
          lesson: response.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  deletePage = id => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.deletePage(token, id)
      .then(response => {
        dispatch({
          type: this.DELETE_PAGE_SUCCESS,
          lesson: response.body.lesson
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  addTask = (pageId, type, info) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.createTask(token, pageId, type, info)
      .then(response => {
        dispatch({
          type: this.ADD_TASK_SUCCESS,
          task: response.body.task,
          pageId: pageId
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeTask = (taskId, type, info, pageId) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.changeTask(token, taskId, type, info)
      .then(response => {
        dispatch({
          type: this.CHANGE_TASK_SUCCESS,
          task: response.body.task,
          taskId: taskId,
          pageId: pageId
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  deleteTask = (pageId, taskid) => dispatch => {
    dispatch(ViewModule.setLoading(true));
    AdminService.deleteTask(token, pageId, taskid)
      .then(response => {
        dispatch({
          type: this.DELETE_TASK_SUCCESS,
          lesson: response.body.lesson,
          pageId: pageId
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

export default new LessonModule("/LESSON/", state => state.Lessons);
