import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/companytarget/list',
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
    url: '/api/crm/companytarget/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/companytarget/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/companytarget/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/companytarget/submit',
    method: 'post',
    data: row
  })
}
// 所有指标分类
export const getLazyTree = (parentId) => {
  return request({
    url: 'api/crm/targetclass/lazy-tree',
    method: 'get',
    params:{
      parentId
    }
  })
}
//分类对应指标
export const getAllTarget = (currentPage,pageSize, classId) => {
  return request({
    url: '/api/crm/target/list',
    method: 'get',
    params: {
      currentPage,
      pageSize,
      classId
    }
  })
}

//公司详情
export const getCompanyDetail = (id) => {
  return request({
    url: '/api/crm/company/detail',
    method: 'get',
    params: {
      id
    }
  })
}

// 已完善指标
export const getClassIsCheck = (current,size,companyId,targetClassId) => {
  return request({
    url: '/api/crm/companytarget/getByTargetClassId',
    method: 'get',
    params: {
      current,
      size,
      companyId,
      targetClassId
    }
  })
}

//保存完善指标
export const saveAllClass = (form) => {
  return request({
    url: '/api/crm/companytarget/saveAll',
    method: 'post',
    data:form
  })
}