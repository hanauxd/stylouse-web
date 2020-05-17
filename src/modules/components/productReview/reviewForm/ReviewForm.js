import React from 'react';
import { Rating } from '@material-ui/lab';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';
import { useCustomState } from '../../../helpers/hooks';

const ReviewForm = (props) => {
  const { handleClose, handleReviewSubmit, open } = props;

  const [state, setState] = useCustomState({
    message: '',
    rate: 5,
    error: false,
  });

  const handleSubmit = () => {
    if (state.message === '' || state.rate === null) {
      setState({
        error: true,
      });
    } else {
      handleReviewSubmit({ message: state.message, rate: state.rate });
      setState({
        error: false,
        rate: 5,
        message: '',
      });
    }
  };

  const handleDialogClose = () => {
    setState({
      error: false,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Rate and Review</DialogTitle>
      <DialogContent style={{ width: '500px' }}>
        <DialogContentText>
          Rate and review this product to help improve shopping experience in
          the future.
        </DialogContentText>
        <Rating
          name='rate'
          value={state.rate}
          onChange={(event, value) => {
            setState({
              rate: value,
            });
          }}
        />
        <TextField
          autoFocus
          label='Review'
          type='text'
          fullWidth
          multiline
          variant='outlined'
          rows={3}
          value={state.message}
          onChange={(event) => {
            const value = event.target.value;
            if (value === '') {
              setState({
                error: true,
              });
            } else {
              setState({
                error: false,
              });
            }
            setState({
              message: value,
            });
          }}
        />
        {state.error ? (
          <span style={{ fontSize: '0.8rem', color: 'red' }}>
            Fields cannot be empty.
          </span>
        ) : null}
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} type='submit' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
