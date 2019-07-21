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
  CHANGE_ELEMENT_FAILURE
} from "../../constants";

import { startLoading, stopLoading, changeDnD } from "../../utils";

const initialState = {
  token: null,
  badges: []
};

function reducerBadges(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_BADGE_SUCCESS:
      return {
        ...state,
        badges: [...state.badges, action.badges]
      };

    case GETALL_BADGE_SUCCESS:
      return {
        ...state,
        badges: action.badges,
      };

    case DELETE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.filter(badges => badges._id !== action.index),
      };

    case CHANGE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.map(badge =>
          action.badge._id === badge._id ? action.badge : badge
        ),
      };

    default:
      return {
        ...state
      };
  }
}

export default reducerBadges;
