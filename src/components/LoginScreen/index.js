import React from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions";
import { withRouter } from "react-router-dom";

import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CustomInput from "./CustomInput";

const signInSchema = Yup.object().shape({
  username: Yup.string().required("Обязательно для заполнения"),
  password: Yup.string().required("Обязательно для заполнения")
});

class LoginScreen extends React.Component {
  handleChange = (f, r) => e => {
    console.log(e.target.value);
    const v = e.target.value;
    if (r.test(v))
      this.setState({
        [f]: v
      });
  };

  // componentDidMount() {
  //   const { token } = this.props;
  // }

  setLogin = async ({ username, password }) => {
    const { login } = this.props;
    await login(username, password);
  };

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <Wrapper>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={this.setLogin}
          render={({ errors, touched }) => (
            <Form>
              <Field
                name="username"
                label="username"
                placeholder="Введите никнейм, пожалуйста"
                invalid={touched.username && errors.username}
                component={CustomInput}
              />
              <ErrorMessage name="username" component={Error} />

              <Field
                name="password"
                label="password"
                placeholder="Введите пароль, пожалуйста"
                invalid={touched.password && errors.password}
                component={CustomInput}
              />
              <ErrorMessage name="password" component={Error} />

              <ButtonWrapper>
                <SignInButton type="submit">SIGN IN</SignInButton>
              </ButtonWrapper>
            </Form>
          )}
        />
        {error ? <div> Error {error} </div> : <div />}
      </Wrapper>
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

const Wrapper = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;
export const SignInButton = styled.button`
  width: 150px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #212121;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
`;
export const Error = styled.span`
  margin-top: 5px;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  color: #eb5757;
`;
