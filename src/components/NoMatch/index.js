import React from "react";
import styled from "styled-components";

export const NoMatch = () => {
  return (
    <NoMatchContainer>
      <NoMatchBox>
        <NoMatchTitle>Error 404</NoMatchTitle>
        <NoMatchText>Woops. Looks like this page doesn't exist</NoMatchText>
      </NoMatchBox>
    </NoMatchContainer>
  );
};

const NoMatchContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
`;

const NoMatchBox = styled.div`
  img {
    display: block;
    border: none;
  }
`;

const NoMatchTitle = styled.div`
  font-size: 90px;
  text-align: center
  margin-bottom: 35px;
  text-transform: uppercase;
`;

const NoMatchText = styled.div`
  font-size: 20px;
  text-align: center;
`;
