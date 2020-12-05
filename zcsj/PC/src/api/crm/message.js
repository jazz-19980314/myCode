import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/message/list',
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
    url: '/api/crm/message/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/message/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/message/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/message/submit',
    method: 'post',
    data: row
  })
}

export const getNoticeList = (current, size, params) => {
  return request({
    url: '/api/blade-desk/notice/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const updateNotice = (row) => {
  return request({
    url: '/api/blade-desk/notice/submit',
    method: 'post',
    data: row
  })
}

