import React, { useEffect } from 'react';
import { onFetchWishlist } from '../../api/wishlist';
import { useCustomState } from './../../helpers/hooks';
import ProductListItem from '../productListItem/ProductListItem';

const Wishlist = props => {
  const styles = {
    display: "flex",
    flexFlow: "row wrap",
    margin: "0 10%"
  }

  const container = {
    display: 'flex',
    flexFlow: 'column',
    overflowY: 'scroll',
    height: '50vh',
    margin: '2%'
  }

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    wishlist: []
  })

  useEffect(() => {
    fetchWishlist();
    //eslint-disable-next-line
  }, [])

  const fetchWishlist = async () => {
    try {
      const result = await onFetchWishlist();
      console.log('[WISHLIST RESULT]', result)
      setState({
        loading: false,
        wishlist: [...result]
      })
    } catch (error) {
      console.log(error)
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const renderError = () => {
    return <h1>{state.error}</h1>
  }

  const renderLoading = () => {
    return <h1>Loading...</h1>
  }

  const renderWishlist = () => {
    const products = state.wishlist.map(item => {
      return <ProductListItem key={item.id} product={item.product} />
    }
    )
    return <div style={container}> <div style={styles}>{products}</div></div>
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderWishlist()
}

export default Wishlist;