import React from "react";
import { connect } from "react-redux";
import { login } from "../../../store/actions/actionLogin";
import { withRouter } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  FormWrapper,
  ButtonWrapper,
  Error
} from "../styleLocal";
import { Wrapper } from "../../GlobalStyles/styleGlobal";

import CustomInput from "../../Shared/Input";
import Button from "../../Shared/Button";

const signInSchema = Yup.object().shape({
  username: Yup.string().required("Обязательно для заполнения"),
  password: Yup.string().required("Обязательно для заполнения")
});

class LoginScreen extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      this.props.history.push("/courses");
    }
  }

  setLogin = async ({ username, password }) => {
    const { login } = this.props;
    await login(username, password);
  };

  toRegister = () => {
    this.props.history.push("/register");
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
            <FormWrapper>
              <Form autoComplete="off">
                <Field
                  name="username"
                  label="username"
                  placeholder="Введите никнейм"
                  invalid={touched.username && errors.username}
                  component={CustomInput}
                />
                <ErrorMessage name="username" component={Error} />

                <Field
                  name="password"
                  label="password"
                  placeholder="Введите пароль"
                  invalid={touched.password && errors.password}
                  component={CustomInput}
                />
                <ErrorMessage name="password" component={Error} />

                  <ButtonWrapper>
                    <Button buttonStyle={"outlined"} type="submit">
                      SIGN IN
                    </Button>
                  </ButtonWrapper>

                  <ButtonWrapper>
                    <Button buttonStyle={"outlined"} onClick={this.toRegister}>
                      Not registered yet? Sign up now!
                    </Button>
                  </ButtonWrapper>
              </Form>
            </FormWrapper>
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
  login: (username, password) => dispatch(login(username, password))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen)
);
