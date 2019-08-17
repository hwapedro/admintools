import React from "react";

import { MenuButton, CurrentMenuButton } from "../styleLocal";

export default function PageNav({ amount, changePage, pageNumber }) {
  const list = amount.map((page, index) => {
    if (pageNumber === index) {
      return (
        <CurrentMenuButton key={page._id} onClick={() => changePage(index)}>
          {index + 1}
        </CurrentMenuButton>
      );
    }
    return (
      <MenuButton key={page._id} onClick={() => changePage(index)}>
        {index + 1}
      </MenuButton>
    );
  });
  return <>{list}</>;
}
