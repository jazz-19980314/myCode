/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/mall/orderinfo/page',
    method: 'get',
    params: query
  })
}

export function getCount(query) {
  return request({
    url: '/mall/orderinfo/count',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mall/orderinfo',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/mall/orderinfo/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/mall/orderinfo/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  console.log(obj);
  return request({
    url: '/mall/orderinfo',
    method: 'put',
    data: obj
  })
}

export function editPrice(obj) {
  return request({
    url: '/mall/orderinfo/editPrice',
    method: 'put',
    data: obj
  })
}

export function orderCancel(id) {
  return request({
    url: '/mall/orderinfo/cancel/' + id,
    method: 'put'
  })
}

export function takeGoods(id) {
  return request({
    url: '/mall/orderinfo/takegoods/' + id,
    method: 'put'
  })
}
//报价详情
export function getOneObj(id) {
  return request({
    url: `/mall/orderitem/page?orderId=${id}`,
    method: 'get'
  })
}
// 立即报价
export function questionPrice(obj) {
  return request({
    url: '/mall/orderitem/saveAll',
    method: 'post',
    data: obj
  })
}
// 资金结算
export function getMoneyDeclre(orderNo) {
  return request({
    url: `/mall/historicalsettlement/page?orderNo=${orderNo}`,
    method: 'get'
  })
}
// 确认结款 
export function puthistoryment(obj) {
  return request({
    url: '/mall/historicalsettlement',
    method: 'put',
    data: obj
  })
}
//全额结清
export function declreAll(orderNo) {
  return request({
    url: `/mall/orderinfo/settleComplete?orderNo=${orderNo}`,
    method: 'get'
  })
}