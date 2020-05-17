import React from 'react';
import { Rating } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { formatDate } from '../../../helpers/DateFormatter';

import styles from './ReviewItem.module.css';

const ReviewItem = (props) => {
  const {
    review: {
      id,
      user: { lastName },
      message,
      rate,
      date,
    },
    userRole,
    handleRemoveReview,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.left__div}>
        <Rating readOnly size='small' defaultValue={rate} />
        <div className={styles.text}>{formatDate(date)}</div>
      </div>
      <div style={{ width: '80px' }} />
      <div className={styles.right__div}>
        <div style={{ display: 'flex' }}>
          <div className={styles.user}>
            <Avatar alt={`${lastName}`} src='/avatar/image.jpg' />
            <div style={{ width: '10px' }} />
            <div className={styles.text}>{`by ${lastName}`}</div>
          </div>
          {userRole === 'ROLE_ADMIN' ? (
            <div>
              <CloseRoundedIcon
                style={{ color: red[500] }}
                onClick={() => handleRemoveReview(id)}
              />
            </div>
          ) : null}
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
