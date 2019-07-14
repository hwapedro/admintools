import React from "react";
import styled from "styled-components";

export default function PageNav({ amount, changePage }) {
  const list = amount.map((page, index) => {
    return (
      <MenuButton key={page._id} onClick={() => changePage(index)}>
        {index + 1}
      </MenuButton>
    );
  });
  return <>{list}</>;
}

const MenuButton = styled.button`
  border: none;
  background-color: white;
  margin: 0 15px;
  font-size: 18px;
`;
