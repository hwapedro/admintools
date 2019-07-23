import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField';
import {Field, Input, Label} from "./style"

const CustomInput = ({
  label,
  placeholder,
  invalid,
  field: { name, value, onChange }
}) => (
  <Field>
    <Label htmlFor={name}>{label}</Label>
    {/* <TextField
        id="outlined-bare"
        defaultValue="Bare"
        margin="normal"
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      /> */}
    <Input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      invalid={invalid}
    />
  </Field>
)

CustomInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.string])
  )
}

CustomInput.defaultProps = {
  label: '',
  placeholder: '',
  field: {}
}

export default CustomInput