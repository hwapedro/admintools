import { connect } from "react-redux";

import OneCourse from "../../components/Courses/OneCourse";
import CoursesModule from "../../store/modules/CoursesModule";
import ViewModule from "../../store/modules/ViewModule";
import LessonModule from "../../store/modules/LessonModule";

const mapStateToProps = state => ({
  course: CoursesModule.getCourse(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, courseIndex, flag) =>
    dispatch(
      LessonModule.addLesson(title, description, exam, courseIndex, flag)
    ),

  delLesson: (lessonsIndex, flag) =>
    dispatch(LessonModule.deleteLesson(lessonsIndex, flag)),

  getAllLessons: () => dispatch(LessonModule.getAllLessons()),

  changeDndLesson: (id1, id2, courseIndex) =>
    dispatch(CoursesModule.changeDnD(id1, id2, "lessons", courseIndex)),

  setLoading: loading => dispatch(ViewModule.setLoading(loading)),

  getCourse: id => dispatch(CoursesModule.getOneCourse(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OneCourse);
