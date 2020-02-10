import React from 'react';
import { MDBBtn } from 'mdbreact';

const CustomButton = props => {
  const { color = "default", type, text, onSubmit } = props;
  return (
    <div>
      <MDBBtn color={color} block type={type} onSubmit={onSubmit}>{text}</MDBBtn>
    </div>
  )
}

export default CustomButton;