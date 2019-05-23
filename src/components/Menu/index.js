import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import * as route from "../Route/constants";

class Menu extends Component {
  render() {
    return (
      <>
        <Wrapper>
          <Title> Admintools </Title>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.courses}>
              <LinkButton>Courses</LinkButton>
            </Link>
          </ButtonWrapper>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.lessons}>
              <LinkButton>Lessons</LinkButton>
            </Link>
          </ButtonWrapper>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.badges}>
              <LinkButton>Badges</LinkButton>
            </Link>
          </ButtonWrapper>

          <ButtonWrapper>
            <Link style={LinkStyle} to={route.news}>
              <LinkButton>News</LinkButton>
            </Link>
          </ButtonWrapper>

          <ButtonSignOut>
            <LinkButton
              onClick={() => {
                localStorage.removeItem("token");
                this.props.history.push('/')
              }}
            >
              Sign out
            </LinkButton>
          </ButtonSignOut>
        </Wrapper>
      </>
    );
  }
}

export default withRouter(Menu);

const LinkStyle = {
  textDecoration: "none",
  color: "white"
};

const Wrapper = styled.div`
  padding-top: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => props.theme.menu};
  // box-shadow: 0px 4px 10px rgba(194, 194, 194, 0.1);
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin: 2rem 1rem 0 1rem;
  font-size: 2rem;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
export const LinkButton = styled.button`
  width: 100px;
  height: 40px;
  border: 0;
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
export const ButtonSignOut = styled.div`
  margin-left: auto;
  margin-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
`;
