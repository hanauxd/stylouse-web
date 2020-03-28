import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';
import { MDBBtn } from 'mdbreact';

import { onAddToCart } from './../../api/cart';
import { ProductColor, ProductSizeList, NumberInput } from './index';
import { onAddToWishlist } from '../../api/wishlist';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductDetail.module.css';

const ProductDetail = props => {
  const history = useHistory();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  });

  const {
    product: { id, name, price, quantity, description, productImages }
  } = props;

  const images = productImages.map(image => {
    return (
      <div key={image.id}>
        <img
          alt=''
          src={`http://localhost:8080/product/images/download/${image.filename}`}
        />
      </div>
    );
  });

  const productDetailSchema = Yup.object().shape({
    quantity: Yup.number().min(1, 'Quantity is required.'),
    size: Yup.string().required('Size is required.')
  });

  const handleAddToCart = async values => {
    if (props.auth) {
      try {
        const { size, quantity } = values;
        const token = props.auth.jwt;
        await onAddToCart({ productId: id, size, quantity }, token);
        history.push('/cart');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      history.push('/sign-in');
    }
  };

  const handleAddToWishlist = async () => {
    if (props.auth) {
      try {
        const token = props.auth.jwt;
        await onAddToWishlist(id, token);
        history.push('/');
      } catch (error) {
        const errMsg = JSON.parse(error.request.response);
        cogoToast.error(errMsg.message);
      }
    } else {
      history.push('/sign-in');
    }
  };

  const renderProductDetail = () => {
    return (
      <div className={styles.container}>
        <div className={styles.image__div}>
          <Carousel>{images}</Carousel>
        </div>
        <Formik
          onSubmit={values => handleAddToCart(values)}
          initialValues={{ quantity: 0, size: '' }}
          validationSchema={productDetailSchema}
        >
          {({ setFieldValue, values, handleSubmit }) => (
            <div className={styles.detail__div}>
              <div className={[styles.decorate, styles.title].join(' ')}>
                {name}
              </div>
              <div className={[styles.decorate, styles.price].join(' ')}>
                {formatter.format(price)}
              </div>
              <div className={styles.decorate}>{description}</div>
              <label className={styles.decorate}>COLORS</label>
              <div className={[styles.color__div].join(' ')}>
                <ProductColor color='black' />
                <ProductColor color='white' />
              </div>
              <label className={styles.decorate}>SIZES</label>
              <ProductSizeList
                name='size'
                className={styles.decorate}
                onSelect={setFieldValue}
                value={values.size}
              />
              <label className={styles.decorate}>
                {quantity > 0 ? (
                  <span>QUANTITY</span>
                ) : (
                  <span>OUT OF STOCK</span>
                )}
              </label>
              <NumberInput
                name='quantity'
                stock={quantity}
                onSelect={setFieldValue}
                value={values.quantity}
              />
              <div className={styles.button__div}>
                <MDBBtn
                  className={styles.button}
                  disabled={quantity <= 0}
                  outline
                  color='purple'
                  onClick={handleSubmit}
                >
                  ADD TO CART
                </MDBBtn>
                <MDBBtn
                  className={styles.button}
                  gradient='purple'
                  type='button'
                  onClick={handleAddToWishlist}
                >
                  ADD TO WISHLIST
                </MDBBtn>
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
  };

  return renderProductDetail();
};

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapPropsToState)(ProductDetail);
