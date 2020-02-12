import { connect } from "react-redux";

import CourseCounstructor from "../../../components/Courses/CourseConstructor";
import CoursesModule from "../../../store/modules/CoursesModule";


const mapDispatchToProps = dispatch => ({
  addCourses: (title, annotation, description) =>
    dispatch(CoursesModule.add(title, annotation, description))
});

export default connect(null, mapDispatchToProps)(CourseCounstructor);
