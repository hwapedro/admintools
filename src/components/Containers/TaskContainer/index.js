import { connect } from "react-redux";
import Tasks from "../../Lessons/Task/TaskComponents";

import ViewModule from "../../../store/modules/ViewModule";
import LessonsModule from "../../../store/modules/LessonsModule";

const mapStateToProps = state => ({
  lesson: LessonsModule.getOneLesson(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  getLesson: lessonId => dispatch(LessonsModule.getLesson(lessonId)),
  deleteTask: (pageId, taskId) =>
    dispatch(LessonsModule.deleteTask(pageId, taskId)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(LessonsModule.changeTask(taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
