import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from "../../constants";

import AuthService from "../../../service/auth";

export const login = (username, password) => dispatch => {
  AuthService.login(username, password)
    .then(response => {
      localStorage.setItem("token", response.body.token);
      window.history.pushState({}, "", "/courses");
      window.history.go();
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        token: response.body.token
      });
    })
    .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE }));
};
