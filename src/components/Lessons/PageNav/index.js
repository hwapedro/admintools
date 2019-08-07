import React from "react";

import {MenuButton} from '../styleLocal'

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

