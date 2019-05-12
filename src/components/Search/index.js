import React from "react";
import styled from "styled-components";

export default function Search({ onChange, value }) {
  return (
    <Wrapper>
      <input type="text" name="search" value={value} onChange={onChange} />
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
