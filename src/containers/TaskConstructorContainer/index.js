import { connect } from "react-redux";

import TaskConstructor from "../../components/Lessons/Task/TaskConstructors";

import PageModule from "../../store/modules/PageModule";
import TaskModule from "../../store/modules/TaskModule";

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(PageModule.addTask(pageid, type, info, answer)),
  changeTask: (taskId, type, info, pageId, answer) =>
    dispatch(TaskModule.change(taskId, type, info, answer))
});

export default connect(null, mapDispatchToProps)(TaskConstructor);
