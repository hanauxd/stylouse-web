import React from 'react';

const CustomButton = props => {
  const { type, text, onSubmit } = props;
  return (
    <div>
      <button type={type} onSubmit={onSubmit}>{text}</button>
    </div>
  )
}

export default CustomButton;