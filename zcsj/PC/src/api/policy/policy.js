import request from '@/router/axios';

export const getData = (current, size, params) => {
  return request({
    url: '/api/policy/policy/list',
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
    url: '/api/policy/policy/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/policy/policy/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/policy/policy/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/policy/policy/update',
    method: 'post',
    data: row
  })
}

export const getByPolicyId = (policyId) => {
  return request({
    url: '/api/companyPolicy/companiesByPolicyId',
    method: 'get',
    params: {
      policyId
    }
  })
}

