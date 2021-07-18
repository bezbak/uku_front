import Cookies from "js-cookie";
import isEmpty from 'lodash/isEmpty';
import { stringify } from 'query-string';
import config from '../config';


const HTTP_INTERNAL_SERVER_ERROR_CODE = 500;

const checkStatus = (response) => {
  if (response.ok) return response;

  if (response.status >= HTTP_INTERNAL_SERVER_ERROR_CODE) {
    return {
      throwError: true,
      json: {
        detail:
          'Ошибка на сервере! Если ошибка не исчезнет в ближайшее время - обратитесь к администратору',
      },
    };
  }

  return response.json().then((json) => ({
    json,
    throwError: true,
  }));
};

const checkException = (response) => {
  if (response.throwError === true) {
    const errorMessage = Object.keys(response.json).map((key) => response.json[key]);
    const error = new Error(errorMessage);
    error.error = response.json;
    throw error;
  }
  return response;
};


const isFormDataRequest = (data) => data instanceof FormData;

const parseSettings = ({ method, data, headers,token, ...otherParams } = {} ) => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${Cookies.get("token") ? Cookies.get("token") :'' }` ,
    },
    method,
    body: JSON.stringify(data),
  };
};

const parseEndpoint = (path, qs) => {
  const query = qs ? `?${stringify(qs)}` : '';
  return `${config.apiUrl}${path}${query}`;
};

const contentTypeResponseMapping = {
  'application/zip': true,
  'application/ms-excel': true,
};

const parseJSON = (response) => {
  const contentType = response.headers.get('content-type');
  if (isEmpty(contentType)) return response;
  if (contentTypeResponseMapping[contentType]) return response;
  return response.json();
};

const request = (path, { qs, ...params } = {}) =>
  fetch(parseEndpoint(path, qs), parseSettings(params))
    .then(checkStatus)
    .then(checkException)
    .then(parseJSON);

const api = {
  post(path, params) {
    return request(path, { method: 'POST', ...params });
  },

  get(path, params) {
    return request(path, { method: 'GET', ...params });
  },

  put(path, params) {
    return request(path, { method: 'PUT', ...params });
  },

  patch(path, params) {
    return request(path, { method: 'PATCH', ...params });
  },

  delete(path, params) {
    return request(path, { method: 'DELETE', ...params });
  },
};

export default api;
