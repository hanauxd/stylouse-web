import React from 'react';
import Moment from 'moment';

import styles from './Reply.module.css';
import { Alert, AlertTitle } from '@material-ui/lab';

const Reply = (props) => {
  const {
    reply: {
      user: { role, lastName },
      date,
      message,
    },
  } = props;

  const formatDate = (date) => {
    return Moment.utc(date)
      .local()
      .format('Do MMMM YYYY, hh:mm a');
  };
  return (
    <div className={styles.container}>
      <Alert icon={false} severity={role === 'ROLE_ADMIN' ? 'info' : 'success'}>
        <AlertTitle>
          {lastName} <div className={styles.date}>on {formatDate(date)}</div>
        </AlertTitle>

        <div>{message}</div>
      </Alert>
    </div>
  );
};

export default Reply;
