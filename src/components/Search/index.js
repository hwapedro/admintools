import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  field: {
    width: "82%"
  }
};

const SearchInput = withStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "15px 14px"
    }
  }
})(TextField);

function Search({ onChange, value, classes }) {
  return (
    // <Wrapper>
    //   <SearchInput
    //     type="text"
    //     name="search"
    //     value={value}
    //     onChange={onChange}
    //     placeholder="search"
    //     autocomplete="off"
    //   />
    // </Wrapper>
    <SearchInput
      id="standard-bare"
      name="search"
      className={classes.field}
      placeholder="Search"
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
}
export default withStyles(styles)(Search);

export const Wrapper = styled.div``;

