import { connect } from "react-redux";
import TaskConstructor from "../../Lessons/Task/TaskConstructors";

import LessonModule from "../../../store/modules/LessonModule";

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(LessonModule.addTask(pageid, type, info, answer)),
  changeTask: (taskId, type, info, pageId, answer) =>
    dispatch(LessonModule.changeTask(taskId, type, info, pageId, answer))
});

export default connect(null, mapDispatchToProps)(TaskConstructor);
