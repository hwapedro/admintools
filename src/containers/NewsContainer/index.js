import { connect } from "react-redux";

import News from "../../components/News";
import NewsModule from "../../store/modules/NewsModule";
import ViewModule from '../../store/modules/ViewModule'

const mapStateToProps = state => ({
    news: NewsModule.getNews(state),
    loading: ViewModule.isLoading(state),
    error: ViewModule.isError(state)
  });

const mapDispatchToProps = dispatch => ({
  addNews: (title, description, name) =>
    dispatch(NewsModule.addNews(title, description, name)),

  delArticle: (index, name) => dispatch(NewsModule.delArticle(index, name)),

  getAllNews: name => dispatch(NewsModule.getAllNews(name)),

  changeArticle: (articleIndex, title, description, name) =>
    dispatch(NewsModule.changeArticle(articleIndex, title, description, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
