import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/business/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/crm/business/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/business/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/business/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/business/submit',
    method: 'post',
    data: row
  })
}

export const getMenuTree = () => {
  return request({
    url: '/api/crm/business/tree',
    method: 'get'
  })
}

export const getLazyTree = (parentId,params) => {
  return request({
    url: 'api/crm/business/lazy-tree',
    method: 'get',
    params:{
      parentId,
    ...params
    }
  })
}