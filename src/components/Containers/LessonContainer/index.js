import { connect } from "react-redux";
import Lesson from "../../Lessons/Lesson";

import ViewModule from "../../../store/modules/ViewModule";
import LessonsModule from "../../../store/modules/LessonsModule";


const mapStateToProps = state => ({
    lesson: LessonsModule.getOneLesson(state),
    loading: ViewModule.isLoading(state),
    error: ViewModule.isError(state)
  });
  
  const mapDispatchToProps = dispatch => ({
    getLesson: id => dispatch(LessonsModule.getLesson(id)),
    changeLesson: (lessonsIndex, title, description, exam, name, courseIndex) =>
      dispatch(
        LessonsModule.changeLesson(lessonsIndex, title, description, exam, name, courseIndex)
      ),
    addPage: (id, text, tasks, needToComplete) =>
      dispatch(LessonsModule.addPage(id, text, tasks, needToComplete)),
    deletePage: id => dispatch(LessonsModule.deletePage(id)),
    deleteTask: (pageId, taskid) => dispatch(LessonsModule.deleteTask(pageId, taskid))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lesson);