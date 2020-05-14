import React from 'react';

import styles from './Spinner.module.css';

const Spinner = () => (
  <div style={{ margin: '15% auto' }} className={styles.Loader}>
    Loading...
  </div>
);

export default Spinner;
