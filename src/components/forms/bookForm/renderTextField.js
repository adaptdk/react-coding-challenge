import React from 'react'
import TextField from 'material-ui/TextField'

const renderTextField = ({input, label, meta: {touched, error }, ...custom}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input} {...custom}
    errorStyle={{float: "left"}}
    style={{marginRight: '15px'}}
  />
)

export default renderTextField
