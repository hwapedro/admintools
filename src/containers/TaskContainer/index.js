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
  changeTask: (taskId, type, info, pageId) =>
    dispatch(TaskModule.changeTask(taskId, type, info, pageId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
