import DuckModule from "simple-duck";

import AuthService from "../../../service/auth";
import ViewModule from "../ViewModule";

const initialState = {};

class AuthModule extends DuckModule {
  constructor(prefix, rootSelector) {
    super(prefix, rootSelector);
    this.FETCH_LOGIN_SUCCESS = `${this.prefix}FETCH_LOGIN_SUCCESS`;
    this.FETCH_REGISTER_SUCCESS = `${this.prefix}FETCH_REGISTER_SUCCESS`;
  }

  reduce = (state = initialState, action) => {
    switch (action.type) {
      case this.FETCH_LOGIN_SUCCESS:
        return {
          ...state,
          token: action.token
        };

      case this.FETCH_REGISTER_SUCCESS:
        return {
          ...state,
          token: action.token
        };

      default:
        return super.reduce(state, action);
    }
  };

  login = (username, password) => dispatch => {
    dispatch(ViewModule.setLoading(true));

    AuthService.login(username, password)
      .then(response => {
        localStorage.setItem("token", response.body.token);
        window.history.go('/');
        dispatch({
          type: this.FETCH_LOGIN_SUCCESS,
          token: response.body.token
        });
  
      })
      .then(() => dispatch(ViewModule.setLoading(false)))
      .catch(error => dispatch(ViewModule.setError(true)));
  };
}

export default new AuthModule("/AUTH/", state => state.auth);
