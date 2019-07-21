import React from "react";
import { connect } from "react-redux";
import { register } from "../../../store/actions/actionRegister";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CustomInput from "../CustomInput";
import Button from "../../Button";

const signUpSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email("Неверный e-mail")
  //   .required("Обязательно для заполнения"),
  username: Yup.string().required("Обязательно для заполнения"),
  password: Yup.string().required("Обязательно для заполнения"),
  confirmPassword: Yup.string().required("Обязательно для заполнения")
});

class RegistrationScreen extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      this.props.history.push("/courses");
    }
  }

  setLogin = async ({ username, password }) => {
    const { register } = this.props;
    await register(username, password);
  };

  toLogin = () => {
    this.props.history.push("/");
  };

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }
    return (
      <Wrapper>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={signUpSchema}
          onSubmit={this.setLogin}
          render={({ errors, touched }) => (
            <Form autoComplete="off">
              {/* <Field
                name="e-mail"
                label="E-mail"
                placeholder="Enter email"
                invalid={touched.email && errors.email}
                component={CustomInput}
              />
              <ErrorMessage name="email" component={Error} /> */}

              <Field
                name="username"
                label="Username"
                placeholder="Введите никнейм"
                invalid={touched.username && errors.username}
                component={CustomInput}
              />
              <ErrorMessage name="username" component={Error} />

              <Field
                name="password"
                label="Password"
                placeholder="Введите пароль"
                invalid={touched.password && errors.password}
                component={CustomInput}
              />
              <ErrorMessage name="password" component={Error} />

              <Field
                name="confirmPassword"
                label="Confirm password"
                placeholder="Подтвердите пароль"
                invalid={touched.password && errors.password}
                component={CustomInput}
              />

              <ErrorMessage name="password" component={Error} />

              <ButtonWrapper>
                <Button style={"outlined"} type="submit">
                  SIGN UP
                </Button>
              </ButtonWrapper>

              <ButtonWrapper>
                <Button style={"outlined"} onClick={this.toLogin}>
                  Back
                </Button>
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
  token: state.Auth.token,
  loading: state.reducer.loading,
  error: state.reducer.error
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(register(username, password))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationScreen)
);

export const Wrapper = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
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
  background-color: ${props => props.theme.button};
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
