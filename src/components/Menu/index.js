import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import Button from "../Button";
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

const LinkStyle = {
  textDecoration: "none",
  color: "white"
};

const Wrapper = styled.div`
  padding-top: 0.2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1C2023;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  align-items: center;
  margin: 1rem 1rem 0 1rem;
  font-size: 2rem;
  color: white;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
`;

export const ButtonSignOut = styled.div`
  margin-left: auto;
  margin-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.2rem;
`;
