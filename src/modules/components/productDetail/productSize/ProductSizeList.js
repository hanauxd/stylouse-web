import React from 'react';

import { ProductSize } from "../index";

import styles from './ProductSize.module.css';
import { ErrorMessage } from 'formik';

const ProductSizeList = props => {
  return (
    <div>
      <div className={styles.productSizeList}>
        <ProductSize size="S" onSelect={props.onSelect} value={props.value} />
        <ProductSize size="M" onSelect={props.onSelect} value={props.value} />
        <ProductSize size="L" onSelect={props.onSelect} value={props.value} />
        <ProductSize size="XL" onSelect={props.onSelect} value={props.value} />
      </div>
      <ErrorMessage name={props.name}>
        {
          message => <span className={styles.error}>{message}</span>
        }
      </ErrorMessage >
    </div>
  )
}

export default ProductSizeList;