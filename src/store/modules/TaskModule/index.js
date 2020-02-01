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
        return action.task;

      case this.SET_TASK:
        return action.task;

      default:
        return super.reduce(state, action);
    }
  };

  change = (taskId, type, info, answer) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    TaskService.change(taskId, type, info, answer)
      .then(response => {
        dispatch({
          type: this.CHANGE_TASK_SUCCESS,
          task: response.body.task
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  setTask = task => dispatch => {
    dispatch({
      type: this.SET_TASK,
      task: task
    });
  };

  getTask = state => {
    return this.getRoot(state);
  };
}

export default new TaskModule("/TASK/", state => state.task);
