import React from 'react';
import { Star } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

import styles from './ReviewAverage.module.css';

const ReviewAverage = (props) => {
  const { average, reviews, countMap } = props;

  const rateCount = reviews.length;

  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const renderProgressBar = (star, value) => {
    const percentage = (value / 5) * 200;
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <Star color='disabled' fontSize='small' />
        <div style={{ width: '20px', textAlign: 'center' }}>{star}</div>
        <BorderLinearProgress
          style={{ flex: 1 }}
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={percentage}
        />
        <div style={{ width: '20px', textAlign: 'center' }}>{value}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.average_container__div}>
        <div className={styles.average}>
          {Math.round((average + Number.EPSILON) * 10) / 10}
        </div>
        <Rating readOnly value={average} precision={0.1} />
        <div className={styles.count}>
          {rateCount > 0
            ? `${rateCount} product ratings`
            : 'Be the first to rate'}
        </div>
      </div>
      <div style={{ width: '114px' }} />
      <div className={styles.details_container__div}>
        {renderProgressBar(1, countMap.one)}
        {renderProgressBar(2, countMap.two)}
        {renderProgressBar(3, countMap.three)}
        {renderProgressBar(4, countMap.four)}
        {renderProgressBar(5, countMap.five)}
      </div>
    </div>
  );
};

export default ReviewAverage;
