import DuckModule from "simple-duck";
import AdminService from "../../../service";
import { DND } from "../../utils";
import { DELETE_LESSON_SUCCESS, ADD_LESSON_SUCCESS } from "../../constants";
import ViewModule from "../ViewModule";

const token = localStorage.getItem("token");

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
        console.log(action)
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
        return {
          ...state
        };
    }
    return super.reduce(state, action);
  };

  deletElement = (index, name) => dispatch => {
    dispatch(ViewModule.setLoading(true));


    AdminService.delet(index, token, name)
      .then(() => {
        dispatch({
          type: this.DELETE_BADGE_SUCCESS,
          index: index
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  getAllBadges = name => dispatch => {
    dispatch(ViewModule.setLoading(true));


    AdminService.getAll(token, name)
      .then(response => {
        dispatch({
          type: this.GETALL_BADGE_SUCCESS,
          badges: response.badges
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  changeBadge = (index, title, description, icon) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.changeBadge(token, index, { title, description, icon })
      .then(response => {
        dispatch({
          type: this.CHANGE_BADGE_SUCCESS,
          badge: response.badge
        });
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };

  createBadge = (title, description, icon) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AdminService.createBadge(token, { title, description, icon })
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
