import { connect } from "react-redux";
import Courses from "../../Courses";
import CoursesModule from "../../../store/modules/CoursesModule"
import ViewModule from '../../../store/modules/ViewModule'

const mapStateToProps = state => ({
  courses: CoursesModule.getAllCourses(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  addCourses: (title, description, name) =>
    dispatch(CoursesModule.addElement(title, description, name)),

  delCourse: (courseIndex, name) => dispatch(CoursesModule.deletElement(courseIndex, name)),

  getAllCourses: name => dispatch(CoursesModule.getAllElements(name)),

  changeCourse: (courseIndex, title, description, name) =>
    dispatch(CoursesModule.changeElement(courseIndex, title, description, name)),

  changeDnD: (id1, id2) => dispatch(CoursesModule.changeDnD(id1, id2, 'courses'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
