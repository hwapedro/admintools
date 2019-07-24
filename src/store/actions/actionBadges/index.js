import {
  CHANGE_BADGE_SUCCESS,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_BADGE_SUCCESS,
  ADD_ELEMENT_SUCCESS,
  ADD_ELEMENT_FAILURE
} from "../../constants";

import AdminService from "../../../service";

const token = localStorage.getItem("token");

export const changeBadge = (
  index,
  title,
  description,
  icon
) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  AdminService.changeBadge(token, index, { title, description, icon })
    .then(response => {
      dispatch({
        type: CHANGE_BADGE_SUCCESS,
        badge: response.badge
      });
    })
    .then(() => dispatch({ type: CHANGE_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE }));
};

export const createBadge = (title, description, icon) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });

  AdminService.createBadge(token, { title, description, icon })
    .then(response => {
      dispatch({
        type: ADD_BADGE_SUCCESS,
        badges: response.badge
      });
    })
    .then(() => dispatch({ type: ADD_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE }));
};
