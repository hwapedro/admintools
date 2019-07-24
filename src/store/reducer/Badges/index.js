import {
  GETALL_BADGE_SUCCESS,
  ADD_BADGE_SUCCESS,
  DELETE_BADGE_SUCCESS,
  CHANGE_BADGE_SUCCESS,
} from "../../constants";

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
        badges: action.badges
      };

    case DELETE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.filter(badges => badges._id !== action.index)
      };

    case CHANGE_BADGE_SUCCESS:
      return {
        ...state,
        badges: state.badges.map(badge =>
          action.badge._id === badge._id ? action.badge : badge
        )
      };

    default:
      return {
        ...state
      };
  }
}

export default reducerBadges;
