/*
 * @Author: Lancer
 * @Date:2019/12/19
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/19
 */

import { request } from './request'
import Qs from 'qs'

export function loginForm (data) {
  return request({
    method: 'post',
    url: '/userLogin',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function guideLogin (data) {
  return request({
    method: 'post',
    url: '/guideLogin',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
