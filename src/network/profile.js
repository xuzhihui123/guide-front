/*
 * @Author: Lancer
 * @Date:2019/12/20
 * @Last Modified by:   Lancer
 * @Last Modified time: 2019/12/20
 */

import { request } from './request'
import Qs from 'qs'

// 获取头像上传到服务器返回的url
export function submitAvator (data) {
  return request({
    method: 'post',
    url: '/upload',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 跟改个人头像
export function changeUserAvator (data) {
  return request({
    method: 'post',
    url: '/updateUserAvatar',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 根据id 获取个人用户信息
export function getUserInfoById (data) {
  return request({
    method: 'post',
    url: '/getUserById',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
// 根据id获取导游信息
export function getGuideInfoById (data) {
  return request({
    method: 'post',
    url: '/getGuideById',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 获取user的标签库
export function getUserAllTags () {
  return request({
    method: 'get',
    url: '/getUserTags'
  })
}

// 获取导游得标签库
export function getGuideAllTags () {
  return request({
    method: 'get',
    url: '/getGuideTags'
  })
}

// 更新用户个人资料不包括个人说明 和 tags标签
export function updateUserProfile (data) {
  return request({
    method: 'post',
    url: '/updateUser',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
// 更新导游个人资料不包括个人说明 和 tags标签
export function updateGuideProfile (data) {
  return request({
    method: 'post',
    url: '/updateGuide',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 添加用户标签和说明
export function updateUserTextTags (data) {
  return request({
    method: 'post',
    url: '/insertProfile',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 更改 用户 密码
export function changeUserPassWord (data) {
  return request({
    method: 'post',
    url: '/updateUserPassWord',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 更改导游头像
export function changeGuideAvator (data) {
  return request({
    method: 'post',
    url: '/updateGuideAvatar',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
