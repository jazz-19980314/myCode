<template>
	<view class="container999">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="backIcon" @click="enterCenter"><text class="cuIcon-back" style="font-size: 18px;"></text></block>
			<block slot="content">资金结算</block>
		</cu-custom>
		<view class="topbgc"></view>
		<view class='searchInput999'>
			<view class='searchBox999'>
				<text class="cuIcon-search"></text>
			</view>
			<input class='input999' placeholder="请输入您要查询的单号" placeholder-style="color:#ffffff;" @input="searchOrder" v-model="orderNo" type="number"></input>
		</view>
		<view class='content' style="height: 100vh;" v-if="shippedOrder.length != 0">
			<scroll-view style="height: 100vh;" scroll-y="true">
				<view class='card main_content' v-for="(item,index) in shippedOrder" :key="index">
					<view class="main_title">
						<text>单号：{{item.orderNo}}</text>
						<text class="lookdetail" @click="enterorderdetai(item.orderNo)">结算详情</text>
					</view>
					<view class="main_detail">
						<view class="companyName">
							{{item.userInfo.nickName}}
						</view>
						<view class="materialsname" v-for="(meitem,index) in item.listOrderItem" :key="index">
							<text class="">{{meitem.spuName}}</text>
							<text class="materialsprice ">￥{{meitem.salesPrice}}</text>
						</view>
					</view>
					<view class="main_connect" v-if="item.deliveryWay == '1'">
						<view class="main_phone">
							电话：<text>{{item.orderLogistics.telNum}}</text>
						</view>
						<view class="main_address">
							收货地点：<text class="main_address11">{{item.orderLogistics.address}}</text>
						</view>
					</view>
					<!-- <view class="main_connect" v-if="item.deliveryWay == '2'">
						<view class="main_phone">
							上门自提
						</view>
					</view> -->
					<view class="main_order">
						<view class="main_order1">
							<!-- <view class="">
								未结款金额：￥{{item.outstandingAmount}}
							</view> -->
							<view class="">
								订单总额：<text>￥{{item.paymentPrice}}</text>
							</view>
						</view>
						<view class="main_order2">
							<view class="qianshou">
								<view class="" v-if="item.isPay == '1'" >
									<image src="../../static/assets/03icon_yqs.svg" mode=""></image>
									<text>已结清</text>
								</view>
								<!-- <view class="" v-else-if="item.signstate===2" @click="showFahuoModal">
									<image src="../../static/picture/icon_bf.svg" mode=""></image>
									<text style="color: #FF8E2C;">部分结算</text>
								</view> -->
								<view class="" v-else >
									<image src="../../static/picture/icon_wqs.svg" mode=""></image>
									<text style="color: #FF3543;">未结算</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 结款信息 -->
					<view class="payInfo">
						<view class="payInfo-l">
							<view class="">
								最晚结款时间: {{item.payClosingDate?item.payClosingDate:''}}
							</view>
						</view>
						<view class="payInfo-r" v-if="item.isPay=='0'" @click="noticeBtn">
							提醒结款
						</view>
						<view class="payInfo-r payInfo-f" v-if="item.isPay=='1'">
							已全额结清
						</view>
						<!-- <view class="payInfo-f payInfo-r" v-else-if="item.status == '3'">
							已发送短信提醒
						</view>
						<view class="payInfo-n payInfo-r" v-else-if="item.status == '3'">
							未到结款日期
						</view> -->
					</view>
				</view>
				<view class="bottomInfo" v-if="listItem.length != 0">
					<view class="bottomLine">
					</view>
					<view class="">
						没有更多数据啦，快去报价吧
					</view>
					<view class="bottomLine">
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 结款详情空状态 -->
		<view class='noCard' v-else>
			<image src="../../static/assets/button_wss.svg" mode=""></image>
			<view class="" style="margin-top: 40rpx;">
				暂无数据,请及时下单
			</view>
			<view class="succontinue" @click="enterQuocenter">
				去订单中心
			</view>
		</view>
	</view>
</template>

