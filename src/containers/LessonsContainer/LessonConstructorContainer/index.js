import { connect } from "react-redux";

import LessonConstructor from "../../../components/Lessons/LessonConstructor";
import LessonsModule from "../../../store/modules/LessonModule";


const mapDispatchToProps = dispatch => ({
    addLesson: (title, description, exam, courseIndex, flag) =>
    dispatch(
      LessonsModule.addLesson(title, description, exam, courseIndex, flag)
    ),
 
});

export default connect(null, mapDispatchToProps)(LessonConstructor);
