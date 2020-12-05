<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">首页</block>
		</cu-custom>
		<image src="../../static/assets/banner-218.png" mode="heightFix" style="width: 100%;" class="banner"></image>
		<view class="main-content">
			<!-- 导航 -->
			<view class="nav-flow">
				<view class="" @click="enterQuotationCenter()">
					<image src="../../static/jingangicon/shadow_3/icon_bjzx@3x.png" mode=""></image>
					<text>报价中心</text>
				</view>
				<view class="" @click="enterOrderCenter()">
					<image src="../../static/jingangicon/shadow_3/icon_ddzx@3x.png" mode=""></image>
					<text>订单中心</text>
				</view>
				<view class="" @click="enterMoneyDeclare">
					<image src="../../static/jingangicon/shadow_3/icon_zjsb@3x.png" mode=""></image>
					<text>资金结算</text>
				</view>
				<view class="" @click="entersignpicture">
					<image src="../../static/jingangicon/shadow_3/icon_qszp@3x.png" mode=""></image>
					<text>签收照片</text>
				</view>
			</view>
			<!-- 报价专题 -->
			<view class="offer_special" @click="enterQuotationCenter">
				<view class="offer_tig text-lg">
					<image src="../../static/assets/icon-bj.svg" mode=""></image>
					报价专题
				</view>
				<text class="text-xl">开启你的报价之旅</text>
				<view class="text-sm newoffer" v-if="quotationnews">你有一个新的报价消息请及时报价</view>
				<view class="text-sm nonewoffer" v-else>
					暂无签收消息
				</view>
				<view class="offer_now" :class="{'nooffer_now':!quotationnews,'active_now':islongpress}" @click.stop="longClick">
					立即报价
				</view>
				<text class="icon_right cuIcon-right"></text>
			</view>
			<!-- 分隔条 -->
			<view class="fen_step">
			</view>
			<!-- 常用业务 -->
			<view class="common_business offer_special">
				<view class="offer_tig text-lg">
					<image src="../../static/assets/icon_cyyw.svg" mode=""></image>
					常用业务
				</view>
				<view class="business_content">
					<view class="business_detail line-re text-bold" @click="enterMoneyDeclare">
						<view class="business_title">
							结款信息汇总
						</view>
						<view class="business_info"  :class="noticenews?'business_infonews':''" v-if="noticenews">
							你有一个新的结款信息已更新
						</view>
						<view class="business_info" v-else>
							暂无结款消息
						</view>
						<text class="business_icon cuIcon-right"></text>
					</view>
					<view class="business_detail line-gre" @click="enterOrderCenter">
						<view class="business_title text-bold">
							订单消息汇总
						</view>
						<view class="business_info"  :class="ordernews?'business_infonews':''" v-if="ordernews">
							你有一个新的订单信息已更新
						</view>
						<view class="business_info" v-else>
							暂无订单消息
						</view>
						<text class="business_icon cuIcon-right"></text>
					</view>
					<view class="business_detail line-bl text-bold" @click="enterOrderCenterWuli">
						<view class="business_title">
							物流状态汇总
						</view>
						<view class="business_info"  :class="logisticsnew?'business_infonews':''" v-if="logisticsnew">
							你有一个新的物流信息已更新
						</view>
						<view class="business_info" v-else>
							暂无物流消息
						</view>
						
						<text class="business_icon cuIcon-right"></text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				quotationnews:false, //是否有报价消息
				ordernews:false,  // 是否有订单消息
				logisticsnew:false ,// 是否有物流信息
				noticenews:false, // 是否有新的公告
				islongpress:false //是否长按
			};
		},
		onShow() {
			this.islongpress = false
			// 用户信息
			this.$http.userInfo().then(res => {
				// console.log(res.data);
				uni.setStorage({
					key: 'users',
					data: res.data.data.sysUser,
					success: function() {
						// console.log('success');
					}
				});
			}, error => {
				console.log(error);
			})
			this.$http.orderInfo({
				status:0,
				current:1,
				size:1
			}).then(res => {
				if(res.data.data.records.length){
					this.quotationnews = true
				}
			}, error => {
				console.log(error);
			})
			this.$http.orderInfo({
				status:2,
				current:1,
				size:1
			}).then(res => {
				if(res.data.data.records.length){
					this.logisticsnew = true
				}
			}, error => {
				console.log(error);
			})
			this.$http.orderInfo({
				status:8,
				current:1,
				size:1
			}).then(res => {
				if(res.data.data.records.length){
					this.ordernews = true
				}
			}, error => {
				console.log(error);
			})
			this.$http.orderInfo({
				current:1,
				size:5,
				status: 9
			}).then(res => {
				if(res.data.data.records.length){
					// this.quotationnews = true
					this.noticenews = true
				}
			}, error => {
				console.log(error);
			})
		},
		methods: {
			longClick(){
				this.islongpress = true
				let url = '/pages/quotationcenter/quotationcenter'
				let param = {
					name: 'navto'
				}
				this.$navTo.togo(url, param)
			},
			// 进入报价中心
			enterQuotationCenter() {
				// uni.navigateTo({
				//     url: '/pages/quotationcenter/quotationcenter'
				// });
				// to(){  
				let url = '/pages/quotationcenter/quotationcenter'
				let param = {
					name: 'navto'
				}
				this.$navTo.togo(url, param)
				// }  
			},
			enterTest() {
				uni.navigateTo({
					url: "/pages/test/test"
				})
			},
			// 进入订单中心
			enterOrderCenter() {
				uni.navigateTo({
					url: '../ordercenter/ordercenter'
				})
			},
			// 资金申报
			enterMoneyDeclare(){
				uni.navigateTo({
					url:'../moneydeclre/moneydeclre'
				})
			},
			// 进入物流信息转态
			enterOrderCenterWuli() {
				uni.navigateTo({
					url: '../ordercenter/ordercenter?id=1'
				})
			},
			// 进入签收照片
			entersignpicture() {
				uni.navigateTo({
					url: '../signpicture/signpicture'
				})
			}
		}
		// mixins:[Vue.prototype.$tabBarView.$mixins()]
	}
