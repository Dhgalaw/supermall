import axios from 'axios'

//第四种   终极
export function request(config) {
  //创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://106.54.54.237:8000/api/hy',
    // baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 5000
  })
  //发送真正的网络请求
  return instance(config)  //instance本身就是一个promise
}
