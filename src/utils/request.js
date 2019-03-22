import axios from 'axios';
import Promise from 'bluebird';
const { REACT_APP_BASE_URL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// before send request
request.interceptors.request.use(
  config => {
    // if we have token
    // if (store.getters.token) {
    //   config.headers['Authorization'] = 'Bearer '
    // }
    config.headers['Content-Type'] = 'Access-Control-Allow-Headers';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// after send request
request.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default request;
