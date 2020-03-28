import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './TextInput.module.css';

const TextInput = props => {
  const { type, placeholder, name } = props;
  return (
    <div>
      <div>
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className='form-control'
          required={props.required}
        />
      </div>
      <ErrorMessage name={name}>
        {message => <span className={styles.error}>{message}</span>}
      </ErrorMessage>
    </div>
  );
};

export default TextInput;
