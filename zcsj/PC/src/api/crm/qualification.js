import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/qualification/list',
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
    url: '/api/crm/qualification/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/qualification/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/qualification/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/qualification/submit',
    method: 'post',
    data: row
  })
}

export const getMenuTree = () => {
  return request({
    url: '/api/crm/qualification/tree?parentId=0',
    method: 'get'
  })
}

export const getLazyTree = (parentId,params) => {
  return request({
    url: 'api/crm/qualification/lazy-list',
    method: 'get',
    params:{
        parentId,
    ...params
    }
  })
}