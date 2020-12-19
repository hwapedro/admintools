import { connect } from "react-redux";

import NewsList from "../../../components/News/NewsList";
import NewsModule from "../../../store/modules/NewsModule";

const mapStateToProps = state => ({
  news: NewsModule.getNews(state)
});

const mapDispatchToProps = dispatch => ({
  delArticle: index => dispatch(NewsModule.delete(index)),

  changeArticle: (articleIndex, title, description, icon) =>
    dispatch(NewsModule.change(articleIndex, title, description, icon))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
