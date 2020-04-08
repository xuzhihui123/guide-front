/*
 * @Author: Lancer
 * @Date:2020/2/19
 * @Last Modified by:   Lancer
 * @Last Modified time: 2020/2/19
 */
import {request} from "network/request";

//获取当地地址
export function getAddress() {
  return request({
    method:'get',
    url:'/getAddrJson',
  })
}


//导游开启接单
export function guideReceiveOrder(guide_id) {
  return request({
    method:'get',
    url:'/starOrderReceive',
    params:{
      guide_id
    }
  })
}
//导游关闭接单
export function guideStopReceiveOrder(guide_id) {
  return request({
    method:'get',
    url:'/stopOrderReceive',
    params:{
      guide_id
    }
  })
}



//用户传入地点搜索附近导游
export function getOnlineGuide(params) {
  return request({
    method:'get',
    url:'/getOnlineGuide',
    params
  })
}


//用户选择导游 默认创建订单
export function selectGuideAndCreateOrder(params) {
  return request({
    method:'get',
    url:'/selectGuideAndCreateOrder',
    params
  })
}


//用户支付  默认付款
export function userPay(user_id) {
  return request({
    method:'get',
    url:'/userPay',
    params:{
      user_id
    }
  })
}

//传入用户提的意见 订单完成
export function orderOpinion(params) {
  return request({
    method:'get',
    url:'/OrderOpinion',
    params
  })
}


//获取正在进行中的订单
export function getOngoingOrder(params) {
  return request({
    method:'get',
    url:'/getOngoingOrder',
    params
  })
}
//获取用户或导游已经完成的订单
export function getAlreadyOrder(params) {
  return request({
    method:'get',
    url:'/getAlreadyOrder',
    params
  })
}



//用户取消订单
export function orderFinish({user_id,cause}) {
  return request({
    method:'get',
    url:'/orderFinish',
    params:{
      user_id,
      cause
    }
  })
}


//根据orderid获取单个订单信息
export function getSingleOrderById(orderId) {
  return request({
    method:'get',
    url:'/getOrderById',
    params:{
      orderId
    }
  })
}


