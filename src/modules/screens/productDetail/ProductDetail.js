import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useCustomState } from '../../helpers/hooks';
import { onGetProduct } from '../../api/products';
import { ProductDetail } from '../../components';

const Product = props => {
  const { match: { params: { id } } } = props;

  const [state, setState] = useCustomState({
    product: {},
    loading: true,
    error: null
  });

  useEffect(() => {
    loadProductFromApi()
    //eslint-disable-next-line
  }, [])

  const loadProductFromApi = async () => {
    try {
      setState({
        loading: true,
        error: null,
      })
      const result = await onGetProduct(id);
      setState({
        loading: false,
        product: { ...result }
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderProduct = () => {
    return <ProductDetail product={state.product} />
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderProduct();
}

export default withRouter(Product);