import axios from 'axios';

export const post = (endpoint, body, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`http://localhost:8080/${endpoint}`, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      resolve({ data: result.data, status: result.status })
    } catch (error) {
      reject(error)
    };
  });
}

export const get = (endpoint, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`http://localhost:8080/${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export const remove = (endpoint, body, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`http://localhost:8080/${endpoint}/${body}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      resolve({ data: result.data, status: result.status })
    } catch (error) {
      reject(error)
    }
  })
}