<script>
	import BjxInputs from '@/components/bjx-inputs/bjx-inputs.vue'
	export default {
		components: {
			BjxInputs
		},
		data() {
			return {
				shippedOrder: [], // 已发货订单
				current:1,
				total:1,
				total2:1,
				orderNo:'',
				value2: '', //搜索框的值
				data2: [ // 下拉框的值
					{
						id: 1,
						value: '这是默认值2'
					},
					{
						id: 2,
						value: '数组中嵌套json格式数据'
					},
				],
				page:{
					current:1,
					size:5,
					status: 9
				},
				 loadmore: true,
			};
		},
		onLoad(options) {
			this.yifahuo()
			// setTimeout(()=>{
			// 	this.yiqianshou()
			// },500)
		},
		onShow() {},
		onHide() {},
		methods: {
			//搜索
			searchOrder(){
				this.$http.searchOrder({
					orderNo:this.orderNo
				}).then(res=>{
					this.shippedOrder.length = 0
					this.shippedOrder = res.data.data.records
				})
				if(!this.orderNo){
					uni.redirectTo({
						url:'../moneydeclre/moneydeclre'
					})
				}
			},
			// 已发货订单
			yifahuo(){
				this.$http.orderInfo(this.page).then(res => {
					let orderList = res.data.data.records
					this.shippedOrder = [...this.shippedOrder,...orderList]
					// this.total = res.data.data.total
					if (orderList.length < this.page.size) {
					  this.loadmore = false
					}
					wx.pageScrollTo({
					      scrollTop: 0,
					})
				}, error => {
					console.log(error);
				})
			},
			// yiqianshou(){
			// 	// 已签收订单
			// 	this.$http.orderInfo({
			// 		current:1,
			// 		size:5,
			// 		status: 3
			// 	}).then(res => {
			// 		console.log(this.shippedOrder)
			// 		this.shippedOrder = [...this.shippedOrder,...res.data.data.records]
			// 		this.total2 = res.data.data.total
			// 		console.log(this.shippedOrder)
			// 	}, error => {
			// 		console.log(error);
			// 	})
			// },
			// // 进入订单详情
			enterorderdetai(orderNo) {
				// uni.navigateTo({
				// 	url: '../orderdetail/orderdetail?id=id'
				// })
				// console.log(id)
				let url = '../orderdetail/orderdetail'
				let param = {
					orderNo: orderNo
				}
				this.$navTo.togo(url, param)
			},
			noticeBtn(){
				uni.showToast({
					icon:'none',
					title:'已发送短信通知！'
				})
			},
			// 进入结款详情页面
			enterapplymoney() {
				uni.navigateTo({
					url: '../applymoney/applymoney'
				})
			},
			//进入订单中心
			enterQuocenter(){
				uni.navigateTo({
					url:'../ordercenter/ordercenter'
				})
			},
			//返回首页
			enterCenter() {
				uni.switchTab({
					url: '../center/center'
				})
			},
			getData2(e) {
				// console.log(e)
				// this.value2 = ''
				if (!e.value) {
					e.callback(this.data2)
				} else {
					let data = []
					this.data2.forEach(item => {
						if (item.value.indexOf(e.value) > -1) {
							data.push(item)
						}
					})
					e.callback(data)
				}
			},
			select2(value) {
				// console.log(2, value)
				this.value2 = ''
			},
		},
		onReachBottom() {
			console.log(111)
			
			if (this.loadmore) {
			  this.page.current = this.page.current + 1
			  this.yifahuo()
			}
			
			// if (this.shippedOrder.length == this.total) {
			// 	return
			// }
			// this.current++;
			// this.$http.orderInfo({
			// 	status:9,
			// 	current: this.current,
			// 	size: 5
			// }).then(res => {
			// 	this.shippedOrder = [...this.shippedOrder,...res.data.data.records]
			// 	console.log(this.shippedOrder)
			// })
			// this.$http.orderInfo({
			// 	status:3,
			// 	current: this.current,
			// 	size: 5
			// }).then(res => {
			// 	this.shippedOrder = [...this.shippedOrder,...res.data.data.records]
			// 	console.log(this.shippedOrder)
			// })
		}
	};
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.container999 {
		width: 100%;
		font-size: 28upx;
		height: 100%;
		// min-height: 100vh;
		// overflow: hidden;
		color: #6B8082;
		position: relative;
		background-color: #FFFFFF;
	}

	.content {
		width: 100%;
		margin-top: 170rpx;
	}

	.topbgc {
		height: 140rpx;
		width: 100%;
		position: fixed;
		top: 120rpx;
		z-index: 1;
		background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
		border-radius: 0px 0px 15px 15px;
	}

	.main_content {
		width: 690rpx;
		// height: 432rpx;
		background: rgba(254, 255, 255, 1);
		box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.1);
		border-radius: 12rpx;
		margin: 0 auto;
		margin-bottom: 40rpx;
		position: relative;

		.main_title {
			width: 100%;
			padding: 0 40rpx;
			height: 80rpx;
			background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
			border-radius: 4px 4px 0px 0px;
			opacity: 0.9;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;

			.lookdetail {
				font-size: 16px;
				font-weight: bold;
				text-decoration: underline;
			}
		}

		.main_detail {
			padding: 30rpx 0 20rpx 40rpx;
			border-bottom: 1px solid rgba(228, 229, 230, 1);
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.companyName {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 20rpx;
			}

			.materialsname {
				display: flex;
				width: 500rpx;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				margin-bottom: 12rpx;
				text{
					width: 400rpx;
					height: 40rpx;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.materialsprice {
					// width: 100rpx;
					text-align: right;
					font-size: 14px;
					font-family: Menlo-Regular, Menlo;
					font-weight: bold;
					color: rgba(102, 102, 102, 1);
				}
			}
		}

		.main_connect {
			height: 128rpx;
			border-bottom: 1px solid rgba(228, 229, 230, 1);
			display: flex;
			flex-direction: column;
			padding: 0 20rpx 0 40rpx;
			justify-content: space-around;
			align-items: flex-start;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
		}

		.main_order {
			height: 106rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.main_order1 {
				height: 108rpx;
				line-height: 106rpx;
				width: 50%;
				text-align: center;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				color: rgba(51, 51, 51, 1);
				border-right: 1px solid rgba(228, 229, 230, 1);
				border-bottom: 1px solid rgba(228, 229, 230, 1);
				box-sizing: content-box;
				view {
					height: 50%;
					line-height: 53rpx;
				}
			}

			.main_order2 {
				height: 100%;
				width: 50%;
				text-align: center;
				line-height: 106rpx;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				position: relative;

				.wuliu {
					color: rgba(255, 53, 67, 1);
				}

				.fahuo {
					color: #E6A23C;

					image {
						position: absolute;
						top: 35rpx;
						left: 80rpx;
						width: 40rpx;
						height: 40rpx;
					}

				}

				.qianshou {
					color: #67C23A;

					image {
						position: absolute;
						top: 35rpx;
						left: 70rpx;
						width: 40rpx;
						height: 40rpx;
					}
				}

				image {
					position: absolute;
					top: 30rpx;
					left: 40rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		// 结款信息
		.payInfo {
			height: 84rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.payInfo-l {
				height: 100%;
				width: 50%;
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				border-radius: 0px 0px 0px 6px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				padding-left: 40rpx;
			}

			.payInfo-r {
				height: 100%;
				width: 50%;
				text-align: center;
				line-height: 84rpx;
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				// text-decoration: underline;
				background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
				border-radius: 0px 0px 6px 0px;
			}

			.payInfo-f {
				background: linear-gradient(270deg, #86C0FB 0%, #80CFFE 100%);
			}

			.payInfo-n {
				background: rgba(204, 204, 204, 1);
				border-radius: 0px 0px 6px 0px;
			}
		}
	}

	.noCard {
		width: 470rpx;
		margin: 200rpx auto;
		height: 400rpx;
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);

		.succontinue {
			width: 100%;
			height: 80rpx;
			background-image: linear-gradient(270deg, #0D80F7 0%, #02A0FE 100%);
			box-shadow: 2px 2px 4px 0 rgba(24, 79, 186, 0.20), -2px -2px 4px 0 rgba(229, 238, 255, 0.50);
			border-radius: 2px;
			color: #FFFFFF;
			line-height: 80rpx;
			margin-top: 40rpx;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}

		image {
			width: 348rpx;
			height: 200rpx;
		}
	}

	.bottomInfo {
		display: flex;
		width: 100%;
		padding: 60rpx 30rpx;
		justify-content: space-between;
		height: 40rpx;
		align-items: center;

		view {
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			width: 336rpx;
		}

		.bottomLine {
			width: 156rpx;
			height: 1px;
			background: rgba(216, 216, 216, 1);
		}
	}


	.searchInput999 {
		width: 690rpx;
		height: 72rpx;
		background-image: linear-gradient(270deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.4) 100%);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		// margin-top: 20rpx;
		top: 155rpx;
		z-index: 103;
	}
	
	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	
		text {
			color: #FFFFFF;
		}
	}
	
	.input999 {
		color: #FFFFFF;
		width: 80%;
	}
	.noCard {
		width: 470rpx;
		margin: 400rpx auto;
		height: 400rpx;
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		.succontinue{
			width: 100%;
			height: 80rpx;
			background-image: linear-gradient(270deg, #0D80F7 0%, #02A0FE 100%);
			box-shadow: 2px 2px 4px 0 rgba(24,79,186,0.20), -2px -2px 4px 0 rgba(229,238,255,0.50);
			border-radius: 2px;
			color: #FFFFFF;
			line-height: 80rpx;
			margin-top: 40rpx;
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		image {
			width: 348rpx;
			height: 200rpx;
		}
	}
</style>
