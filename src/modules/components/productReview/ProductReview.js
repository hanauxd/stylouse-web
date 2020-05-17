import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBBtn } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { ReviewItem, ReviewAverage, Spinner, ReviewForm } from '..';
import {
  onFetchReviewsByProduct,
  onCreateReview,
  onDeleteReview,
} from '../../api/review';
import { useCustomState } from '../../helpers/hooks';

const ProductReview = (props) => {
  const { productId } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    reviews: [],
    average: 0.0,
    hasUserRated: false,
    count: null,
    open: false,
  });

  useEffect(() => {
    fetchReviewsForProduct();
    //eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setState({
      open: false,
    });
  };

  const handleClickOpen = () => {
    setState({
      open: true,
    });
  };

  const handleReviewSubmit = async (values) => {
    const { message, rate } = values;
    try {
      const review = {
        productId: productId,
        message: message,
        rate: rate,
      };
      const token = props.auth.jwt;
      const result = await onCreateReview(review, token);
      setState({
        reviews: [...result.data.reviews],
        average: result.data.average,
        count: result.data.count,
        hasUserRated: result.data.hasUserRated,
      });
    } catch (error) {
      if (error.request) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      }
    }
    handleClose();
  };

  const handleRemoveReview = async (reviewId) => {
    try {
      const token = props.auth.jwt;
      const result = await onDeleteReview(reviewId, token);
      setState({
        reviews: [...result.data.reviews],
        average: result.data.average,
        count: result.data.count,
        hasUserRated: result.data.hasUserRated,
      });
    } catch (error) {
      if (error.request) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      } else {
        cogoToast('Failed to remove the review.');
      }
    }
  };

  const fetchReviewsForProduct = async () => {
    try {
      const token = props.auth ? props.auth.jwt : null;
      const result = await onFetchReviewsByProduct(productId, token);
      setState({
        loading: false,
        reviews: [...result.reviews],
        average: result.average,
        count: result.count,
        hasUserRated: result.hasUserRated,
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      });
    }
  };

  const productReviewList = state.reviews.map((review) => {
    return (
      <ReviewItem
        key={review.id}
        review={review}
        userRole={props.auth ? props.auth.userRole : ''}
        handleRemoveReview={handleRemoveReview}
      />
    );
  });

  const renderReviews = () => {
    return (
      <div>
        <br />
        <h5>Ratings and Reviews</h5>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <ReviewAverage
              average={state.average}
              reviews={state.reviews}
              countMap={state.count}
            />
          </div>

          {props.auth &&
          props.auth.userRole === 'ROLE_USER' &&
          !state.hasUserRated ? (
            <div style={{ width: 'auto', marginLeft: '20px' }}>
              <MDBBtn
                outline
                color='orange'
                size='sm'
                onClick={handleClickOpen}
              >
                Write a review
              </MDBBtn>
              <ReviewForm
                handleClose={handleClose}
                handleReviewSubmit={handleReviewSubmit}
                open={state.open}
              />
            </div>
          ) : null}
        </div>
        <br />
        <hr />
        <br />
        {productReviewList}
      </div>
    );
  };

  const renderError = () => {
    return <div>{state.error}</div>;
  };

  return state.loading ? (
    <Spinner />
  ) : state.error ? (
    renderError()
  ) : (
    renderReviews()
  );
};

const mapPropsToState = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapPropsToState, null)(ProductReview);
