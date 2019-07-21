import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE
} from "../../constants";

import { getError } from "../../utils";

const initialState = {
  error: null
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token
      };

    case FETCH_LOGIN_FAILURE:
      return getError(state, action);

    case FETCH_REGISTER_REQUEST:
      return {
        ...state
      };
    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token
      };

    case FETCH_REGISTER_FAILURE:
      return getError(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducer;
