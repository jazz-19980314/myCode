/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  dialogDrag: true,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  column: [
    // {
    //   label: 'PK',
    //   prop: 'id',
    //   sortable: true,
    //   hide: true,
    //   editDisplay:false,
    //   addDisplay:false
    // },
    // {
    //   label: '所属租户',
    //   prop: 'tenantId',
    //   sortable: true,
    //   hide: true,
    //   editDisplay:false,
    //   addDisplay:false
    // },
    // {
    //   label: '父分类编号',
    //   prop: 'parentId',
    //   sortable: true,
    //   type:'tree',
    //   hide: true,
    //   editDisplay:false,
    //   addDisplay:false
    // },
    {
      label: '父分类',
      prop: 'parentId',
      type: 'tree',
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [{
        required: true,
        message: '请选择父分类',
        trigger: 'change'
      }]
    },
    {
      label: '名称',
      prop: 'name',
      sortable: true
    },
    {
      label: '描述',
      prop: 'description',
      sortable: true
    },
    {
      label: '图片',
      prop: 'picUrl',
      width: 250,
      dataType: 'array',
      slot: true,
      formslot: true,
      rules: [{
        type: 'array',
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }]
    },
    {
      label: '排序',
      prop: 'sort',
      sortable: true,
      hide: true,
      type: 'number',
      rules: [{
        required: true,
        message: '排序不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      editDisplay:false,
      addDisplay:false
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      sortable: true,
      editDisplay:false,
      addDisplay:false
    },
    {
      label: '逻辑删除标记（0：显示；1：隐藏）',
      prop: 'delFlag',
      sortable: true,
      hide: true,
      editDisplay:false,
      addDisplay:false
    },
  ],


}
