/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
/**
 * <version>2.8.2</version>
 */
import __config from './config/env'
import api from './utils/api'

App({
	api: api,
	globalData: {
		thirdSession: null,
		wxUser: null
	},
	onLaunch: function() {
		//检测新版本
		this.updateManager()
		wx.getSystemInfo({
			success: e => {
				this.globalData.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				this.globalData.Custom = custom;
				this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			}
		})
		// wx.loadFontFace ({
		//   family: 'PingFangSC-Medium',
		//   source: 'url("https://www.your-server.com/PingFangSC-Medium.ttf")',
		//   success: function(){console.log('load font success')}
		// })
	},
	updateManager() {
		const updateManager = wx.getUpdateManager()
		updateManager.onUpdateReady(function() {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						updateManager.applyUpdate()
					}
				}
			})
		})
	},
	//获取购物车数量
	shoppingCartCount() {
		this.api.shoppingCartCount()
			.then(res => {
				let shoppingCartCount = res.data
				this.globalData.shoppingCartCount = shoppingCartCount + ''
				wx.setTabBarBadge({
					index: 2,
					text: this.globalData.shoppingCartCount + ''
				})
			})
	},
	//初始化，供每个页面调用 
	initPage: function() {
		let that = this
		return new Promise((resolve, reject) => {
			if (!that.globalData.thirdSession) { //无thirdSession，进行登录
				that.doLogin()
					.then(res => {
						resolve("success")
					})
			} else { //有thirdSession，说明已登录，返回初始化成功
				resolve("success")
			}
		})
	},
	doLogin() {
		wx.showLoading({
			title: '登录中',
		})
		let that = this
		return new Promise((resolve, reject) => {
			wx.login({
				success: function(res) {
					if (res.code) {
						api.login({
								jsCode: res.code
							})
							.then(res => {
								wx.hideLoading()
								let wxUser = res.data
								// console.log(res.data)
								that.globalData.thirdSession = wxUser.sessionKey
								that.globalData.wxUser = wxUser
								resolve("success")
								//获取购物车数量
								that.shoppingCartCount()
							})
					}
				}
			})
		})
	}
})
