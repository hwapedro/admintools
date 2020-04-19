import { connect } from 'react-redux'

import Lesson from '../../components/Lessons/OneLesson'
import ViewModule from '../../store/modules/ViewModule'
import LessonModule from '../../store/modules/LessonModule'
import PageModule from '../../store/modules/PageModule'

const mapStateToProps = (state) => ({
  lesson: LessonModule.getOneLesson(state),
  pages: PageModule.getPages(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state),
})

const mapDispatchToProps = (dispatch) => ({
  getLesson: (id) => dispatch(LessonModule.getLesson(id)),
  changeLesson: (lessonsIndex, title, description, exam, courseIndex) => dispatch(LessonModule.change(lessonsIndex, title, description, exam, courseIndex)),
  addPage: (id, title, description, tasks, needToComplete) => dispatch(PageModule.addPage(id, title, description, tasks, needToComplete)),
  deletePage: (id) => dispatch(PageModule.deletePage(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)
