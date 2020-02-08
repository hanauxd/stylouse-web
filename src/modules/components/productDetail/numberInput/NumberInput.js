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

// class NumberInput extends Component {
//   state = {
//     value: 0
//   }

//   decrease = () => {
//     if (this.state.value > 0) {
//       this.setState({ value: this.state.value - 1 });
//     }
//   }

//   increase = () => {
//     this.setState({ value: this.state.value + 1 });
//   }

//   render() {
//     return (
//       <div className={styles.container}>
//         <button onClick={this.decrease} className={styles.minus}><MDBIcon icon="minus" /></button>
//         <input className={styles.input} value={this.state.value}
//           type="number" />
//         <button onClick={this.increase} className={styles.plus}><MDBIcon icon="plus" /></button>
//       </div>
//     );
//   }
// }

export default NumberInput;