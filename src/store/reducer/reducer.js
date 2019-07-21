import {
  ADD_ELEMENT_SUCCESS,
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  ADD_ELEMENT_REQUEST,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  GETALL_ELEMENT_SUCCESS,
  DELETE_ELEMENT_SUCCESS,
  CHANGE_ELEMENT_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  CHANGE_DND_REQUEST,
  FETCH_DND_SUCCESS,
  CHANGE_DND_FAILURE,
  GET_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
  GET_COURSE_FAILURE
} from "../constants";

import { startLoading, stopLoading, getError } from "../utils";

const initialState = {
  loading: false,
  error: null
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);

    case ADD_ELEMENT_SUCCESS:
      return stopLoading(state, action);

    case ADD_ELEMENT_FAILURE:
      return getError(state, action);

    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);

    case GETALL_ELEMENT_SUCCESS:
      return stopLoading(state, action);

    case GETALL_ELEMENT_FAILURE:
      return getError(state, action);

    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case DELETE_ELEMENT_SUCCESS:
      return stopLoading(state, action);

    case DELETE_ELEMENT_FAILURE:
      return getError(state, action);

    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case CHANGE_ELEMENT_SUCCESS:
      return stopLoading(state, action);

    case CHANGE_ELEMENT_FAILURE:
      return getError(state, action);

    case CHANGE_DND_REQUEST:
      return startLoading(state, action);

    case FETCH_DND_SUCCESS:
      return stopLoading(state, action);

    case CHANGE_DND_FAILURE:
      return getError(state, action);

    case GET_COURSE_REQUEST:
      return startLoading(state, action);

    case FETCH_COURSE_SUCCESS:
      return stopLoading(state, action);

    case GET_COURSE_FAILURE:
      return getError(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducer;
