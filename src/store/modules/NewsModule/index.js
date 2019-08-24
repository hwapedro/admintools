import DuckModule from "simple-duck";
import AdminService from "../../../service";

import ViewModule from "../ViewModule";

const token = localStorage.getItem("token");

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

  getAllNews = name => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.getAll(token, name)
      .then(response => {
        dispatch({
          type: this.GETALL_NEWS_SUCCESS,
          news: response.articles
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  addNews = (title, description, name) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.add(title, description, token, name)
      .then(response => {
        dispatch({
          type: this.ADD_NEWS_SUCCESS,
          news: response.article
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  delArticle = (index, name) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.delet(index, token, name)
      .then(() => {
        dispatch({
          type: this.DELETE_NEWS_SUCCESS,
          index: index
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeArticle = (index, title, description, name) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.change(index, title, description, token, name)
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
