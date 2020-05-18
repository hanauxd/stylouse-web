import React from 'react';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';

import { InquiryForm } from '..';
import { useCustomState } from '../../helpers/hooks';
import { onCreateInquiry } from '../../api/inquiry';

const ProductInquiry = (props) => {
  const { productId } = props;
  const [state, setState] = useCustomState({
    inquiryDialogOpen: false,
  });

  const handleInquiryDialogOpen = () => {
    setState({
      inquiryDialogOpen: true,
    });
  };

  const handleInquiryDialogClose = () => {
    setState({
      inquiryDialogOpen: false,
    });
  };

  const handleInquirySubmit = async (values) => {
    try {
      const inquiry = {
        productIdOrInquiryId: productId,
        message: values.inquiry,
      };
      const token = props.auth.jwt;
      await onCreateInquiry(inquiry, token);
    } catch (error) {
      if (error.request) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      }
    }
    handleInquiryDialogClose();
  };

  return (
    <div>
      <div onClick={handleInquiryDialogOpen}>Have a question?</div>
      <InquiryForm
        handleClose={handleInquiryDialogClose}
        handleInquirySubmit={handleInquirySubmit}
        open={state.inquiryDialogOpen}
      />
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapPropsToState, null)(ProductInquiry);
