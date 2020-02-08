import React from 'react';

import styles from './ProductColor.module.css';

const ProductColor = props => {
  return (
    <div className={styles.outer__div} >
      <div className={styles.inner__div} style={{ backgroundColor: `${props.color}` }} />
    </div>
  )
}

export default ProductColor;