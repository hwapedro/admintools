import React from "react";
import { connect } from "react-redux";
import { register } from "../../../store/actions/actionRegister";
import { withRouter } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ButtonWrapper, Error } from "../styleLocal";
import { Wrapper } from "../../GlobalStyles/styleGlobal";

import Input from "../../Shared/Input";
import Button from "../../Shared/Button";

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
                component={Input}
              />
              <ErrorMessage name="username" component={Error} />

              <Field
                name="password"
                label="Password"
                placeholder="Введите пароль"
                invalid={touched.password && errors.password}
                component={Input}
              />
              <ErrorMessage name="password" component={Error} />

              <Field
                name="confirmPassword"
                label="Confirm password"
                placeholder="Подтвердите пароль"
                invalid={touched.password && errors.password}
                component={Input}
              />

              <ErrorMessage name="password" component={Error} />

              <ButtonWrapper>
                <Button buttonStyle={"outlined"} type="submit">
                  SIGN UP
                </Button>
              </ButtonWrapper>

              <ButtonWrapper>
                <Button buttonStyle={"outlined"} onClick={this.toLogin}>
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
