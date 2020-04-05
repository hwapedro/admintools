import React from "react";
import styled, { css } from "styled-components";

export const HashTagsContainer = (props) => {
  const content = Object.keys(props).map((key, index) => {
    // if (key === "exam") {
    //   return <div key={index}></div>;
    // }
    if (key === "course") {
      return (
        <HashTagsWrapper key={index}>
          <HashTags label={key}>
            {key} {props[key]}
          </HashTags>
        </HashTagsWrapper>
      );
    }
  });

  return <> {content} </>;
};

const HashTags = styled.div`
  ${({ name, label }) => {
    if (label === "course") {
      return css`
        font-size: 1rem;
        color: #2aa8a1;
        border: 1px solid #2aa8a1;
        border-radius: 15px;
        padding: 5px 10px;
        font-size: 1.2rem;
        bottom: 5px;
        position: absolute;
      `;
    }
  }}
`;

const HashTagsWrapper = styled.div`
  display: flex;
  justify-content: row;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;
