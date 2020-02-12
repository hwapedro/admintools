import { connect } from "react-redux";

import News from "../../components/News";
import NewsModule from "../../store/modules/NewsModule";
import ViewModule from "../../store/modules/ViewModule";

const mapStateToProps = state => ({
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  getAllNews: () => dispatch(NewsModule.getAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
