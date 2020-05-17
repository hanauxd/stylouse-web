import React from 'react';
import { Rating } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';

import { formatDate } from '../../../helpers/DateFormatter';

import styles from './ReviewItem.module.css';

const ReviewItem = (props) => {
  const {
    review: {
      user: { lastName },
      message,
      rate,
      date,
    },
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.left__div}>
        <Rating readOnly size='small' defaultValue={rate} />
        <div className={styles.text}>{formatDate(date)}</div>
      </div>
      <div style={{ width: '80px' }} />
      <div className={styles.right__div}>
        <div className={styles.user}>
          <Avatar alt={`${lastName}`} src='/avatar/image.jpg' />
          <div style={{ width: '10px' }} />
          <div className={styles.text}>{`by ${lastName}`}</div>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
