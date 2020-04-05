import React, { Component } from "react";
import styled from "styled-components";

import Menu from "../Menu";

class Layout extends Component {
  render() {
    return (
      <Wrapper>
        <Menu />
        <ContentWrapper>{this.props.children}</ContentWrapper>
      </Wrapper>
    );
  }
}

export default Layout;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentWrapper = styled.div`
  margin: 0 auto;
`;
