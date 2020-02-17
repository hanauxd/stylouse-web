import React, { useEffect } from 'react';
import { Form as FileForm, DropZone } from 'react-formik-ui';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useCustomState } from './../../../helpers/hooks';
import { onFetchCategories } from './../../../api/category';
import { onAddProduct } from '../../../api/products';
import InputField from '../../textInput/InputField';
import CustomButton from '../../customButton/CustomButton';

import styles from './AddProduct.module.css';
import { connect } from 'react-redux';
import { Spinner } from '../..';

const AddProduct = props => {
  const optionStyle = {
    border: 'none',
    borderBottom: '1px solid #cccccc',
    borderRadius: '0',
    margin: '2% 0',
    color: '#676767',
    fontWeight: '350',
    paddingLeft: '0'
  }

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    categories: []
  })

  useEffect(() => {
    fetchCategories();
    //eslint-disable-next-line
  }, [])

  const fetchCategories = async () => {
    try {
      const token = props.auth.jwt;
      const result = await onFetchCategories(token);
      setState({
        loading: false,
        categories: [...result]
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const renderLoading = () => {
    return <Spinner />
  }

  const renderError = () => {
    return <h1>{state.error}</h1>
  }

  const categories = state.categories.map(cate => {
    return (
      <option key={cate.id} value={cate.category} >{cate.category}</option>
    )
  })

  const handleAddProduct = async values => {
    try {
      const product = {
        name: values.name,
        description: values.description,
        quantity: values.quantity,
        price: values.price,
        "categories": [values.category]
      }
      const files = values.files;
      const token = props.auth.jwt;
      const result = await onAddProduct(product, files, token);
      console.log(result)
    } catch (error) {
      console.log(error)
      setState({
        loading: false,
        error: error.meesage
      })
    }
  }

  const initialValues = {
    name: '',
    description: '',
    quantity: '',
    price: '',
    category: '',
    files: [],
  }

  const addProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required.'),
    quantity: Yup.string().required('Quantity is required.'),
    price: Yup.string().required('Price is required.'),
    category: Yup.string().required('Select a category.'),
    files: Yup.array().required('File(s) required.')
  })

  const renderAddProduct = () => (
    <div className={styles.container}>
      <span className={styles.title}>Add New Product</span>
      <div className={styles.inner__container}>
        <Formik
          initialValues={initialValues}
          validationSchema={addProductSchema}
          onSubmit={(values, errors) => handleAddProduct(values, errors)}
        >
          {
            ({
              values,
              handleChange,
              handleBlur,
            }) => (
                <Form>
                  <InputField label="Title" type="text" name='name' onChange={handleChange} onBlur={handleBlur} values={values.name} />
                  <InputField label="Description" type="text" name='description' onChange={handleChange} onBlur={handleBlur} values={values.name} />
                  <InputField label="Quantity" type="number" name='quantity' onChange={handleChange} onBlur={handleBlur} values={values.name} />
                  <InputField label="Price" type="number" name='price' onChange={handleChange} onBlur={handleBlur} values={values.name} />
                  <select style={optionStyle} name="category" onChange={handleChange} onBlur={handleBlur} className="browser-default custom-select">
                    <option value="">Select a category</option>
                    {categories}
                  </select>
                  <ErrorMessage name='category'>
                    {
                      message => <div style={{ color: 'red' }}>{message}</div>
                    }
                  </ErrorMessage >
                  <div style={{ margin: '3% 0' }}>
                    <FileForm>
                      <DropZone lable='Upload images' name='files' placeholder="Browse or drag and drop the images here." withClearButton />
                    </FileForm>
                  </div>
                  <CustomButton color='elegant' type='submit' text='SAVE' />
                </Form>
              )
          }
        </Formik>
      </div>
    </div>
  )

  return state.loading ? renderLoading() : state.error ? renderError() : renderAddProduct();

}

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapPropsToState)(AddProduct);