import React, { useEffect } from 'react';

import { ProductListItem, Spinner } from '../index';
import { onGetAllProducts } from './../../api/products';
import { useCustomState } from '../../helpers/hooks';

import styles from './ProductList.module.css';

const ProductList = props => {
  const [state, setState] = useCustomState({
    products: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    fetchAllProducts();
    //eslint-disable-next-line
  }, []);

  const fetchAllProducts = async () => {
    try {
      setState({
        loading: true,
        error: null
      });
      const result = await onGetAllProducts();
      setState({
        loading: false,
        products: [...result]
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      });
    }
  };

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderError = () => {
    return <h2>{state.error}</h2>;
  };

  const renderProducts = product => {
    return <ProductListItem key={product.id} product={product} />;
  };

  const renderProductList = () => {
    const items = state.products.map(product => renderProducts(product));
    return <div className={styles.container}>{items}</div>;
  };

  return state.loading
    ? renderLoading()
    : state.error
    ? renderError()
    : renderProductList();
};

export default ProductList;
