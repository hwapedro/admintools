import { connect } from "react-redux";

import Lessons from "../../components/Lessons";
import ViewModule from "../../store/modules/ViewModule";
import LessonsModule from "../../store/modules/LessonModule";

const mapStateToProps = state => ({
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  getAllLessons: () => dispatch(LessonsModule.getAllLessons()),

  setLoading: loading => dispatch(ViewModule.setLoading(loading))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
