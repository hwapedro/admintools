import DuckModule from "simple-duck";

import BadgeService from "../../../service/badge";
import ViewModule from "../ViewModule";

const initialState = {
  badges: []
};

class BadgesModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.ADD_BADGE_SUCCESS = `${this.prefix}ADD_BADGE_SUCCESS`;
    this.GETALL_BADGE_SUCCESS = `${this.prefix}GETALL_BADGE_SUCCESS`;
    this.DELETE_BADGE_SUCCESS = `${this.prefix}DELETE_BADGE_SUCCESS`;
    this.CHANGE_BADGE_SUCCESS = `${this.prefix}CHANGE_BADGE_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.ADD_BADGE_SUCCESS:
        return {
          ...state,
          badges: [...state.badges, action.badges]
        };

      case this.GETALL_BADGE_SUCCESS:
    
        return {
          ...state,
          badges: action.badges
        };

      case this.DELETE_BADGE_SUCCESS:
        return {
          ...state,
          badges: state.badges.filter(badges => badges._id !== action.index)
        };

      case this.CHANGE_BADGE_SUCCESS:
        return {
          ...state,
          badges: state.badges.map(badge =>
            action.badge._id === badge._id ? action.badge : badge
          )
        };

      default:
        return super.reduce(state, action);
    }
  };

  delete = index => dispatch => {
    dispatch(ViewModule.setLoading(true));

    BadgeService.delete(index)
      .then(() => {
        dispatch({
          type: this.DELETE_BADGE_SUCCESS,
          index: index
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getAll = () => dispatch => {
    dispatch(ViewModule.setLoading(true));

    BadgeService.getAll()
      .then(response => {
        dispatch({
          type: this.GETALL_BADGE_SUCCESS,
          badges: response.badges
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  change = (index, title, description, icon) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    BadgeService.change(index, { title, description, icon })
      .then(response => {
        dispatch({
          type: this.CHANGE_BADGE_SUCCESS,
          badge: response.badge
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  add = (title, description, icon) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    BadgeService.add({ title, description, icon })
      .then(response => {
        dispatch({
          type: this.ADD_BADGE_SUCCESS,
          badges: response.badge
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getBadges = state => {
    return this.getRoot(state).badges;
  };
}

export default new BadgesModule("/BADGES/", state => state.Badges);
