import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/target/list',
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
    url: '/api/crm/target/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/target/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/target/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/target/update',
    method: 'post',
    data: row
  })
}

export const getMenuTree = () => {
  return request({
    url: '/api/crm/targetclass/tree',
    method: 'get'
  })
}


export const getLazyTree = (parentId,params) => {
  return request({
    url: 'api/crm/targetclass/lazy-tree',
    method: 'get',
    params:{
      parentId,
    ...params
    }
  })
}
