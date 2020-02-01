import DuckModule from "simple-duck";

import ViewModule from "../ViewModule";
import TaskService from "../../../service/task";

const initialState = {};

class TaskModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.CHANGE_TASK_SUCCESS = `${this.prefix}CHANGE_TASK_SUCCESS`;
    this.SET_TASK = `${this.prefix}SET_TASK`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.CHANGE_TASK_SUCCESS:
        return {
          ...state,
          pages: state.pages.map(page =>
            page._id === action.pageId
              ? {
                  ...page,
                  tasks: page.tasks.map(task =>
                    task._id === action.taskId ? action.task : task
                  )
                }
              : page
          )
        };
      case this.SET_TASK:
        return action.payload;

      default:
        return super.reduce(state, action);
    }
  };

  changeTask = (taskId, type, info, pageId, answer) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    TaskService.changeTask(taskId, type, info, answer)
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

  setTask = task => dispatch => {
    dispatch({
      type: this.SET_TASK,
      payload: task
    });
  };

  getTask = state => {
    return this.getRoot(state)
  }
    
}

export default new TaskModule("/TASK/", state => state.task);
