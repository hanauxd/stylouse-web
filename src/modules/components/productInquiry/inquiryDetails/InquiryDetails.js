import React from 'react';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';

import { onSubmitReply } from '../../../api/inquiry';
import { Reply, ReplyForm } from '../..';

const InquiryDetails = (props) => {
  const { inquiry, onNewReply } = props;

  const handleSubmitReply = async (values, { resetForm }) => {
    try {
      const token = props.auth.jwt;
      const reply = {
        productIdOrInquiryId: inquiry.id,
        message: values.reply,
      };
      const result = await onSubmitReply(token, reply);
      resetForm({});
      onNewReply(result.data);
    } catch (error) {
      if (error.request.response) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      }
    }
  };

  const replies = inquiry.replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ));

  return (
    <div>
      <ReplyForm inquiry={inquiry} onReplySubmit={handleSubmitReply} />
      {replies.reverse()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapStateToProps, null)(InquiryDetails);
