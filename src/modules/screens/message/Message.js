import React from 'react';
import { connect } from 'react-redux';

import { Menu } from '../index';
import { InquiryItemList, InquiryDetails } from '../../components';
import { useCustomState } from '../../helpers/hooks';

import styles from './Message.module.css';

const Message = (props) => {
  const [state, setState] = useCustomState({
    inquiryType: 'all',
    selectedInquiry: null,
  });

  const handleMenuClick = (value) => {
    setState({
      inquiryType: value,
    });
  };

  const handleItemClick = (values) => {
    setState({
      selectedInquiry: values,
    });
  };

  const handleNewReply = (values) => {
    setState({
      selectedInquiry: values,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu__div}>
        <Menu handleClick={handleMenuClick} />
      </div>
      <div className={styles.divider} />
      <div className={styles.inquiry_list__div}>
        <InquiryItemList
          type={state.inquiryType}
          onItemClick={handleItemClick}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.inquiry_details__div}>
        {state.selectedInquiry ? (
          <InquiryDetails
            inquiry={state.selectedInquiry}
            onNewReply={handleNewReply}
          />
        ) : (
          <div className={styles.empty_details__div}>
            Select an item to read
          </div>
        )}
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapPropsToState, null)(Message);
