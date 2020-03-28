import Moment from 'moment';

export const formatDate = date => {
  return Moment(date).format('dddd, MMMM Do YYYY');
};
