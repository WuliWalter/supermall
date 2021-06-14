import axios from "axios";

export function request(config) {

  //创建axios实例
  const instance = new axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  //axios拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config=>{
    return config
  },error => {

  })
    // 2.2响应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },error => {
    console.log(error);
  })
  //3.发骚那个真正的网络请求
  return instance(config)
}
