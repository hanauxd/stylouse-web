import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBIcon } from 'mdbreact';

import { onAddToWishlist } from '../../api/wishlist';

import styles from './ProductListItem.module.css';

const ProductListItem = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  })

  const history = useHistory();
  const { product: { id, name, price, } } = props;
  const src = `http://localhost:8080/product/images/download/${props.product.productImages[0].filename}`;
  const category = props.product.productCategories[0].category.category;

  const handleViewProduct = () => {
    history.push(`/products/${id}`)
  }

  const handleAddToWishlist = async () => {
    try {
      const token = props.auth.jwt;
      await onAddToWishlist(id, token);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Item already exist in your wishlist.")
      }
    }
  }

  return (
    <div className={styles.product}>
      <MDBCard className=" z-depth-1-half">
        <div className="view zoom" onClick={handleViewProduct}>
          <MDBCardImage
            style={{ width: "18rem", height: `${18 / (525 / 668)}rem` }}
            className="img-fluid"
            src={src}
            waves />
        </div>
        <MDBCardBody className="text-center">
          <h5 className="grey-text">
            {category}
          </h5>
          <MDBCardTitle>
            <strong>
              <Link style={{ color: 'teal' }} to={`/products/${id}`}>{name}</Link>
            </strong>
          </MDBCardTitle>
          <hr />
          <div className="px-1">
            <span className="float-left font-weight-bold">
              <strong>{formatter.format(price)}</strong>
            </span>
            <span className="float-right">
              <MDBIcon className={styles.icon} icon="fa fa-heart ml-3" onClick={handleAddToWishlist} />
              <MDBIcon className={styles.icon} icon="fa fa-shopping-cart ml-3" onClick={handleViewProduct} />
            </span>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapPropsToState)(ProductListItem);