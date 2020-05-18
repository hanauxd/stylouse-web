import { post } from './api';

export const onCreateInquiry = (inquiry, token) => {
  const endpoint = 'inquiries';
  return post(endpoint, inquiry, token);
};
