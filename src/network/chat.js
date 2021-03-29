import { request } from './request'

export function insertMsg (params) {
  return request({
    method: 'get',
    url: '/insertMsg',
    params
  })
}

export function getMsgByUserId (params) {
  return request({
    method: 'get',
    url: '/getMsgByUserId',
    params
  })
}

export function chatList (userId) {
  return request({
    method: 'get',
    url: '/getChatList',
    params: {
      userId
    }
  })
}
