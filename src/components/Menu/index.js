import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import {Wrapper, LinkStyle, Title, ButtonWrapper, ButtonSignOut} from "./styleLocal"
import Button from "../Shared/Button";
import * as route from "../Route/constants";

class Menu extends Component {
  render() {
    return (
      <>
        <Wrapper>
          <Title> Admintools </Title>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.courses}>
              <Button buttonStyle={"text"} color={'white'}>Courses</Button>
            </Link>
          </ButtonWrapper>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.lessons}>
              <Button buttonStyle={"text"} color={'white'} >Lessons</Button>
            </Link>
          </ButtonWrapper>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.badges}>
              <Button buttonStyle={"text"} color={'white'}>Badges</Button>
            </Link>
          </ButtonWrapper>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.news}>
              <Button buttonStyle={"text"} color={'white'}>News</Button>
            </Link>
          </ButtonWrapper>

          <ButtonSignOut>
            <Button
              buttonStyle={"text"}
              color={'white'}
              onClick={() => {
                localStorage.removeItem("token");
                this.props.history.push("/");
              }}
            >
              Sign out
            </Button>
          </ButtonSignOut>
        </Wrapper>
      </>
    );
  }
}

export default withRouter(Menu);

// const LinkStyle = {
//   textDecoration: "none",
//   color: "white"
// };
