import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem
} from 'mdbreact';

import InputField from '../../textInput/InputField';
import { useCustomState } from '../../../helpers/hooks';
import { onFetchCategories, onAddCategory } from './../../../api/category';

const AddCategory = props => {
  const [state, setState] = useCustomState({
    error: null,
    modal: false,
    categories: []
  });

  useEffect(() => {
    fetchCategories();
    //eslint-disable-next-line
  }, []);

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  const fetchCategories = async () => {
    const { hide } = cogoToast.loading('Fethching categories.', {
      hideAfter: 0
    });
    try {
      const token = props.auth.jwt;
      const result = await onFetchCategories(token);
      hide();
      setState({
        categories: [...result]
      });
    } catch (error) {
      hide();
      cogoToast.error('Failed to fetch categories.');
      setState({
        error: error.message
      });
    }
  };

  const renderCategories = state.categories.map(cate => {
    return <MDBListGroupItem key={cate.id}>{cate.category}</MDBListGroupItem>;
  });

  const handleAddCategory = async category => {
    const { hide } = cogoToast.loading('Adding category.', { hideAfter: 0 });
    try {
      const token = props.auth.jwt;
      const result = await onAddCategory(category, token);
      hide();
      cogoToast.success('Category added successfully.');
      setState({
        categories: [...result.data]
      });
      toggle();
    } catch (error) {
      hide();
      cogoToast.error('Failed to add category.');
    }
  };

  const initialValues = {
    category: ''
  };

  const addCategorySchema = Yup.object().shape({
    category: Yup.string().required('Category is required.')
  });

  return (
    <div
      style={{
        display: 'flex',
        width: 'fitContent',
        padding: '3%',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '0'
        }}
      >
        <MDBModal isOpen={state.modal} toggle={toggle} centered>
          <Formik
            initialValues={initialValues}
            validationSchema={addCategorySchema}
            onSubmit={handleAddCategory}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <MDBModalHeader toggle={toggle}>
                  ADD NEW CATEGORY
                </MDBModalHeader>
                <MDBModalBody>
                  <InputField
                    label='New category'
                    type='text'
                    name='category'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.category}
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn type='submit' gradient='purple'>
                    SAVE
                  </MDBBtn>
                </MDBModalFooter>
              </Form>
            )}
          </Formik>
        </MDBModal>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 4px 8px 0 gray',
          padding: '3%'
        }}
      >
        <h5 style={{ textAlign: 'center' }}>
          <strong>List of categories available</strong>
        </h5>
        <MDBBtn
          style={{ marginBottom: '10px' }}
          block
          gradient='purple'
          onClick={toggle}
        >
          ADD CATEGORY
        </MDBBtn>
        <MDBListGroup style={{ width: '100%' }}>
          {renderCategories}
        </MDBListGroup>
      </div>
    </div>
  );
};

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapPropsToState)(AddCategory);
