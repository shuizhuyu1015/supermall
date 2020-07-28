import axios from 'axios';

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/mn',
    timeout: 5000
  });

  // 2.axios拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    // 1.可以在这里添加header或默认参数
    // 2.可以发送网络请求时添加菊花图标
    // 3.某些请求（比如登录token），必须携带一些特殊信息，如不满足做处理
    return config;
  }, error => {
    console.log(error);
  });
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    console.log(res.config.url, res.config.params, res.config.data);
    console.log(res.data);
    return res.data;
  }, error => {
    console.log(error);
  });

  // 3.发送真正的网络请求
  return instance(config);
}
