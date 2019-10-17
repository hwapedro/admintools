import { connect } from "react-redux";
import OneCourse from '../../Courses/OneCourse'

import CoursesModule from "../../../store/modules/CoursesModule"
import ViewModule from '../../../store/modules/ViewModule'
import LessonsModule from '../../../store/modules/LessonsModule'

const mapStateToProps = state => ({
    course: CoursesModule.getCourse(state),
    loading: ViewModule.isLoading(state),
    error: ViewModule.isError(state)
  });
  
  const mapDispatchToProps = dispatch => ({
    addLesson: (title, description, exam, name, courseIndex, flag) =>
      dispatch(LessonsModule.addLesson(title, description, exam, name, courseIndex, flag)),
  
    delLesson: (lessonsIndex, name, flag) =>
      dispatch(LessonsModule.deleteLesson(lessonsIndex, name, flag)),
  
    getAllLessons: name => dispatch(LessonsModule.getAllLessons(name)),
  
    changeDndLesson: (id1, id2, courseIndex) =>
    dispatch(CoursesModule.changeDnD(id1, id2, "lessons", courseIndex)),
 
    setLoading: loading => dispatch (ViewModule.setLoading(loading)),
    
    getCourse: id => dispatch(CoursesModule.getOneCourse(id))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(OneCourse);
  