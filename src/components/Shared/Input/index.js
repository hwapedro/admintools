import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { Field, Label } from "./style";

const CustomInput = withStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
      fontSize: "14px",
      backgroundColor: 'white'
    }
  }
})(TextField);

export default function Input({ onChange, name, value, label, placeholder, required }) {
  return (
    <Field>
      <Label htmlFor={label}>{label}</Label>
      <CustomInput
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="outlined"
        style={{
          backgroundColor: "eee",
          width: "auto"
        }}
      />
    </Field>
  );
}


CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func
};

CustomInput.defaultProps = {
  name: "",
  value: "",
  label: "",
  placeholder: "",
  required: false,
};
