import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as Yup from 'yup';

import { ProductColor, ProductSizeList, NumberInput } from "./index";
import { MDBBtn } from 'mdbreact';
import { Formik } from 'formik';
import { onAddToCart } from './../../api/cart';

import styles from './ProductDetail.module.css';
import { onAddToWishlist } from '../../api/wishlist';

const ProductDetail = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  })

  const { product: { id, name, price, quantity, description, productImages } } = props;

  const images = productImages.map(
    image => {
      return (
        <div key={image.id}>
          <img alt='' src={`http://localhost:8080/product/images/download/${image.filename}`} />
        </div>
      )
    }
  );

  const productDetailSchema = Yup.object().shape({
    quantity: Yup.number().min(1, "Quantity is required."),
    size: Yup.string().required("Size is required.")
  });

  const handleAddToCart = async values => {
    try {
      const { size, quantity } = values;
      const token = props.auth.jwt;
      await onAddToCart({ productId: id, size, quantity }, token);
    } catch (error) {
      console.log(error.message)
    }
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

  const renderProductDetail = () => {
    return (
      <div className={styles.container}>
        <div className={styles.image__div}>
          <Carousel>
            {images}
          </Carousel>
        </div>
        <Formik
          onSubmit={values => handleAddToCart(values)}
          initialValues={{ quantity: 0, size: '' }}
          validationSchema={productDetailSchema}>
          {({ setFieldValue, values, handleSubmit }) =>
            <div className={styles.detail__div}>
              <div className={[styles.decorate, styles.title].join(' ')}>{name}</div>
              <div className={[styles.decorate, styles.price].join(' ')}>{formatter.format(price)}</div>
              <div className={styles.decorate}>{description}</div>
              <label className={styles.decorate}>Color</label>
              <div className={[styles.color__div].join(' ')}>
                <ProductColor color="black" />
                <ProductColor color="white" />
              </div>
              <label className={styles.decorate}>Size</label>
              <ProductSizeList name='size' className={styles.decorate} onSelect={setFieldValue} value={values.size} />
              <label className={styles.decorate}>{quantity > 0 ? <span>Quantity</span> : <span>Out of Stock</span>}</label>
              <NumberInput name='quantity' stock={quantity} onSelect={setFieldValue} value={values.quantity} />
              <div className={styles.button__div}>
                <MDBBtn disabled={quantity <= 0} color='black' onClick={handleSubmit}>ADD TO CART</MDBBtn>
                <MDBBtn color='black' type="button" onClick={handleAddToWishlist}>ADD TO WISHLIST</MDBBtn>
              </div>
            </div>
          }
        </Formik>
      </div >
    );
  }

  return renderProductDetail();
}

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapPropsToState)(ProductDetail);