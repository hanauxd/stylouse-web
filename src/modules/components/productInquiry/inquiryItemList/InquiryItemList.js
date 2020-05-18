import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import cogoToast from 'cogo-toast';

import { InquiryItem, Spinner } from '../..';
import { useCustomState } from '../../../helpers/hooks';
import {
  onFetchInquiriesByUser,
  onMarkReplyRead,
  onFetchAllInquiries,
} from '../../../api/inquiry';

const InquiryItemList = (props) => {
  const { type, onItemClick } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: false,
    inquiries: [],
  });

  useEffect(() => {
    fetchInquiriesForUser();
    //eslint-disable-next-line
  }, []);

  const fetchInquiriesForUser = async () => {
    try {
      const userRole = props.auth.userRole;
      const token = props.auth.jwt;
      let result;
      switch (userRole) {
        case 'ROLE_USER': {
          result = await onFetchInquiriesByUser(token);
          break;
        }
        case 'ROLE_ADMIN': {
          result = await onFetchAllInquiries(token);
          break;
        }
        default:
          break;
      }
      setState({
        loading: false,
        inquiries: [...result.inquiries],
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      });
      if (error.request.response) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      }
    }
  };

  const handleItemClick = async (inquiry) => {
    onItemClick(inquiry);
    const unreadList = inquiry.replies.filter((reply) => !reply.read);
    if (unreadList.length > 0) {
      try {
        const replyIds = unreadList.map((reply) => reply.id);
        const token = props.auth.jwt;
        const result = await onMarkReplyRead(replyIds, token);
        setState({
          inquiries: [...result.data.inquiries],
        });
      } catch (error) {
        if (error.request.response) {
          const message = JSON.parse(error.request.response).message;
          cogoToast.error(message);
        }
      }
    }
  };

  const renderError = () => {
    return <div>{state.error}</div>;
  };

  const renderInquiryList = () => {
    let inquiryList;
    if (type === 'all') {
      inquiryList = state.inquiries.map((inquiry) => {
        return (
          <InquiryItem
            key={inquiry.id}
            inquiry={inquiry}
            handleItemClick={handleItemClick}
          />
        );
      });
    }
    if (type === 'unread') {
      inquiryList = state.inquiries.map((inquiry) => {
        const unreadList = inquiry.replies.filter((reply) => {
          return !reply.read && props.auth.userRole !== reply.user.role;
        });
        return unreadList.length > 0 ? (
          <InquiryItem
            key={inquiry.id}
            inquiry={inquiry}
            handleItemClick={handleItemClick}
          />
        ) : null;
      });
    }
    return <List component='nav'>{inquiryList}</List>;
  };

  return state.loading ? (
    <Spinner />
  ) : state.error ? (
    renderError()
  ) : (
    renderInquiryList()
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapStateToProps)(InquiryItemList);
