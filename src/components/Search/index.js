import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const SearchInput = withStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
      fontSize: "14px"
    }
  }
})(TextField);

function Search({ onChange, value, classes }) {
  return (
    <SearchInput
      id="standard-bare"
      name="search"
      placeholder="Search"
      variant="outlined"
      value={value}
      onChange={onChange}
      style={{
        minWidth: "75%",
        width: "auto"
      }}
    />
  );
}
export default Search;

export const Wrapper = styled.div``;
