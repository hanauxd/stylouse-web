import React from 'react';
import Divider from '@material-ui/core/Divider';
import { ListItem, ListItemText } from '@material-ui/core';

const InquiryItem = (props) => {
  const {
    inquiry,
    inquiry: {
      product: { name },
    },
    handleItemClick,
  } = props;

  return (
    <div>
      <ListItem button onClick={() => handleItemClick(inquiry)}>
        <ListItemText primary={`${name}`} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default InquiryItem;
