import { connect } from "react-redux";

import Lesson from "../../components/Lessons/OneLesson";
import ViewModule from "../../store/modules/ViewModule";
import LessonModule from "../../store/modules/LessonModule";
import PageModule from "../../store/modules/PageModule";
import TaskModule from "../../store/modules/TaskModule";

const mapStateToProps = state => ({
  lesson: LessonModule.getOneLesson(state),
  pages: PageModule.getPages(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  getLesson: id => dispatch(LessonModule.getLesson(id)),
  changeLesson: (lessonsIndex, title, description, exam, name, courseIndex) =>
    dispatch(
      LessonModule.changeLesson(
        lessonsIndex,
        title,
        description,
        exam,
        name,
        courseIndex
      )
    ),
  addPage: (id, text, tasks, needToComplete) =>
    dispatch(PageModule.addPage(id, text, tasks, needToComplete)),
  deletePage: id => dispatch(PageModule.deletePage(id)),
  deleteTask: (pageId, taskid) =>
    dispatch(PageModule.deleteTask(pageId, taskid)),
  setTask: task => dispatch(TaskModule.setTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
