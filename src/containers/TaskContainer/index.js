import { connect } from "react-redux";

import Task from "../../components/Lessons/Task/TaskComponents";
import ViewModule from "../../store/modules/ViewModule";
import PageModule from "../../store/modules/PageModule";
import TaskModule from "../../store/modules/TaskModule";

const mapStateToProps = state => ({
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state),
  task: TaskModule.getTask(state)
});

const mapDispatchToProps = dispatch => ({
  deleteTask: (pageId, taskId) =>
    dispatch(PageModule.deleteTask(pageId, taskId)),
  changeTask: (taskId, type, info, answer) =>
    dispatch(TaskModule.change(taskId, type, info, answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
