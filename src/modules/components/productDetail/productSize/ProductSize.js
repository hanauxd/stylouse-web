import React from 'react';

import styles from './ProductSize.module.css';

const ProductSize = props => {
  const handleOnClick = () => {
    props.onSelect('size', props.size);
  }

  const style = props.value === props.size ? styles.productSizeSelected : styles.productSize;

  return (
    <div className={style} onClick={handleOnClick}>
      {props.size}
    </div>
  )
}

export default ProductSize;