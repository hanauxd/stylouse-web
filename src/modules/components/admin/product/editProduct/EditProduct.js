import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Spinner, InputField, CustomButton } from '../../..';
import { onGetProduct, onUpdateProduct } from '../../../../api/products';
import { useCustomState } from '../../../../helpers/hooks';

import styles from './EditProduct.module.css';

const EditProduct = props => {
  const history = useHistory();

  const {
    match: {
      params: { id }
    }
  } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    product: {},
    updateError: null
  });

  useEffect(() => {
    loadProductFromApi();
    //eslint-disable-next-line
  }, []);

  const loadProductFromApi = async () => {
    try {
      const result = await onGetProduct(id);
      setState({
        loading: false,
        product: { ...result }
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      });
    }
  };

  const renderError = () => {
    return <span>{state.error}</span>;
  };

  const handleUpdateProduct = async values => {
    try {
      setState({ updateError: null });
      const token = props.auth.jwt;
      await onUpdateProduct(values, token);
      history.push('/');
    } catch (error) {
      setState({ updateError: JSON.parse(error.request.response) });
    }
  };

  const renderEditProduct = () => {
    const {
      product: { id, name, description, quantity, price, productImages }
    } = state;

    const editProductSchema = Yup.object().shape({
      name: Yup.string().required('Product name is required'),
      description: Yup.string().required('Description is required.'),
      quantity: Yup.string().required('Quantity is required.'),
      price: Yup.string().required('Price is required.')
    });

    const initialValues = {
      id,
      name,
      description,
      quantity,
      price
    };

    return (
      <div className={styles.container}>
        <div className={styles.image__div}>
          <img
            className={styles.image}
            src={`http://localhost:8080/product/images/download/${productImages[0].filename}`}
            alt='Product'
          />
        </div>
        <div className={styles.separator} />
        <div className={styles.form__div}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdateProduct}
            validationSchema={editProductSchema}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <h3>EDIT PRODUCT</h3>
                <InputField
                  label='Title'
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.name}
                />
                <InputField
                  label='Description'
                  type='text'
                  name='description'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.description}
                />
                <InputField
                  label='Price'
                  type='number'
                  name='price'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.price}
                />
                <InputField
                  label='Quantity'
                  type='number'
                  name='quantity'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.quantity}
                />
                <CustomButton gradient='purple' type='submit' text='SAVE' />
                {state.updateError && (
                  <span className={styles.error}>
                    {state.updateError.message}
                  </span>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  return state.loading ? (
    <Spinner />
  ) : state.error ? (
    renderError()
  ) : (
    renderEditProduct()
  );
};

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapPropsToState, null)(withRouter(EditProduct));
