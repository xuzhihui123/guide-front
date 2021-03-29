/*
 * @Author: Lancer
 * @Date:2020/1/2
 * @Last Modified by:   Lancer
 * @Last Modified time: 2020/1/2
 */

import { request } from './request'
// //获取轮播图

export function getBanner () {
  return request({
    method: 'get',
    url: '/getBanner'
  })
}

export function getUserList () {
  return request({
    method: 'get',
    url: '/getUser'
  })
}
