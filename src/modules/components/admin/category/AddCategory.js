import React, { useEffect } from 'react';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import InputField from '../../textInput/InputField';
import { useCustomState } from '../../../helpers/hooks';
import { onFetchCategories, onAddCategory } from './../../../api/category';

const AddCategory = props => {
  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    categoryError: null,
    modal: false,
    categories: [],
  });

  useEffect(() => {
    fetchCategories();
    //eslint-disable-next-line
  }, [])

  const toggle = () => {
    setState({
      modal: !state.modal,
    })
  }

  const fetchCategories = async () => {
    try {
      const result = await onFetchCategories();
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

  const renderCategories = state.categories.map(cate => {
    return (
      <MDBListGroupItem key={cate.id}>{cate.category}</MDBListGroupItem>
    )
  })

  const handleAddCategory = async category => {
    try {
      const result = await onAddCategory(category)
      console.log(result)
      setState({
        categories: [...result.data]
      })
      toggle()
    } catch (error) {
      if (error.response.status === 400) {
        setState({
          categoryError: 'Category already exist.'
        })
      }
    }
  }

  const initialValues = {
    category: '',
  }

  const addCategorySchema = Yup.object().shape({
    category: Yup.string().required('Category is required.')
  })

  return (
    <div style={{
      display: 'flex',
      width: "fitContent",
      boxShadow: '0 4px 8px 0 gray',
      padding: '3%',
      margin: '3% 30%'
    }}>
      <div style={{
        width: '30%',
      }}>
        <MDBBtn onClick={toggle}>ADD CATEGORY</MDBBtn>
        <Formik
          initialValues={initialValues}
          validationSchema={addCategorySchema}
          onSubmit={handleAddCategory}
        >
          {
            ({
              values,
              handleChange,
              handleBlur
            }) => (
                <Form>
                  <MDBModal isOpen={state.modal} toggle={toggle} centered>
                    <MDBModalHeader toggle={toggle}>ADD NEW CATEGORY</MDBModalHeader>
                    <MDBModalBody >
                      <InputField label="New category" type="text" name='category' onChange={handleChange} onBlur={handleBlur} values={values.category} />
                      <div style={{ color: 'red' }}>{state.categoryError}</div>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn type='submit' color='black'>SAVE</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </Form>
              )
          }
        </Formik>
      </div>
      <div style={{
        width: '70%',
      }}>
        <h5><strong>List of categories available</strong></h5>
        <MDBListGroup style={{ width: "100%" }}>
          {renderCategories}
        </MDBListGroup>
      </div>
    </div>
  )
}

export default AddCategory;