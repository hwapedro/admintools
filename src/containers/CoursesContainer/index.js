import { connect } from "react-redux";

import Courses from "../../components/Courses";
import CoursesModule from "../../store/modules/CoursesModule";
import ViewModule from "../../store/modules/ViewModule";

const mapStateToProps = state => ({
  courses: CoursesModule.getAllCourses(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  addCourses: (title, annotation, description) =>
    dispatch(CoursesModule.add(title, annotation, description)),

  delCourse: (courseIndex, name) => dispatch(CoursesModule.delete(courseIndex)),

  getAllCourses: () => dispatch(CoursesModule.getAll()),

  changeCourse: (courseIndex, title, annotation, description) =>
    dispatch(CoursesModule.change(courseIndex, title, annotation, description)),

  changeDnD: (id1, id2) =>
    dispatch(CoursesModule.changeDnD(id1, id2, "courses")),

  setLoading: loading => dispatch(ViewModule.setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
