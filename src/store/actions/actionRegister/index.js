import {
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
  } from "../../constants";
  
  import AdminService from "../../../service";
  
  
  export const register = (username, password, email) => dispatch => {
    AdminService
      .register(username, password)
      .then(response => {
        localStorage.setItem("token", response.body.token);
        window.history.pushState({}, "", "/courses");
        window.history.go();
        dispatch({
          type: FETCH_REGISTER_SUCCESS,
          token: response.body.token
        });
      })
      .catch(error => dispatch({ type: FETCH_REGISTER_FAILURE, error: true }));
  };
  