import React from "react";

import styles from "./NumberInput.module.css";
import { MDBIcon } from 'mdbreact';
import { ErrorMessage } from 'formik';

const NumberInput = props => {

  const decrease = () => {
    props.onSelect('quantity', props.value - 1);
  }

  const increase = () => {
    props.onSelect('quantity', props.value + 1);
  }

  return (
    <div>
      <div className={styles.container}>
        <button type="button" onClick={decrease} disabled={props.value < 1} className={styles.button__div}>
          <MDBIcon icon="minus" className={styles.button} />
        </button>
        <input className={styles.input} value={props.value} onChange={() => { }} type="text" disabled />
        <button type="button" onClick={increase} disabled={props.value >= props.stock} className={styles.button__div}>
          <MDBIcon icon="plus" className={styles.button} />
        </button>
      </div>
      <ErrorMessage name={props.name}>
        {
          message => <span className={styles.error}>{message}</span>
        }
      </ErrorMessage >
    </div>
  )
}

export default NumberInput;