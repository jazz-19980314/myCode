import { Upload } from "element-ui"

/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
const dic = [{
    label: '产品宣传',
    value: '1'
}, {
    label: '产品知识',
    value: '2'
}]
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
    viewBtn: false,
    editBtn: true,
    column: [
        {
            label: 'PK',
            prop: 'id',
            sortable: true,
            addDisabled: true,
            addDisplay: false,
            editDisabled: true
        },
        {
            label: '宣传图片',
            prop: 'picUrls',
            span: 24,
            type: 'upload',
            listType: 'picture-card',
            limit: 3,
            dataType: 'string',
            sortable: true,
            action: '/admin/file/uploads',
            tip: '只能上传jpg/png文件，且不超过500kb',
            rules: [{
                required: true,
                message: "请上传图片",
                trigger: "blur"
            }]
            // formslot:true,
            // slot:true
        },
        {
            label: '宣传视频',
            prop: 'videoUrls',
            type: 'upload',
            listType: 'video',
            limit: 1,
            dataType: 'string',
            action: '/admin/file/uploads',
            sortable: true,
            row: true,
            span: 24,
            width: 250,
            // formslot:true,
            slot: true,
            tip: '最多可以上传1个视频，建议大小50M，推荐格式mp4',
            rules: [{
                required: false,
                message: "请上传视频",
                trigger: "blur"
            }]
        },
        {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
            addDisabled: true,
            addDisplay: false,
            editDisabled: true
        },
        {
            label: '更新时间',
            prop: 'updateTime',
            sortable: true,
            addDisabled: true,
            addDisplay: false,
            editDisabled: true
        },
        {
            label: '分类',
            prop: 'type',
            type: "cascader",
            dicData: dic,
            sortable: true,
            rules: [{
                required: true,
                message: "请选择分类",
                trigger: "blur"
            }]
        },
        {
            label: '租户id',
            prop: 'tenantId',
            sortable: true,
            addDisabled: true,
            addDisplay: false,
            editDisabled: true
        },
        {
            label: '标题',
            prop: 'linkUrls',
            sortable: true,
            rules: [{
                required: true,
                message: "请输入标题",
                trigger: "blur"
            }]
        },
        {
            label: '文本内容',
            prop: 'content',
            sortable: true,
            slot: true,
            formslot: true,
            span:18,
            rules: [{
                required: false,
                message: "请输入文本内容",
                trigger: "blur"
            }]
        },
    ]
}
