import { connect } from "react-redux";

import News from "../../components/News";
import NewsModule from "../../store/modules/NewsModule";
import ViewModule from "../../store/modules/ViewModule";

const mapStateToProps = state => ({
  news: NewsModule.getNews(state),
  loading: ViewModule.isLoading(state),
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  addNews: (title, description) => dispatch(NewsModule.add(title, description)),

  delArticle: index => dispatch(NewsModule.delete(index)),

  getAllNews: () => dispatch(NewsModule.getAll()),

  changeArticle: (articleIndex, title, description) =>
    dispatch(NewsModule.change(articleIndex, title, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
