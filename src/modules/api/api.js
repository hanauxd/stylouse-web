import axios from 'axios';

const getEndpointUrl = endpoint => {
  return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};

export const post = (endpoint, body, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(getEndpointUrl(endpoint), body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      resolve({ data: result.data, status: result.status });
    } catch (error) {
      reject(error);
    }
  });
};

export const get = (endpoint, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(getEndpointUrl(endpoint), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const remove = (endpoint, body, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`${getEndpointUrl(endpoint)}/${body}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      resolve({ data: result.data, status: result.status });
    } catch (error) {
      reject(error);
    }
  });
};
