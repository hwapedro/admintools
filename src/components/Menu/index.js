import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  Wrapper,
  LinkStyle,
  Title,
  LinkWrapper,
  WrapperSignOut,
} from "./styleLocal";

import * as route from "../Route/constants";

class Menu extends Component {
  render() {
    const { location } = this.props;
    console.log(route.courses === location.pathname);
    return (
      <>
        <Wrapper>
          <div>
            <Title> Admintools </Title>

            <LinkStyle to={route.courses}>
              <LinkWrapper
                isCurrentLocation={route.courses === location.pathname}
              >
                Courses
              </LinkWrapper>
            </LinkStyle>

            <LinkStyle to={route.lessons}>
              <LinkWrapper
                isCurrentLocation={route.lessons === location.pathname}
              >
                Lessons
              </LinkWrapper>
            </LinkStyle>

            <LinkStyle to={route.badges}>
              <LinkWrapper
                isCurrentLocation={route.badges === location.pathname}
              >
                Badges
              </LinkWrapper>
            </LinkStyle>

            <LinkStyle to={route.news}>
              <LinkWrapper isCurrentLocation={route.news === location.pathname}>
                News{" "}
              </LinkWrapper>
            </LinkStyle>
          </div>
          <WrapperSignOut
            onClick={() => {
              localStorage.removeItem("token");
              window.history.go("/login");
            }}
           
          ></WrapperSignOut>
        </Wrapper>
      </>
    );
  }
}

export default withRouter(Menu);
