/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
const app = getApp()

Component({
	properties: {
		orderInfo: {
			type: Object,
			value: {}
		},
		callPay: {
			type: Boolean,
			value: false
		},
		contact: {
			type: Boolean,
			value: false
		}
	},
	data: {
		loading: false,
		modalName: null,
		hitCount: null,
		imgList: [],
		payment: '',
		changeimges: [], //上传图片
		picUrl: [],
		reason:'',
		showtextarea:true,
	},
	ready() {
		let that = this
		setTimeout(function() {
			if (that.data.callPay) {
				that.unifiedOrder()
			}
		}, 1000)
	},
	methods: {
		orderReceive() {
			let that = this
			wx.showModal({
				content: '是否确认收货吗？',
				cancelText: '我再想想',
				confirmColor: '#ff0000',
				success(res) {
					if (res.confirm) {
						let id = that.data.orderInfo.id
						app.api.orderReceive(id)
							.then(res => {
								that.triggerEvent('orderReceive', res)
							})
					}
				}
			})
		},
		orderCancel() {
			let that = this
			wx.showModal({
				content: '确认取消该订单吗？',
				cancelText: '我再想想',
				confirmColor: '#ff0000',
				success(res) {
					if (res.confirm) {
						let id = that.data.orderInfo.id
						app.api.orderCancel(id)
							.then(res => {
								that.triggerEvent('orderCancel', res)
							})
					}
				}
			})
		},
		orderDel() {
			let that = this
			wx.showModal({
				content: '确认删除该订单吗？',
				cancelText: '我再想想',
				confirmColor: '#ff0000',
				success(res) {
					if (res.confirm) {
						let id = that.data.orderInfo.id
						app.api.orderDel(id)
							.then(res => {
								that.triggerEvent('orderDel', res)
							})
					}
				}
			})
		},

		hideModal(e) {
			this.setData({
				modalName: null,
				payment: '',
				imgList: []
			})
		},
		payment(e) {
			this.setData({
				payment: e.detail.value
			})
		},
		saveReason(e){
			this.setData({
				reason: e.detail.value,
				showtextarea:false
			})
		},
		conversation1(e){
			this.setData({
				showtextarea:true
			})
		},
		confirm(e) {
			if (this.data.payment == '') {
				wx.showToast({
					icon: "none",
					title: "请输入打款金额"
				})
			} else {
				if (this.data.imgList.length == 0) {
					let hitCount = {}
					hitCount.orderNo = this.data.orderInfo.orderNo
					hitCount.payPrice = this.data.payment
					hitCount.reason = this.data.reason
					app.api.putorderPay(hitCount).then(res => {
						if (res.ok) {
							wx.showToast({
								icon: "none",
								title: "付款成功！"
							})
							this.setData({
								modalName: null,
								payment: '',
								imgList: []
							})
							if(this.data.hitCount.length == 0){
								app.api.createContarct(this.data.orderInfo.orderNo).then(res=>{
									console.log(res.data)
								})
							}
						} else {
							wx.showToast({
								icon: "none",
								title: "提交失败！"
							})
						}
					})
				} else {
					for (var index = 0; index < this.data.imgList.length; index++) {
						wx.uploadFile({
							url: 'https://mall.program66.com/mall/api/ma/orderinfo//uploads',
							filePath: this.data.imgList[index],
							header: {
								'app-id': wx.getAccountInfoSync().miniProgram.appId,
								'third-session': getApp().globalData.thirdSession != null ? getApp().globalData.thirdSession : ''
							},
							name: 'file',
							success: (res) => {
								var cc = JSON.parse(res.data)
								this.data.changeimges = this.data.changeimges.concat(cc.link)
							},
							complete: () => {
								var c = Number(index)
								if (c == this.data.imgList.length && this.data.changeimges.length == c) {
									let hitCount = {}
									hitCount.orderNo = this.data.orderInfo.orderNo
									hitCount.payPrice = this.data.payment
									hitCount.picUrl = JSON.stringify(this.data.changeimges)
									hitCount.reason = this.data.reason
									if (this.data.payment != '') {
										app.api.putorderPay(hitCount).then(res => {
											if (res.ok) {
												wx.showToast({
													icon: "none",
													title: "付款成功！"
												})
												this.setData({
													modalName: null,
													payment: '',
													imgList: []
												})
												if(this.data.hitCount.length == 0){
													app.api.createContarct(this.data.orderInfo.orderNo).then(res=>{
														console.log(res.data)
													})
												}
											} else {
												wx.showToast({
													icon: "none",
													title: "提交失败！"
												})
											}
										})
									}
								}
							}
						});
					}
				}
			}
		},
		unifiedOrder(e) {
			this.setData({
				modalName: e.currentTarget.dataset.target,
			})
			// this.setData({
			//   loading: true
			// })
			var that = this
			let orderInfo = this.data.orderInfo
			app.api.orderPay({
				orderNo: orderInfo.orderNo
			}).then(res => {
				res.data.records.forEach(item => {
					item.picUrl = JSON.parse(item.picUrl)
				})
				this.setData({
					hitCount: res.data.records,
				})
			})
			// wx.navigateTo({
			//  url:"/pages/order/order-pay/index"
			// })
			// app.api.unifiedOrder({
			//   id: orderInfo.id
			// })
			//   .then(res => {
			//     this.setData({
			//       loading: false
			//     })
			//     if (orderInfo.paymentPrice <= 0){//0元付款
			//       that.triggerEvent('unifiedOrder', res)
			//     }else{
			//       let payData = res.data
			//       wx.requestPayment({
			//         'timeStamp': payData.timeStamp,
			//         'nonceStr': payData.nonceStr,
			//         'package': payData.packageValue,
			//         'signType': payData.signType,
			//         'paySign': payData.paySign,
			//         'success': function (res) {
			//           that.triggerEvent('unifiedOrder', res)
			//         },
			//         'fail': function (res) {

			//         },
			//         'complete': function (res) {
			//           console.log(res)
			//         }
			//       })
			//     }
			//   }).catch(() => {
			//     this.setData({
			//       loading: false
			//     })
			//   })
		},
		ChooseImage() {
			wx.chooseImage({
				count: 2, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: (res) => {
					if (this.data.imgList.length != 0) {
						this.setData({
							imgList: this.data.imgList.concat(res.tempFilePaths)
						})
					} else {
						this.setData({
							imgList: res.tempFilePaths
						})
					}
					// this.setData({
					//  imgList: res.tempFilePaths
					// })
				}
			});
		},
		ViewImages(e) {
			var imgList = []
			imgList.push(e.currentTarget.dataset.url)
			wx.previewImage({
				urls: imgList,
				current: e.currentTarget.dataset.url
			});
		},
		ViewImage(e) {
			wx.previewImage({
				urls: this.data.picUrl,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			wx.showModal({
				title: '你好',
				content: '确定要删除这张图片吗？',
				cancelText: '再看看',
				confirmText: '再见',
				success: res => {
					if (res.confirm) {
						this.data.imgList.splice(e.currentTarget.dataset.index, 1);
						this.setData({
							imgList: this.data.imgList
						})
					}
				}
			})
		},
		urgeOrder() {
			wx.showToast({
				title: '已提醒卖家发货',
				icon: 'success',
				duration: 2000
			})
		},
		orderLogistics() {
			wx.navigateTo({
				url: '/pages/order/order-logistics/index?id=' + this.data.orderInfo.orderLogistics.id
			})
		},
		orderAppraise() {
			wx.navigateTo({
				url: '/pages/appraises/form/index?orderId=' + this.data.orderInfo.id
			})
		}
	}
})
