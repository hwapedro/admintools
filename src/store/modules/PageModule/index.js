import DuckModule from 'simple-duck'

import ViewModule from '../ViewModule'
import PageService from '../../../service/page'
import TaskService from '../../../service/task'

const initialState = {
  pages: [],
}

class PageModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector)
    this.ADD_PAGE_SUCCESS = `${this.prefix}ADD_PAGE_SUCCESS`
    this.DELETE_PAGE_SUCCESS = `${this.prefix}ADD_PAGE_SUCCESS`
    this.SET_PAGE = `${this.prefix}SET_PAGE`
    this.ADD_TASK_SUCCESS = `${this.prefix}ADD_TASK_SUCCESS`
    this.DELETE_TASK_SUCCESS = `${this.prefix}DELETE_TASK_SUCCESS`
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.ADD_PAGE_SUCCESS:
        return {
          ...state,
          pages: [...action.lesson.pages],
        }

      case this.DELETE_PAGE_SUCCESS:
        return {
          ...state,
          pages: [...action.lesson.pages],
        }

      case this.SET_PAGE:
        return {
          ...state,
          pages: [...action.payload],
        }

      case this.ADD_TASK_SUCCESS:
        return {
          ...state,
          pages: state.pages.map((page) => (page._id === action.pageId ? { ...page, tasks: [...page.tasks, action.task] } : page)),
        }

      case this.DELETE_TASK_SUCCESS:
        return {
          ...state,
          pages: action.pages,
        }

      default:
        return super.reduce(state, action)
    }
  }

  addPage = (id, title, description, tasks, needToComplete) => (dispatch, getState) => {
    dispatch(ViewModule.setLoading(true))
    PageService.addPage(id, title, description, tasks, needToComplete)
      .then((response) => {
        dispatch({
          type: this.ADD_PAGE_SUCCESS,
          lesson: response.lesson,
        })
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch((error) => dispatch(ViewModule.setError(true)))
  }

  deletePage = (id) => (dispatch) => {
    dispatch(ViewModule.setLoading(true))

    PageService.deletePage(id)
      .then((response) => {
        dispatch({
          type: this.DELETE_PAGE_SUCCESS,
          lesson: response.body.lesson,
        })
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch((error) => dispatch(ViewModule.setError(true)))
  }

  addTask = (pageId, type, info, answer) => (dispatch) => {
    dispatch(ViewModule.setLoading(true))

    TaskService.createTask(pageId, type, info, answer)
      .then((response) => {
        dispatch({
          type: this.ADD_TASK_SUCCESS,
          task: response.task,
          pageId: pageId,
        })
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch((error) => dispatch(ViewModule.setError(true)))
  }

  deleteTask = (pageId, taskid) => (dispatch) => {
    dispatch(ViewModule.setLoading(true))
    TaskService.delete(pageId, taskid)
      .then((response) => {
        dispatch({
          type: this.DELETE_TASK_SUCCESS,
          pages: response.body.lesson.pages,
        })
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch((error) => dispatch(ViewModule.setError(true)))
  }

  getPages = (state) => {
    return this.getRoot(state).pages
  }

  setPages = (pages) => (dispatch) => {
    dispatch({
      type: this.SET_PAGE,
      payload: pages,
    })
  }
}

export default new PageModule('/PAGE/', (state) => state.page)
