import {
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_BADGE_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_BADGE_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_BADGE_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_BADGE_SUCCESS,
  CHANGE_ELEMENT_FAILURE,

} from "../../constants";

import { startLoading, stopLoading, changeDnD } from "../../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  badges: []
};

function reducerBadges(state = initialState, action = {}) {
  switch (action.type) {
    //ADD BLOCK
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);

    case ADD_BADGE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        badges: [...state.badges, action.badges]
      };

    case ADD_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET COURSES BLOCK
    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);

    case GETALL_BADGE_SUCCESS:
      return {
        ...state,
        badges: action.badges,
        loading: false,
        error: false
      };

    case GETALL_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case DELETE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.filter(badges => badges._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case CHANGE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducerBadges;
