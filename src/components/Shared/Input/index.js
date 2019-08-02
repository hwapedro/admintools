import React from "react";
import PropTypes from "prop-types";

import { Field, TitleInput, Label } from "./style";

const CustomInput = ({
  label,
  placeholder,
  invalid,
  field: { name, value, onChange }
}) => (
  <Field>
    <Label htmlFor={label}>{label}</Label>
    <TitleInput
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      invalid={invalid}
    />
  </Field>
);

CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.string])
  )
};

CustomInput.defaultProps = {
  label: "",
  placeholder: "",
  field: {}
};

export default CustomInput;
