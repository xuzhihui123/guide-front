import { request } from './request'
import Qs from 'qs'

// 获取所有问题
export function getAllRequesitons () {
  return request({
    method: 'get',
    url: '/getQuestionDTOs'
  })
}

// 根据问题id获取该问题的所有信息
export function getQuestionById (questionId) {
  return request({
    method: 'get',
    url: '/getQuestionById',
    params: {
      questionId
    }
  })
}

// 发表评论
export function postComment (data) {
  return request({
    method: 'post',
    url: '/insertComment',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 根据问题点赞
export function insertQuestionDz (questionId) {
  return request({
    method: 'get',
    url: '/incQuestionLike',
    params: {
      questionId
    }
  })
}

// 发布问题

export function postQuestion (data) {
  return request({
    method: 'post',
    url: '/publishQuestion',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 搜索问题
export function selectQuestions (params) {
  return request({
    method: 'get',
    url: '/selectQuestions',
    params
  })
}
