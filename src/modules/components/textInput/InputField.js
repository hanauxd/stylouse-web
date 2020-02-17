import React from 'react';
import { MDBInput } from 'mdbreact';
import { ErrorMessage } from 'formik';

const InputField = props => {
  const { label, name, type, values, onChange, onBlur } = props;

  return (
    <div className="form-group">
      <MDBInput label={label} type={type} name={name} onChange={onChange} onBlur={onBlur} value={values.name} />
      <ErrorMessage name={name}>
        {
          message => <div style={{ color: 'red' }}>{message}</div>
        }
      </ErrorMessage >
    </div>
  )
}

export default InputField;