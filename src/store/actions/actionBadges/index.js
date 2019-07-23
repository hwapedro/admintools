import {
  CHANGE_BADGE_ICON_SUCCESS,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_SUCCESS
} from "../../constants";

import AdminService from "../../../service";

const token = localStorage.getItem("token");

export const changeIconBadge = (icon, id) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  AdminService.postIconBadges(token, icon, id)
    .then(response => {
      console.log(response);
      dispatch({
        type: CHANGE_BADGE_ICON_SUCCESS,
        payload: response
      });
    })
    .then(() => dispatch({ type: CHANGE_ELEMENT_SUCCESS }))
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE }));
};
