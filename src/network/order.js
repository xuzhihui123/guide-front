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
    url:'/getAddr',
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

//用户传入地点搜索附近导游
export function userCreateOrders(params) {
  return request({
    method:'get',
    url:'/createOrder',
    params
  })
}
