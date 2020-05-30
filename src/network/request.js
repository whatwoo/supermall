import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  //拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })
  instance.interceptors.response.use(res => {

    return res.data
  },err => {

  })

  //因为instance是axios实例，本身返回的就是一个Promise
  return instance(config)
}