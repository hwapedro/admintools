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
  getAllCourses: () => dispatch(CoursesModule.getAll()),

  changeDnD: (id1, id2) =>
    dispatch(CoursesModule.changeDnD(id1, id2, "courses"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
