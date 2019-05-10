import React from "react";

export default function PageNav({ amount, changePage }) {
  console.log(amount,changePage);
  const list = amount.map((page, index) => {
    return (
      <button key={page._id} onClick={()=>changePage(index)}>
        {index + 1}
      </button>
    );
  });
  return <>{list}</>;
}
