import React from 'react';

import styles from './TextInput.module.css';
import { Field, ErrorMessage } from 'formik';

const TextInput = props => {
  const { type, placeholder, name, containerStyle, inputStyle } = props;
  return (
    <div className={styles.root__div} style={containerStyle}>
      <Field name={name} type={type} placeholder={placeholder} style={inputStyle} />
      <ErrorMessage name={name}>
        {
          message => <span>{message}</span>
        }
      </ErrorMessage >
    </div>)
}

export default TextInput;