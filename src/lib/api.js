import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_HOST;
const apiPath = process.env.NEXT_PUBLIC_API_PATH;
const baseURL = `${apiUrl}${apiPath}`;

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const request = (path, { data, qs, method } = {}) => {
  return axios({
    baseURL: baseURL,
    url: path,
    params: qs,
    headers: defaultHeaders,
    method,
    data,
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      if (error.response && error.response.status === 404) return undefined;
      if (error.response && error.response.status === 504) return undefined;
      return error.response
    });
};


const api = {
  get (path, params) {
    return request(path, { method: 'get', ...params });
  },

  all (requests) {
    return Promise.all(requests);
  }
};

export default api;