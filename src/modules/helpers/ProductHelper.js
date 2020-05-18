export const getProductImageUrl = (image) => {
  return `${process.env.REACT_APP_BASE_URL}product/images/download/${image}`;
};