</script>

<style lang="scss">
	// banner图
	.banner {
		position: absolute;
		z-index: 1;
	}

	.main-content {
		position: relative;
		z-index: 10;
		top: 340rpx;

		// width: 690rpx;
		// background-color: #FFFFFF;
		// margin: 0 auto;
		// 导航
		.nav-flow {
			width: 690rpx;
			height: 180rpx;
			background: rgba(254, 255, 255, 1);
			box-shadow: -2px -2px 4px 0px rgba(229, 238, 255, 0.5), 2px 2px 4px 0px rgba(24, 79, 186, 0.4);
			border-radius: 4px;
			margin: 0 auto;
			display: flex;
			justify-content: space-around;
			align-items: center;

			view {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				image {
					width: 90rpx;
					height: 90rpx;
				}

				text {
					height: 34rpx;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 34rpx;
					margin-top: 10rpx;
				}
			}

		}

		// 报价专题
		.offer_special {
			width: 690rpx;
			padding: 50rpx 0 40rpx 0;
			margin: 0 auto;
			position: relative;

			.offer_tig {
				height: 50rpx;
				line-height: 44rpx;
				position: relative;
				padding-left: 60rpx;
				box-sizing: border-box;
				margin-bottom: 25rpx;
				font-weight: bold;

				image {
					width: 44rpx;
					height: 44rpx;
					margin-right: 16rpx;
					position: absolute;
					top: -2rpx;
					left: 0;
				}
			}

			.text-xl {
				// width:206px;
				height: 50rpx;
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				color: rgba(51, 51, 51, 1);
				line-height: 25rpx;
				margin-bottom: 10rpx;
				font-weight: bold;
			}

			.newoffer {
				color: rgba(255, 53, 67, 1);
				margin-bottom: 20rpx;
				line-height: 34rpx;
				margin-top: 10rpx;
			}
			.nonewoffer{
				color: rgba(102,102,102,1);
				margin-bottom: 20rpx;
				line-height: 34rpx;
				margin-top: 10rpx;
			}
			
			.offer_now {
				width: 184rpx;
				height: 60rpx;
				background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
				border-radius: 2px;
				color: #FFFFFF;
				line-height: 60rpx;
				text-align: center;
			}
			.nooffer_now{
				background:linear-gradient(270deg, #86C0FB 0%, #80CFFE 100%) !important;
			}
			.active_now{
				background:linear-gradient(270deg, #018FE4 0%, #0B72DD 100%) !important;
			}
			.icon_right {
				position: absolute;
				width: 36rpx;
				height: 36rpx;
				top: 170rpx;
				right: 20rpx;
				color: #CDCECF;
			}
		}

		//常用业务
		.common_business {
			padding: 40rpx 0;

			.business_content {

				// padding: 40rpx 0;
				.business_detail {
					width: 684rpx;
					height: 140rpx;
					background: #FEFFFF;
					border-radius: 6px;
					padding: 30rpx 20rpx 26rpx 34rpx;
					position: relative;
					margin-bottom: 30rpx;
					box-shadow: -2px -2px 4px 0px rgba(229, 238, 255, 0.5), 2px 2px 4px 0px rgba(24, 79, 186, 0.1);

					.business_title {
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: rgba(51,51,51,1);
						letter-spacing: 0;
						line-height: 40rpx;
						margin-bottom: 8rpx;

					}

					.business_info {
						font-size:12px;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(102,102,102,1);
						line-height:34rpx;
					}
					.business_infonews{
						color: rgba(255, 53, 67, 1);
					}
					.business_icon {
						position: absolute;
						width: 36rpx;
						height: 36rpx;
						top: 60rpx;
						right: 0;
						color: #CDCECF;
					}
				}
			}
		}
	}

	// 分割条
	.fen_step {
		width: 100%;
		height: 20rpx;
		background: rgba(245, 250, 255, 1);
	}

	// 左边框
	.line-gre {
		border-left: 6rpx solid #289F96;
	}

	.line-bl {
		border-left: 6rpx solid #5483FE;
	}

	.line-re {
		border-left: 6rpx solid #F75C61;
	}
</style>
