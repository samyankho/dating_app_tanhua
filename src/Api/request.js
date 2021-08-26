import axios from 'axios';
import {BASE_URI} from './api';
import Toast from '../utils/Toast';
import RootStore from '../mobx';

const instance = axios.create({
    baseURL: BASE_URI
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('before request');
    Toast.showLoading('请求中')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('before response');
    Toast.hideLoading();
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default{
    get: instance.get,
    post: instance.post,
    privatePost:(url, data={}, options={}) => {
      const token = RootStore.token;
      const headers = options.headers || {};
      return instance.post(url, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          ...headers
        }
      })
    }
}