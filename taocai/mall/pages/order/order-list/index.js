/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
const util = require('../../../utils/util.js')
const app = getApp()

Page({
  data: {
    tabCur: 0,
	TabCur: 0,
	CustomBar: app.globalData.CustomBar,
	StatusBar: app.globalData.StatusBar,
	scrollLeft:0,
    orderStatus: [
      {
        value: '全部订单',
        key: ''
      },
	  {
	    value: '询价中',
	    key: '0'
	  }, {
	    value: '待付款',
	    key: '8'
	  },
      // {
      //   value: '待付款',
      //   key: '0'
      // }, 
	  {
        value: '待发货',
        key: '1'
      }, {
        value: '待收货',
        key: '2'
      }, {
        value: '待评价',
        key: '4'
      }
    ],
    page: {
      searchCount: false,
      current: 1,
      size: 10,
      ascs: '',//升序字段
      descs: 'create_time'
    },
    parameter: {},
    loadmore: true,
    orderList: []
  },
  onShow() {
    
  },
  onLoad: function (options) {
    let that = this
	if(options.status == '2'){
		this.setData({
			 scrollLeft: 70,
		})
	}
	if(options.status == '4'){
		this.setData({
			 scrollLeft: 140,
		})
	}
    if (options.status) {
      this.setData({
        ['parameter.status']: options.status
      })
      this.data.orderStatus.forEach(function (status, index) {
        if (status.key == options.status){
          that.setData({
            tabCur: index
          })
        }
      })
    }
    app.initPage()
      .then(res => {
        this.orderPage()
      })
	
  },
  orderPage() {
    app.api.orderPage(Object.assign(
      {},
      this.data.page,
      util.filterForm(this.data.parameter)
    ))
      .then(res => {
        let orderList = res.data.records
        this.setData({
          orderList: [...this.data.orderList, ...orderList]
        })
		// console.log(this.data.orderList)
        if (orderList.length < this.data.page.size) {
          this.setData({
            loadmore: false
          })
        }
      })
  },
  searchHandle(e) {
	 var orderNo = {
		 orderNo:e.detail.value
	 }
    app.api.orderPage(Object.assign(
      {},
	  orderNo,
      this.data.page,
      util.filterForm(this.data.parameter)
    ))
      .then(res => {
        let orderList = res.data.records
        this.setData({
          orderList: res.data.records
        })
    	// console.log(this.data.orderList)
        if (orderList.length < this.data.page.size) {
          this.setData({
            loadmore: false
          })
        }
      })
  },
  onReachBottom() {
    if (this.data.loadmore) {
      this.setData({
        ['page.current']: this.data.page.current + 1
      })
      this.orderPage()
    }
  },
  refresh(){
    this.setData({
      loadmore: true,
      orderList: [],
      ['page.current']: 1
    })
    this.orderPage()
  },
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading()
    this.refresh()
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading()
    // 停止下拉动作
    wx.stopPullDownRefresh()
  },
  tabSelect(e) {
	  // this.setData({
	  //   TabCur: e.currentTarget.dataset.id,
	  //   scrollLeft: (e.currentTarget.dataset.id-1)*60
	  // })
    let dataset = e.currentTarget.dataset
    if (dataset.index != this.data.tabCur){
      this.setData({
        tabCur: dataset.index,
        ['parameter.status']: dataset.key,
		 scrollLeft: (dataset.index-1)*70,
      })
      this.refresh()
    }
  },
  orderCancel(e) {
    let index = e.target.dataset.index
    let orderList = this.data.orderList
    app.api.orderGet(orderList[index].id)
      .then(res => {
        this.data.orderList[index] = res.data
        this.setData({
          orderList: this.data.orderList
        })
      })
  },
  orderDel(e) {
    let index = e.target.dataset.index
    this.data.orderList.splice(index, 1)
    this.setData({
      orderList: this.data.orderList
    })
  },
  unifiedOrder(e) {
    let index = e.target.dataset.index
    let orderList = this.data.orderList
    app.api.orderGet(orderList[index].id)
      .then(res => {
        this.data.orderList[index] = res.data
        this.setData({
          orderList: this.data.orderList
        })
      })
  }
})