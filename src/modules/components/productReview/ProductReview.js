import React, { useEffect } from 'react';
import { ReviewItem, Spinner } from '..';
import { connect } from 'react-redux';
import { onFetchReviewsByProduct } from '../../api/review';
import { useCustomState } from '../../helpers/hooks';

const ProductReview = (props) => {
  const { productId } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    reviews: [],
  });

  useEffect(() => {
    fetchReviewsForProduct();
    //eslint-disable-next-line
  }, []);

  const fetchReviewsForProduct = async () => {
    try {
      const result = await onFetchReviewsByProduct(productId);
      setState({
        loading: false,
        reviews: [...result.reviews],
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      });
    }
  };

  const productReviewList = state.reviews.map((review) => {
    return <ReviewItem key={review.id} review={review} />;
  });

  const renderReviews = () => {
    return (
      <div>
        <h5>Ratings and Reviews</h5>
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
