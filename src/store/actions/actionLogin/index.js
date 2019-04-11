import {
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
  } from "../../constants";
  
  import AdminService from "../../../service";
  
  const adminService = new AdminService();
  
  export const login = (username, password) => dispatch => {
    adminService
      .login(username, password)
      .then(response => {
        localStorage.setItem("userId", response.body.token);
        window.history.pushState({}, "", "/courses");
        window.history.go();
        dispatch({
          type: FETCH_LOGIN_SUCCESS,
          token: response.body.token
        });
      })
      .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE, error: true }));
  };
  