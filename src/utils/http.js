import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://www.smilekay.com:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
  if (response.data.result === 'ok') {
    console.log("cookie = " + document.cookie)
    if (response.headers.token) {
      localStorage.setItem('token', response.headers.token)
    }
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, function (error) {
  return Promise.reject(error)
})

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params
    ).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err)
    })
  });
}
