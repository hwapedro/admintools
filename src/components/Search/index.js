import React from "react";
import styled from "styled-components";

export default function Search({ onChange, value }) {
  return (
    <Wrapper>
      <SearchInput
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder='search'
        autocomplete="off"
      />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  
`;

const SearchInput = styled.input`
  padding-left: 0.5rem;
  width: 48.7rem;
  height: 40px;
  border: 1px solid black;
  border-radius: 1rem;
  outline: none;
`;
