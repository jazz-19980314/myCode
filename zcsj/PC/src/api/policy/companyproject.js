import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/policy/companyproject/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

// 根据项目查询公司
export const getListByName = (current, size, params) => {
  return request({
    url: '/api/policy/companyproject/listByName',
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
    url: '/api/policy/companyproject/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/policy/companyproject/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/policy/companyproject/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/policy/companyproject/submit',
    method: 'post',
    data: row
  })
}
