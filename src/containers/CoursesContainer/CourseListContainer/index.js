import { connect } from "react-redux";

import CourseList from "../../../components/Courses/CourseList";
import CoursesModule from "../../../store/modules/CoursesModule";
import ViewModule from "../../../store/modules/ViewModule";

const mapStateToProps = state => ({
  courses: CoursesModule.getAllCourses(state),
  loading: ViewModule.isLoading(state)
});

const mapDispatchToProps = dispatch => ({
  delCourse: (courseIndex, name) => dispatch(CoursesModule.delete(courseIndex)),

  changeCourse: (courseIndex, title, annotation, description) =>
    dispatch(CoursesModule.change(courseIndex, title, annotation, description)),

  setLoading: loading => dispatch(ViewModule.setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
