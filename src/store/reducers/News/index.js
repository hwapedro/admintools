import {
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_NEWS_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_NEWS_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_NEWS_SUCCESS,
  CHANGE_ELEMENT_FAILURE
} from "../../constants";

import { startLoading, stopLoading } from "../../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  news: []
};

function reducerLesson(state = initialState, action = {}) {
  switch (action.type) {
    //ADD BLOCK
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);

    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        news: [...state.news, action.news]
      };

    case ADD_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET ALL BLOCK
    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);

    case GETALL_NEWS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        news: action.news
      };

    case GETALL_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //CHANGE BLOCK
    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case CHANGE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.map(article =>
          action.article._id === article._id
            ? action.article
            : article
        ),
        loading: false,
        error: false
      };

    case CHANGE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.filter(news => news._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducerLesson;
