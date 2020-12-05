import request from '@/router/axios';

export const getSeaList = (current, size, params) => {
  return request({
    url: '/api/crm/company/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const claimCompony = (row) => {
    return request({
      url: '/api/crm/company/claim',
      method: 'post',
      data: row
    })
  }