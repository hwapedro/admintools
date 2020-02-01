import DuckModule from "simple-duck";

import NewsService from "../../../service/news";
import ViewModule from "../ViewModule";

const initialState = {
  news: []
};

class CoursesModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.ADD_NEWS_SUCCESS = `${this.prefix}ADD_NEWS_SUCCESS`;
    this.GETALL_NEWS_SUCCESS = `${this.prefix}GETALL_NEWS_SUCCESS`;
    this.CHANGE_NEWS_SUCCESS = `${this.prefix}CHANGE_NEWS_SUCCESS`;
    this.DELETE_NEWS_SUCCESS = `${this.prefix}DELETE_NEWS_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.ADD_NEWS_SUCCESS:
        return {
          ...state,
          news: [...state.news, action.news]
        };

      case this.GETALL_NEWS_SUCCESS:
        return {
          ...state,
          news: action.news
        };

      case this.CHANGE_NEWS_SUCCESS:
        return {
          ...state,
          news: state.news.map(article =>
            action.article._id === article._id ? action.article : article
          )
        };

      case this.DELETE_NEWS_SUCCESS:
        return {
          ...state,
          news: state.news.filter(news => news._id !== action.index)
        };
    }
    return super.reduce(state, action);
  };

  getAll = name => dispatch => {
    dispatch(ViewModule.setLoading(true));

    NewsService.getAll()
      .then(response => {
        dispatch({
          type: this.GETALL_NEWS_SUCCESS,
          news: response.articles
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  add = (title, description) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    NewsService.add(title, description)
      .then(response => {
        dispatch({
          type: this.ADD_NEWS_SUCCESS,
          news: response.article
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  delete = (index) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    NewsService.delete(index)
      .then(() => {
        dispatch({
          type: this.DELETE_NEWS_SUCCESS,
          index: index
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  change= (index, title, description) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    NewsService.change(index, title, description)
      .then(async response => {
        dispatch({
          type: this.CHANGE_NEWS_SUCCESS,
          article: response.article
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getNews = state => {
    return this.getRoot(state).news;
  };

}

export default new CoursesModule("/NEWS/", state => state.News);
