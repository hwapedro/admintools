import React from "react";
import styled from "styled-components";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";

export const SmartContainer = ({ name, ...props }) => {
  console.log(name, props);
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
          <LabelElement>
            {name} {key} :
          </LabelElement>
          <DescriptionSpan
            dangerouslySetInnerHTML={{
              __html: props[key]
            }}
          ></DescriptionSpan>
        </div>
      );
    }

    return (
      <div key={index}>
        <LabelElement>
          {name} {key} :
        </LabelElement>
        <TitleSpan>{props[key]}</TitleSpan>
      </div>
    );
  });

  return <> {content} </>;
};

const LabelElement = styled.label`
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 900;
  font-size: 1.8rem;
`;
const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

const DescriptionSpan = styled.span`
  display: block;
  margin: 1rem 0;
  font-size: 1.3rem;
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
