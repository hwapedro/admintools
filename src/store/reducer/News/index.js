import {
  GETALL_NEWS_SUCCESS,
  ADD_NEWS_SUCCESS,
  DELETE_NEWS_SUCCESS,
  CHANGE_NEWS_SUCCESS
} from "../../constants";

const initialState = {
  news: []
};

function reducerLesson(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, action.news]
      };

    case GETALL_NEWS_SUCCESS:
      return {
        ...state,
        news: action.news
      };

    case CHANGE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.map(article =>
          action.article._id === article._id ? action.article : article
        )
      };

    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.filter(news => news._id !== action.index)
      };

    default:
      return {
        ...state
      };
  }
}

export default reducerLesson;
