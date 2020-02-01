import { connect } from "react-redux";

import Lessons from "../../components/Lessons";
import ViewModule from "../../store/modules/ViewModule";
import LessonsModule from "../../store/modules/LessonModule";

const mapStateToProps = state => ({
  lessons: LessonsModule.getLessons(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, courseIndex, flag) =>
    dispatch(
      LessonsModule.addLesson(title, description, exam, courseIndex, flag)
    ),

  delLesson: (lessonsIndex, flag) =>
    dispatch(LessonsModule.deleteLesson(lessonsIndex, flag)),

  getAllLessons: () => dispatch(LessonsModule.getAllLessons()),

  setLoading: loading => dispatch(ViewModule.setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
