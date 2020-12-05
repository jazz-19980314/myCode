<template>
	<view class="container999">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="backIcon" @click="enterCenter"><text class="cuIcon-back" style="font-size: 18px;"></text></block>
			<block slot="content">报价中心</block>
		</cu-custom>
		<view class="topbgc"></view>
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<!-- <refresh ref="refresh" @isRefresh='isRefresh'></refresh> -->
		<view class='nav'>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<!-- <swiper style="min-height: 100vh;margin-top: 120rpx;" :current="currentTab" @change="swiperTab" v-if="dataList.length"> -->
		<!-- <swiper-item v-for="(listItem,listIndex) in dataList" :key="listIndex"> -->
		<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			<view class='content' style="margin-top: 140rpx;" v-if="dataList.length > 0">
				<view class='card main_content' v-for="(item,index) in dataList" v-if="dataList.length > 0" :key="index" :class="item.offer?'isoffer':''">
					<image v-if="item.isTao" src="../../static/assets/tczy_bq@2x.png" mode="" class="tclogo"></image>
					<view class="main_detail">
						<view class="main_title">
							<view style="font-weight: bold;">{{item.userInfo.nickName}}</view>
							<view class="" style="font-weight: bold;">
								联系电话：<text style="color: #02A0FE;font-weight: 500;">{{item.orderLogistics.telNum}}</text>
							</view>
							<view class="" style="font-weight: bold;">
								收货地址：{{item.orderLogistics.address?item.orderLogistics.address:'上门自提'}}
							</view>
							<view class="materials" v-for="(meitem,index) in item.listOrderItem" :key="index">
								<view class="ma-content">
									<view class="">
										材料名称: {{meitem.spuName}}
									</view>
									<view class="">
										规格型号：{{meitem.specInfo?meitem.specInfo:'无规格'}}
									</view>
									<view class="">
										需求数量：<text style="color: #02A0FE;">{{meitem.quantity}}</text>
									</view>
								</view>
								<image :src="meitem.picUrl" mode=""></image>
							</view>
						</view>
					</view>
					<view class="quotationnow" v-if="item.status == 0" @click="enterOffer(item.id)">
						<view class="">
							<text>立即报价</text>
							<image src="../../static/assets/icon_ljbj.svg" mode=""></image>
						</view>
					</view>
					<view class="looknow" v-else>
						<view class="telphone">报价金额：<text style="color: #02A0FE;font-size: 12px;">￥</text><text style="color: #02A0FE;font-weight: bold;">{{item.salesPrice}}</text></view>
						<view class="look_image">
							<!-- <text @click="enterordercenter()" v-if="item.bidding===3">订单中心</text> -->
							<!-- <text @click="enterOfferDetail()" v-else-if="item.bidding===1">未中标原因</text> -->
							<text @click="changeOffer(item.id)">修改报价</text>
							<image src="../../static/assets/icon_cktp.svg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class='noCard' v-if="dataList.length == 0">
				<image src="../../static/assets/button_wss.svg" mode=""></image>
				<view class="" style="margin-top: 40rpx;">
					暂无数据,快去报价吧
				</view>
			</view>
			<view class="bottomInfo" v-if="dataList.length > 0">
				<view class="bottomLine">
				</view>
				<view class="">
					没有更多数据啦，快去选购吧
				</view>
				<view class="bottomLine">
				</view>
			</view>
		</scroll-view>
		<!-- </swiper-item> -->
		<!-- </swiper> -->
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	import refresh from '../../components/refresh.vue';
	import navTab from '../../components/navTab.vue';
	export default {
		components: {
			refresh,
			navTab,
		},
		data() {
			return {
				currentPage: 'index',
				toView: '', //回到顶部id
				tabTitle: [{
					value: '未报价',
					key: "0"
				}, {
					value: '已报价',
					key: "8"
				}], //导航栏格式 --导航栏组件
				currentTab: 0, //swiper所在页
				pages: [1, 1], //第几个swiper的第几页
				orderlist: [], //未报价信息
				isorderlist: [], // 已报价信息
				// dataList: [
				// 	[],
				// 	[]
				// ], // 报价信息
				dataList: [],
				current: 1,
				total: 1,
				total1: 1,
				scrollHeight: '',
				loadmore: true,
				page: {
					status: 0,
					current: 1,
					size: 5
				}
			};
		},
		onLoad(options) {
			this.currentTab = options.type
			//未报价
			this.order(this.page)
			//已报价
			// this.isorder()
		},
		onShow() {},
		onHide() {},
		methods: {
			order(key) {
				this.$http.orderInfo(key).then(res => {
					var list = res.data.data.records;
					this.dataList = [...this.dataList, ...list];
					if (list.length < 5) {
						this.loadmore = false;
					}
					this.total = res.data.data.total;
				}, error => {
					console.log(error);
				})
			},
			//已报价
			// isorder() {
			// 	this.$http.orderInfo({
			// 		status: 8,
			// 		current: 1,
			// 		size: 5
			// 	}).then(res => {
			// 		// this.isorderlist = res.data.data.records
			// 		this.dataList[1] = res.data.data.records
			// 		this.total1 = res.data.data.total
			// 	}, error => {
			// 		console.log(error);
			// 	})
			// },
			// 进入订单中心
			enterordercenter() {
				uni.navigateTo({
					url: '../ordercenter/ordercenter?id=0'
				})
			},
			// 返回首页
			enterCenter() {
				uni.switchTab({
					url: '../center/center'
				})
			},
			// 进入报价填写
			enterOffer(id) {
				// uni.navigateTo({
				// 	url:'/pages/filloffer/filloffer?id=id'
				// })
				let url = '/pages/filloffer/filloffer'
				let param = {
					id: id
				}
				this.$navTo.togo(url, param)
			},
			// 进入报价详情
			enterOfferDetail() {
				uni.navigateTo({
					url: '/pages/offerdetail/offerdetail?id=1'
				})
			},
			// 修改报价
			changeOffer(id) {
				let url = '/pages/changeoffer/changeoffer'
				let param = {
					id: id
				}
				this.$navTo.togo(url, param)
			},
			changeTab(index, key) {
				this.currentTab = index;
				this.page.status = key;
				this.dataList = [];
				this.page.current = 1;
				this.loadmore = true;
				this.order(this.page);
			},
			// swiper 滑动
			// swiperTab: function(e) {
			// 	var index = e.detail.current //获取索引
			// 	this.$refs.navTab.longClick(index);
			// },
			// lower1: util.throttle(function(e) {
			// 	if (this.dataList[0].length == this.total && this.dataList[1].length == this.total1) {
			// 		return
			// 	}
			// 	this.current++;
			// 	this.$http.orderInfo({
			// 		status: 1,
			// 		current: this.current,
			// 		size: 5
			// 	}).then(res => {
			// 		this.dataList[0] = [...this.dataList[0], ...res.data.data.records]
			// 	})
			// 	this.$http.orderInfo({
			// 		status: 8,
			// 		current: this.current,
			// 		size: 5
			// 	}).then(res => {
			// 		this.dataList[1] = [...this.dataList[1], ...res.data.data.records]
			// 	})
			// }, 300),
			onReachBottom() {
				if (this.loadmore) {
					this.page.current = this.page.current + 1;
					this.order(this.page);
				}
			}
		}
	};
