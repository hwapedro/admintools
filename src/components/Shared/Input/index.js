import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { Field, TitleInput, Label } from "./style";

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

// const CustomInput = ({
//   label,
//   placeholder,
//   invalid,
//   field: { name, value, onChange }
// }) => (
//   <Field>
//     <Label htmlFor={label}>{label}</Label>
//     <TitleInput
//       name={name}
//       value={value}
//       placeholder={placeholder}
//       onChange={onChange}
//       invalid={invalid}
//     />
//   </Field>
// );

// CustomInput.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   field: PropTypes.objectOf(
//     PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.string])
//   )
// };

// CustomInput.defaultProps = {
//   label: "",
//   placeholder: "",
//   field: {}
// };

// export default CustomInput;
