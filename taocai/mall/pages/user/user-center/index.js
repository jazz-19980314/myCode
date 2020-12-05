/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
const app = getApp()

Page({
	data: {
		wxUser: null,
		userInfo: null,
		orderCountAll: [],
		firstOrderList: [], //最新订单
		newwuliuOrder: [], //最新发货订单
		user: '1111',
		srcHeight: '',
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
	},
	onShow() {
		const res = wx.getSystemInfoSync()
		this.setData({
			srcHeight: res
		})
		this.srcHeight = res.screenHeight
		//更新tabbar购物车数量
		wx.setTabBarBadge({
			index: 2,
			text: app.globalData.shoppingCartCount + ''
		})

		let wxUser = app.globalData.wxUser
		this.setData({
			wxUser: wxUser
		})
		this.userInfoGet()
		this.orderCountAll()
		// this.getPhoneNumber()
	},
	onLoad() {
		// console.log(this.data.wxUser)
		this.orderPage()
		this.wuiiOrderList()
	},
	getPhoneNumber(e) {
		console.log(e)
		// console.log(e.detail.errMsg)
		// console.log(e.detail.iv)
		// console.log(e.detail.encryptedData)
	},
	//客服电话
	tels() {
		wx.makePhoneCall({
			phoneNumber: '15205692881',
		})
	},
	orderPage() {
		app.api.orderPage().then(res => {
			this.setData({
				firstOrderList: res.data.records[0]
			})
			// console.log(this.data.firstOrderList)
		})
	},
	wuiiOrderList() {
		app.api.orderPage({
			status: 2,
			size: 1
		}).then(res => {
			this.setData({
				newwuliuOrder: res.data.records[0]
			})
		})
	},
	orderLogistics() { //物流信息
		// console.log(this.data.newwuliuOrder)
		wx.navigateTo({
			url: '/pages/order/order-logistics/index?id=' + this.data.newwuliuOrder.orderLogistics.id
		})
	},
	/**
	 * 小程序设置
	 */
	settings: function() {
		wx.openSetting({
			success: function(res) {
				// console.log(res.authSetting)
			}
		})
	},
	// 获取授权信息
	agreeGetUser(e) {
		if (e.detail.errMsg == 'getUserInfo:ok') {
			app.api.wxUserSave(e.detail)
				.then(res => {
					// console.log(res.data)
					let wxUser = res.data
					this.setData({
						wxUser: wxUser
					})
					app.globalData.wxUser = wxUser
					this.userInfoGet()
				})
		}
	},
	//获取商城用户信息
	userInfoGet() {
		app.api.userInfoGet()
			.then(res => {
				// console.log(res.data)
				this.setData({
					userInfo: res.data
				})
			})
	},
	orderCountAll() {
		app.api.orderCountAll()
			.then(res => {
				// console.log(res.data)
				this.setData({
					orderCountAll: res.data
				})
				// console.log(this.data.orderCountAll)
			})
	}
})