</script>

<style lang="scss">
	.container999 {
		width: 100%;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6B8082;
		position: relative;
		background-color: #f6f6f6;
	}

	.content {
		width: 100%;
	}

	.topbgc {
		height: 100rpx;
		width: 100%;
		position: fixed;
		top: 120rpx;
		z-index: 1;
		background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
		border-radius: 0px 0px 15px 15px;
	}

	.main_content {
		width: 690rpx;
		// height: 500rpx;
		padding-bottom: 80rpx;
		background: rgba(254, 255, 255, 1);
		box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.1);
		border-radius: 12rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		position: relative;

		.tclogo {
			position: absolute;
			top: 0;
			left: 0;
			width: 120rpx;
			height: 32rpx;
		}

		.main_detail {
			padding: 40rpx 40rpx 20rpx 40rpx;
			position: relative;

			.main_title {
				view {
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 40rpx;
					margin-bottom: 20rpx;
				}

				.materials {
					height: 220rpx;
					display: flex;
					flex-direction: column;
					// justify-content: space-around;
					padding: 20rpx 0;
					position: relative;

					.ma-content {
						width: 370rpx;
						// height: 40rpx;
						// line-height: 40rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 0;

						view {
							margin-bottom: 20rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					image {
						width: 220rpx;
						height: 220rpx;
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}

			.main_image,
			.biding {
				position: absolute;
				width: 220rpx;
				height: 220rpx;
				top: 40rpx;
				right: 40rpx;
			}

			.biding {
				width: 96rpx;
				height: 44rpx;
			}
		}

		.quotationnow {
			height: 74rpx;
			width: 100%;
			background-image: linear-gradient(270deg, #0D80F7 0%, #02A0FE 100%);
			border-radius: 0 0 6px 6px;
			color: #FFFFFF;
			font-size: 16px;
			position: absolute;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;

			view {
				position: relative;

				text {
					height: 44rpx;
					text-decoration: underline;
				}

				image {
					position: absolute;
					width: 44rpx;
					height: 44rpx;
					left: -50rpx;
					top: 4rpx;
				}
			}


		}

		.looknow {
			height: 100rpx;
			width: 100%;
			line-height: 100rpx;
			border-radius: 0 0 6px 6px;
			padding: 0 40rpx;
			color: #333333;
			font-size: 16px;
			position: absolute;
			border-top: 1rpx solid #E4E5E6;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.telphone {
				flex: 2;
				height: 100%;
				border-right: 1rpx solid #E4E5E6;
			}

			.look_image {
				flex: 1;
				// width: 220rpx;
				height: 100%;
				font-size: 14px;
				color: #0D80F7;
				letter-spacing: 0;
				line-height: 40rpx;
				position: relative;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					width: 140rpx;
					text-decoration: underline;
				}

				image {
					position: absolute;
					width: 30rpx;
					height: 30rpx;
					top: 35rpx;
					right: 0rpx;
				}
			}
		}
	}

	.isoffer {
		// height: 500rpx;
	}

	.noCard {
		width: 340rpx;
		margin: 200rpx auto;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);

		image {
			width: 100%;
			height: 200rpx;
			margin-bottom: 30rpx;
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

	.nav {
		width: 690rpx;
		height: 64rpx;
		// margin: 40rpx auto;
		background: rgba(254, 255, 255, 1);
		box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.2);
		position: fixed;
		left: 50%;
		top: 180rpx;
		transform: translateX(-50%);
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(102, 102, 102, 1);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		z-index: 996;
	}

	.searchInput999 {
		width: 90%;
		margin: 0 auto;
		background: white;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
	}

	.search999 {
		width: 32upx;
		height: 32upx;
	}

	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input999 {
		color: #999;
		width: 80%;
	}

	.isbiding {
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 53, 67, 1);
		line-height: 22px;

		view {
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 53, 67, 1);
		}
	}

	.isnotbiding {
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		line-height: 22px;
		color: rgba(255, 142, 44, 1);
	}

	.isnowbiding {
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		line-height: 22px;
		color: rgba(255, 53, 67, 1);
	}
</style>
