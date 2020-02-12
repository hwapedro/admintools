import { connect } from "react-redux";

import LessonsList from "../../../components/Lessons/LessonList/LessonList";
import ViewModule from "../../../store/modules/ViewModule";
import LessonsModule from "../../../store/modules/LessonModule";

const mapStateToProps = state => ({
  lessons: LessonsModule.getLessons(state),
});

const mapDispatchToProps = dispatch => ({
  delLesson: (lessonsIndex, flag) =>
    dispatch(LessonsModule.deleteLesson(lessonsIndex, flag)),

  setLoading: loading => dispatch(ViewModule.setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonsList);
