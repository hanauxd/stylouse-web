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
import { getProductImageUrl } from '../../helpers/ProductHelper';
import { ProductReview } from '../index';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductDetail.module.css';

const ProductDetail = (props) => {
  const history = useHistory();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  });

  const {
    product: { id, name, price, quantity, description, productImages },
  } = props;

  const images = productImages.map((image) => {
    return (
      <div key={image.id}>
        <img alt='' src={getProductImageUrl(image.filename)} />
      </div>
    );
  });

  const productDetailSchema = Yup.object().shape({
    quantity: Yup.number().min(1, 'Quantity is required.'),
    size: Yup.string().required('Size is required.'),
  });

  const handleAddToCart = async (values) => {
    if (props.auth) {
      try {
        const { hide } = cogoToast.loading('Adding item to cart.', {
          hideAfter: 0,
        });
        const { size, quantity } = values;
        const token = props.auth.jwt;
        await onAddToCart({ productId: id, size, quantity }, token);
        hide();
        cogoToast.success('Item added to cart successfully.');
        history.push('/cart');
      } catch (error) {
        cogoToast.error('Failed to add item to cart.');
      }
    } else {
      history.push('/sign-in');
    }
  };

  const handleAddToWishlist = async () => {
    const { hide } = cogoToast.loading('Adding product to wishlist.', {
      hideAfter: 0,
    });
    if (props.auth) {
      try {
        const token = props.auth.jwt;
        await onAddToWishlist(id, token);
        hide();
        cogoToast.success('Product added to wishlist successfully.');
      } catch (error) {
        hide();
        const errMsg = JSON.parse(error.request.response);
        cogoToast.error(errMsg.message);
      }
    } else {
      history.push('/sign-in');
    }
  };

  const handleSignIn = () => {
    history.push('/sign-in');
  };

  const renderAuthButtons = ({ handleSubmit }) => {
    return (
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
    );
  };

  const renderSignInButton = () => {
    return (
      <div className={styles.button__div}>
        <MDBBtn
          className={styles.button}
          outline
          color='purple'
          type='button'
          onClick={handleSignIn}
        >
          SIGN IN
        </MDBBtn>
      </div>
    );
  };

  const renderProductDetail = () => {
    return (
      <div className={styles.container}>
        <div className={styles.product_details_container__div}>
          <div className={styles.image__div}>
            <Carousel>{images}</Carousel>
          </div>
          <Formik
            onSubmit={(values) => handleAddToCart(values)}
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
                {props.auth
                  ? renderAuthButtons({ handleSubmit })
                  : renderSignInButton()}
              </div>
            )}
          </Formik>
        </div>
        <div className={styles.product_review_container__div}>
          <ProductReview productId={id} />
        </div>
      </div>
    );
  };

  return renderProductDetail();
};

const mapPropsToState = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapPropsToState)(ProductDetail);
