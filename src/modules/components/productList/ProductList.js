import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ProductListItem } from '../index';
import { onGetAllProducts } from './../../api/products';
import { getProducts } from './../../store/actions/products';
import { useCustomState } from '../../helpers/hooks';

import styles from './ProductList.module.css';

const ProductList = props => {

  const [state, setState] = useCustomState({
    products: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    getAllProducts()
    //eslint-disable-next-line
  }, [])

  const getAllProducts = async () => {
    try {
      setState({
        loading: true,
        error: null,
      })
      const result = await onGetAllProducts();
      setState({
        loading: false,
        products: [...result]
      })
      //  props.onLoaded(result);
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

  const renderProducts = product => {
    return (
      <ProductListItem
        key={product.id}
        src={`http://localhost:8080/product/images/download/${product.productImages[0].filename}`}
        category={product.productCategories[0].category.category}
        title={product.name}
        description={product.description}
        price={product.price}
        id={product.id}
      />
    )
  }

  const renderProductList = () => {
    const items = state.products.map(product => renderProducts(product));
    return (
      <div className={styles.container}>
        {items}
      </div>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderProductList();
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoaded: productsData => {
      dispatch(getProducts(productsData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);