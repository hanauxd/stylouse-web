import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './TextInput.module.css';

const TextInput = props => {
  const { type, placeholder, name, containerStyle } = props;
  return (
    <div >
      <div className={styles.root__div} style={containerStyle}>
        <Field name={name} type={type} placeholder={placeholder} className='form-control mb-4' required={props.required} />
      </div>
      <ErrorMessage name={name}>
        {
          message => <div style={{ color: 'red' }}>{message}</div>
        }
      </ErrorMessage >
    </div>)
}

export default TextInput;