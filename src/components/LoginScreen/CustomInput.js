import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const CustomInput = ({
  label,
  placeholder,
  invalid,
  field: { name, value, onChange }
}) => (
  <Field>
    <Label htmlFor={name}>{label}</Label>
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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  :not(:first-child) {
    margin-top: 55px;
  }
`

const Input = styled.input`
  width: 600px;
  font-size: 1.2rem;
  background-color: #e8e9ee;
  border: none;
  padding: 20px;
  border-radius: 5px;
  ${props =>
    props.invalid &&
    css`
      transition: border 0.3s;
      border: 2px solid ${props => props.theme.errorColor};
    `}
  &::placeholder {
    font-size: 1.2rem;
  }
  &:focus {
    outline-color: #3f75ff;
    outline-width: 4px;
  }
`

const Label = styled.label`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 10px;
`