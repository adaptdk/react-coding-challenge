import 'isomorphic-fetch';

import { NO_DATA, BASE_API_URL } from './constants';


export function checkStatus(response) {
  if (response.ok) {
    if (response.status === 204) {
      return Promise.resolve({
        status: response.status,
        statusText: response.statusText,
      });
    }
    // Workaround for API 200 status, when 'no data' has been returned
    if (response.status === 200) {
      return response.json()
        // parsing json to get codeNumber, etc.
        .then(json => {
          if (json.codeNumber && json.codeNumber === NO_DATA) {
            return Promise.resolve({
              noData: json
            });
          }
          return Promise.resolve(json);
        })
        // if json parsing fails, return original response
        .catch(() => {
          return Promise.resolve(response);
        })
        // return either json response or original
        // response as rejected promise result
        .then(result => {
          if (result.noData) {
            return Promise.reject(result.noData);
          }
          return Promise.resolve(result);
        });
    }
    return Promise.resolve(response.json());
  }
  if (response.status === 400 
    || response.status === 409 
    || response.status === 404) {

    return response.json()
      // parsing json to get codeNumber, etc.
      .then(json => Promise.resolve(json))
      // if json parsing fails, return original error response
      .catch(() => Promise.resolve(response))
      // return either json response or original 
      // error response as rejected promise result
      .then(result => Promise.reject(result));
  }
  return Promise.reject(response);
}

export default function customFetch(url, options) {
  return fetch(`${BASE_API_URL}${url}`, options);
}

export function enhancedFetch(url, options = {}) {
  options.credentials = 'same-origin';
  options.headers = Object.assign({
    Accept: 'application/json',
  }, options.headers);
  if (typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  return customFetch(url, options).then(checkStatus);
}

export function get(url, headers) {
  return enhancedFetch(url, {
    method: 'get',
    headers,
  });
}

export function put(url, data) {
  return enhancedFetch(url, {
    method: 'put',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function post(url, data) {
  return enhancedFetch(url, {
    method: 'post',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function xform(url, data) {
  return enhancedFetch(url, {
    method: 'post',
    body: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  });
}

export function del(url) {
  return enhancedFetch(url, {
    method: 'delete',
  });
}

export function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
    return `%${c.charCodeAt(0).toString(16)}`;
  });
}

export const createQueryUrl = (obj = {}) => {
  const createItem = (k) => `${fixedEncodeURIComponent(k)}=${fixedEncodeURIComponent(obj[k])}`;
  
  return Object.keys(obj).map(createItem).join('&');
};

export const createQueryWithAmpPrefix = (obj) => {
  const queryUrl = createQueryUrl(obj);
  
  return queryUrl ? `&${queryUrl}` : '';
};