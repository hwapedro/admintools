import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions";
import { withRouter } from "react-router-dom";

class LoginScreen extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (f, r) => e => {
    const v = e.target.value;
    if (r.test(v))
      this.setState({
        [f]: v
      });
  };

  // componentDidMount() {
  //   const { token } = this.props;
  // }

  setLogin = async () => {
    const { username, password } = this.state;
    const { login } = this.props;
    await login(username, password);
  };

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <>
        <h2>WELCOME</h2>
        <input
          onClick={this.getRep}
          placeholder="USERNAME"
          className="logUser"
          type="text"
          label="Имя пользователя"
          value={this.state.username}
          onChange={this.handleChange("username", /^[a-zA-Z_0-9]*?$/i)}
        />
        <input
          placeholder="PASSWORD"
          className="logUser"
          label="Пароль"
          type="password"
          value={this.state.password}
          autoComplete="off"
          onChange={this.handleChange("password", /^[a-zA-Z_0-9]*?$/i)}
        />
        <span className="regButton">
          New user? <span style={{ color: "#8e4c4d" }}>SIGNUP</span>
        </span>

        <button className="logButton" onClick={this.setLogin}>
          LOGIN
        </button>
        {error ? <div> Error {error} </div> : <div />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen)
);
