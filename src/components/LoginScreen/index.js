import React from "react";

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



  render() {

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
        <span
          className="regButton"
          
        >
          New user? <span style={{ color: "#8e4c4d" }}>SIGNUP</span>
        </span>

        <button className="logButton" onClick={this.handleClick}>
          LOGIN
        </button>
      </>
    );
  }
}

export default LoginScreen;
