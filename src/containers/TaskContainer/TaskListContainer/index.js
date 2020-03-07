import { connect } from "react-redux";

import TaskList from "../../../components/Lessons/Task/TaskList";

import PageModule from "../../../store/modules/PageModule";
import TaskModule from "../../../store/modules/TaskModule";

const mapDispatchToProps = dispatch => ({
  deleteTask: (pageId, taskid) => dispatch(PageModule.deleteTask(pageId, taskid)),
  setTask: task => dispatch(TaskModule.setTask(task))
});

export default connect(null, mapDispatchToProps)(TaskList);
