import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LoginScreen from "../../components/Authorization/LoginScreen/";
import AuthModule from "../../store/modules/AuthModule/";
import ViewModule from "../../store/modules/ViewModule";

const mapStateToProps = state => ({
  token: null,
  error: ViewModule.isError(state)
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) =>
    dispatch(AuthModule.login(username, password))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
);
