import axios from 'axios';

export const post = (endpoint, body, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`http://localhost:8080/${endpoint}`, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      resolve(result.data)
    } catch (error) {
      reject(error.response.data)
    };
  });
}