import React from 'react';
import { MDBBtn } from 'mdbreact';

const CustomButton = props => {
  const { type, text, onSubmit, ...rest } = props;
  return (
    <div>
      <MDBBtn block type={type} onSubmit={onSubmit} {...rest}>
        {text}
      </MDBBtn>
    </div>
  );
};

export default CustomButton;
