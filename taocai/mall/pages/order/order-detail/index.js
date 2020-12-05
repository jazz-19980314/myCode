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
		orderInfo: null,
		id: null,
		callPay: false, //是否直接调起支付
		remarkInfo1: null,
		remarkInfo2: null,
		dwFile: null
	},
	onShow() {
		app.initPage()
			.then(res => {
				this.orderGet(this.data.id)
			})
	},
	onLoad(options) {
		this.setData({
			id: options.id
		})
		if (options.callPay) {
			this.setData({
				callPay: true
			})
		}
	},
	orderGet(id) {
		let that = this
		app.api.orderGet(id)
			.then(res => {
				let orderInfo = res.data
				if (!orderInfo) {
					wx.redirectTo({
						url: '/pages/order/order-list/index'
					})
				}
				this.setData({
					orderInfo: orderInfo,
					// remarkInfo1: JSON.parse(orderInfo.remarkInfo1),
					remarkInfo2: JSON.parse(orderInfo.remarkInfo2)
				})
				setTimeout(function() {
					that.setData({
						callPay: false
					})
				}, 4000)
			})
	},
	//复制内容
	copyData(e) {
		wx.setClipboardData({
			data: e.currentTarget.dataset.data
		})
	},
	download(e) {
		var imgList = []
		if (e.currentTarget.dataset.url) {
			imgList.push(e.currentTarget.dataset.url)
			wx.previewImage({
				urls: imgList,
				current: e.currentTarget.dataset.url
			});
		} else {
			wx.showToast({
				icon: 'none',
				title: '合同尚未生成请耐心等待！'
			})
		}

		// var imgList = []
		// imgList.push('https://qtvedio.oss-cn-qingdao.aliyuncs.com/f4608f87-9ce0-42bd-917b-fb7d7d8bd1b4.jpeg')
		// wx.previewImage({
		// 	urls: imgList,
		// 	current: 'https://qtvedio.oss-cn-qingdao.aliyuncs.com/f4608f87-9ce0-42bd-917b-fb7d7d8bd1b4.jpeg'
		// });
		// wx.downloadFile({
		// 		url: this.data.orderInfo.contract, 
		// 		success: (res) => {
		// 			// console.log(filePath)
		// 			if (res.statusCode === 200) {
		// 				wx.showToast({
		// 					icon:'none',
		// 					title:'合同下载成功请在手机上查看！'
		// 				})
		// 			}
		// 			let that = this;
		// 			wx.saveFile({
		// 				tempFilePath: res.tempFilePath,
		// 				success: function(red) {
		// 					that.data.dwFile = red.savedFilePath
		// 					wx.openDocument({
		// 					      filePath: that.data.dwFile,
		// 					      success: function (res) {
		// 					        // console.log('打开文档成功');
		// 					      }
		// 					    });
		// 				}
		// 			});
		// 		},
		// 		fail:(res)=>{
		// 			console.log(res)
		// 			// console.log(filePath)
		// 			wx.showToast({
		// 				icon:'none',
		// 				title:'下载失败！请联系开发人员'
		// 			})
		// 		}
		// 	});
	},
	orderCancel() {
		let id = this.data.orderInfo.id
		this.orderGet(id)
	},
	orderDel() {
		wx.navigateBack()
	},
	// wxfiedOrder() {
	//   this.onShow()
	// },
	countDownDone() {
		this.orderGet(this.data.id)
	}
})
