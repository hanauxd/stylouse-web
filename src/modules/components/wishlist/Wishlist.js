import React, { useEffect } from 'react';
import { MDBIcon, MDBBtn } from 'mdbreact';

import { Spinner } from '../index';
import { useCustomState } from './../../helpers/hooks';
import { onFetchWishlist, onRemoveWishlist } from '../../api/wishlist';
import ProductListItem from '../productListItem/ProductListItem';

import classes from './Wishlist.module.css';

const Wishlist = props => {
  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    wishlist: []
  });

  useEffect(() => {
    fetchWishlist();
    //eslint-disable-next-line
  }, []);

  const fetchWishlist = async () => {
    try {
      const result = await onFetchWishlist(props.token);
      setState({
        loading: false,
        wishlist: [...result]
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      });
    }
  };

  const handleRemoveWishlist = async id => {
    try {
      const result = await onRemoveWishlist(id, props.token);
      setState({
        wishlist: [...result.data]
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderError = () => {
    return <h1>{state.error}</h1>;
  };

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderWishlist = () => {
    const products = state.wishlist.map(item => {
      const { id, product } = item;
      return (
        <div className={classes.wrapper} key={id}>
          <MDBBtn
            className={classes.remove__icon}
            size='sm'
            gradient='purple'
            onClick={() => {
              handleRemoveWishlist(id);
            }}
          >
            <MDBIcon icon='times' size='1x' />
          </MDBBtn>
          <ProductListItem product={product} />
        </div>
      );
    });
    return (
      <div className={classes.container}>
        <div className={classes.styles}>{products}</div>
      </div>
    );
  };

  return state.loading
    ? renderLoading()
    : state.error
    ? renderError()
    : renderWishlist();
};

export default Wishlist;
