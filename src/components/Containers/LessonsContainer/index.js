import { connect } from "react-redux";
import Lessons from "../../Lessons";

import ViewModule from "../../../store/modules/ViewModule";
import LessonsModule from "../../../store/modules/LessonsModule";

const mapStateToProps = state => ({
  lessons: LessonsModule.getLessons(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, name, courseIndex, flag) =>
    dispatch(
      LessonsModule.addLesson(title, description, exam, name, courseIndex, flag)
    ),

  delLesson: (lessonsIndex, name, flag) =>
    dispatch(LessonsModule.deleteLesson(lessonsIndex, name, flag)),

  getAllLessons: name => dispatch(LessonsModule.getAllLessons(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
