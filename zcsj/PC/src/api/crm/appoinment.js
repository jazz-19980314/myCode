import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/appoinment/list',
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
    url: '/api/crm/appoinment/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/appoinment/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/appoinment/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/appoinment/submit',
    method: 'post',
    data: row
  })
}

