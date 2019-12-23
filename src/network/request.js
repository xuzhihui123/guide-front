/*
 * @Author: Lancer
 * @Date:2019/12/17
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/17
 */

import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://172.20.10.5:8081'
  })
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return error
  })
  instance.interceptors.response.use(response => {
    return response.data
  }, error => {
    return error
  })
  return instance(config)
}