import { post, get } from './api';

export const onCreateInquiry = (inquiry, token) => {
  const endpoint = 'inquiries';
  return post(endpoint, inquiry, token);
};

export const onFetchInquiriesByUser = (token) => {
  const endpoint = 'inquiries/user';
  return get(endpoint, token);
};

export const onMarkReplyRead = (replyIds, token) => {
  const endpoint = 'replies/read';
  return post(endpoint, replyIds, token);
};

export const onFetchAllInquiries = (token) => {
  const endpoint = 'inquiries/all';
  return get(endpoint, token);
};

export const onSubmitReply = (token, reply) => {
  const endpoint = 'replies';
  return post(endpoint, reply, token);
};
