import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
}));

export default function Search({ onChange, value }) {
  const classes = useStyles();
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
    <TextField
      id="standard-bare"
      className={classes.textField}
      defaultValue="Search"
      margin="normal"
      inputProps={{ "aria-label": "bare" }}
    />
  );
}

export const Wrapper = styled.div``;

const SearchInput = styled.input`
  padding-left: 0.5rem;
  width: 48.7rem;
  height: 40px;
  border: 0.6px solid black;
  border-radius: 1rem;
  outline: none;
`;
