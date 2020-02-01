import { connect } from "react-redux";
import Tasks from "../../Lessons/Task/TaskComponents";

import ViewModule from "../../../store/modules/ViewModule";
import LessonModule from "../../../store/modules/LessonModule";

const mapStateToProps = state => ({
  lesson: LessonModule.getOneLesson(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  getLesson: lessonId => dispatch(LessonModule.getLesson(lessonId)),
  deleteTask: (pageId, taskId) =>
    dispatch(LessonModule.deleteTask(pageId, taskId)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(LessonModule.changeTask(taskId, type, info, pageId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
