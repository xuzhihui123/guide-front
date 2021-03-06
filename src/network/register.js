/*
 * @Author: Lancer
 * @Date:2019/12/18
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/18
 */

import { request } from './request'
import Qs from 'qs'

export function registerForm (data) {
  return request(
    {
      method: 'post',
      url: '/insertUser',
      data,
      transformRequest: [function (data) {
        data = Qs.stringify(data)
        return data
      }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )
}

// 注册导游
export function registerGuideForm (data) {
  return request(
    {
      method: 'post',
      url: '/insertGuide',
      data,
      transformRequest: [function (data) {
        data = Qs.stringify(data)
        return data
      }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )
}
