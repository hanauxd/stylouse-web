import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as Yup from 'yup';

import styles from './ProductDetail.module.css';
import { ProductColor, ProductSizeList, NumberInput } from "./index";
import { MDBBtn } from 'mdbreact';
import { Formik } from 'formik';
import { onAddToCart } from './../../api/cart';

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
    console.log(values);
    try {
      const { size, quantity } = values;
      const { data } = await onAddToCart({ productId: id, size, quantity });
      console.log(data);
    } catch (error) {
      console.log(error.message)
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
          initialValues={{ quantity: 0, size: '' }} validationSchema={productDetailSchema}>
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
              <label className={styles.decorate}>Quantity</label>
              <NumberInput name='quantity' stock={quantity} onSelect={setFieldValue} value={values.quantity} />
              <div className={styles.button__div}>
                <MDBBtn color='black' onClick={handleSubmit}>ADD TO CART</MDBBtn>
                <MDBBtn color='black' type="button">ADD TO WISHLIST</MDBBtn>
              </div>
            </div>
          }
        </Formik>
      </div >
    );
  }

  return renderProductDetail();
}

export default ProductDetail;