import React from "react";
import styled from "styled-components";

export default function Error({ name }) {
  return (
    <Wrapper>
      <ErrorMessage>
        {`something went wrong with your ${name}`}
      </ErrorMessage>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  top: 50%;
  margin-top: 340px;
  color: #e86882;
`;
