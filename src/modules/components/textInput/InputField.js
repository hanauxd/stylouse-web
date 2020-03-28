import React from 'react';
import { MDBInput } from 'mdbreact';
import { ErrorMessage } from 'formik';

import './InputField.css';

const InputField = props => {
  const { label, name, type, values, onChange, onBlur } = props;

  const msgStyle = {
    color: 'red',
    fontSize: '0.6rem',
    marginBottom: '8px'
  };

  return (
    <div style={{ border: '1px solid white' }}>
      <MDBInput
        label={label}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={values}
      />
      <ErrorMessage name={name}>
        {message => <div style={msgStyle}>{message}</div>}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
