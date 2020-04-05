import React from "react";
import styled, { css } from "styled-components";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";
import { HashTagsContainer } from "./HashTagsContainer";

export const SmartContainer = ({ name, ...props }) => {
  const content = Object.keys(props).map((key, index) => {
    if (key === "exam") {
      return (
        <div key={index}>
          <LabelElement>EXAM :</LabelElement>
          {props[key] ? (
            <ImgMark src={checkMark} />
          ) : (
            <ImgCross src={redCross} />
          )}
        </div>
      );
    }
    if (key === "description") {
      return (
        <div key={index}>
          <LabelElement>{key}</LabelElement>
          <DescriptionSpan
            dangerouslySetInnerHTML={{
              __html: props[key],
            }}
          ></DescriptionSpan>
        </div>
      );
    }

    if (key === "title") {
      return (
        <div key={index}>
          <TitleSpan name={name} label={key}>
            {props[key]}
          </TitleSpan>
        </div>
      );
    }

    return (
      <div key={index}>
        <LabelElement name={name} label={key}>
          {key}
        </LabelElement>
        <TitleSpan>{props[key]}</TitleSpan>
      </div>
    );
  });

  return <>{content}</>;
};

const LabelElement = styled.label`
  display: inline-block;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
  font-weight: 600;
  font-size: 1rem;

  ${({ name, label }) => {
    switch (name) {
      case "Course":
        if (label === "title") {
          return css`
            content: none;
            background: #eee;
            color: white;
          `;
        }
        break;
      default:
        break;
    }
  }}
`;

const TitleSpan = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1rem;

  ${({ name, label }) => {
    switch (name) {
      case "Course":
        if (label === "title") {
          return css`
            font-weight: 600;
            font-size: 2rem;
          `;
        }
        break;
      default:
        break;
    }
  }}
`;

const DescriptionSpan = styled.span`
  display: block;
  margin: 1rem 0;
  font-size: 1rem;
`;

const ImgMark = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;

const ImgCross = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;
