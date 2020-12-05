import request from '@/router/axios';
export const getByPolicyId = (policyId) => {
    return request({
      url: '/api/companyPolicy/companiesByPolicyId',
      method: 'get',
      params: {
        policyId
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