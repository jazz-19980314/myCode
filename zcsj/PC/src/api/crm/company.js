import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/crm/company/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (params) => {
  return request({
    url: '/api/crm/company/detail',
    method: 'get',
    params: {
      ...params
    }
  })
}

//判断公司是否存在
export const getisExist = (params) => {
  return request({
    url: '/api/crm/company/isExist',
    method: 'get',
    params: {
      ...params
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/crm/company/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/crm/company/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/crm/company/submit',
    method: 'post',
    data: row
  })
}

// 客户来源
export const getSource = () => {
  return request({
    url: '/api/crm/company/source',
    method: 'get'
  })
}

//添加公司
export const saveCompony = (row) => {
  return request({
    url: '/api/crm/company/save',
    method: 'post',
    data: row
  })
}

export const updataCompony = (row) => {
  return request({
    url: '/api/crm/company/update',
    method: 'post',
    data: row
  })
}

// 反查出父级地区
export const getRegionDetail = (code) => {
  return request({
    url: '/api//blade-system/region/detail',
    method: 'get',
    params:{
      code
    }
  })
}

//联系人
export const getContactsList = (current, size, params) => {
  return request({
    url: '/api/crm/contacts/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

//沟通记录
export const getCommunicateList = (current, size, params) => {
  return request({
    url: '/api/crm/communicate/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getContactsDetail = (id) => {
  return request({
    url: '/api/crm/contacts/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const removeContacts = (ids) => {
  return request({
    url: '/api/crm/contacts/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const addContacts = (row) => {
  return request({
    url: '/api/crm/contacts/save',
    method: 'post',
    data: row
  })
}

export const updateContacts = (row) => {
  return request({
    url: '/api/crm/contacts/update',
    method: 'post',
    data: row
  })
}

//公司级别字典
export const companyGrade = (code) => {
  return request({
    url: '/api/blade-system/dict/dictionary',
    method: 'get',
    params:{
      code
    }
  })
}

//意向项目
export const companyProjects = (companyId) => {
  return request({
    url: '/api/crm/intentionprojects/detail',
    method: 'get',
    params:{
      companyId
    }
  })
}
export const submitProjects = (row) => {
  return request({
    url: '/api/crm/intentionprojects/submit',
    method: 'post',
    data:row
  })
}

//新建沟通
export const addCommunicate= (row) => {
  return request({
    url: '/api/crm/communicate/save',
    method: 'post',
    data: row
  })
}

//新增约见
export const addAppointment = (row) => {
  return request({
    url: '/api/crm/appoinment/save',
    method: 'post',
    data: row
  })
}

//获取公司资质标签
export const getQualification = (companyId,size) => {
  return request({
    url: '/api/crm/companyqualification/list',
    method: 'get',
    params:{
      companyId,
      size
    }
  })
}

// 检索资质标签
export const searchQualification = (beginTime,endTime,name) => {
  return request({
    url: '/api/crm/qualification/query',
    method: 'get',
    params:{
      beginTime,
      endTime,
      name,
    }
  })
}

//保存资质标签
export const saveAllQualification = (data) => {
  return request({
    url: '/api/crm/companyqualification/submitAll',
    method: 'post',
    data: data
  })
}

//获取虚拟符合数
export const getVirtualNum = (companyId) => {
  return request({
    url: '/api/companyPolicy/policiesByCompanyId',
    method: 'get',
    params: {
      companyId
    }
  })
}

//公司荣誉
export const getCompanyproject = (companyId,size) => {
  return request({
    url: '/api/policy/companyproject/list',
    method: 'get',
    params: {
      companyId,
      size
    }
  })
}
