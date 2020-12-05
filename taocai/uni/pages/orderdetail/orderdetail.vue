<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">结款详情</block>
		</cu-custom>
		<view class="container" :style="[{height:srcHeight + 'px'}]">
			<view class="orderdetail">
				<view class="order-title">
					<view class="">
						单号：{{orderNo}}
					</view>
					<view class="order-num">
						共{{total}}笔交易记录
					</view>
				</view>
				<view class="order-title" style="border: none;padding: 20rpx;">
					<button class="cu-btn bg-blue lg" @click="download" style="" :data-url="orderdetail[0].contractPic">查看合同</button>
					<button class="cu-btn bg-blue lg" @click="settleAll" :disabled="orderdetail[0].isPay == 1">全额结清</button>
				</view>
				<view class="order-con" v-for="(item,index) in goodsdetail" :key="index">
					<view class="">
						{{item.createTime}}
					</view>
					<view class="order-det">
						<image src="../../static/picture/bgc.png" mode="" class="bgc"></image>
						<view class="bgcblack">
						</view>
						<view class="order-main">
							<view class="order-price">
								<text>订单总额</text>
								<text>￥{{item.paymentPrice}}</text>
							</view>
							<view class="order-price">
								<text>未结款金额</text>
								<text>￥{{item.paymentPriceCurrent}}</text>
							</view>
							<view class="order-price">
								<text>本次结款金额</text>
								<text>￥{{item.payPrice}}</text>
							</view>
							<view class="order-price order-image">
								<text>凭证信息</text>
								<view class="">
									<image v-for="(imgUrl,index) in item.picUrl" :key="index" :src="imgUrl" mode="" @tap="ViewImage($event,index)"
									 :data-url="item.picUrl[index]"></image>
								</view>
							</view>
							<view class="order-btn" v-if="item.status==0">
								<view class="order-btn1" @click="refuse(index)">
									拒绝
								</view>
								<view class="order-btn2" @click="confirm(index)">
									确认
								</view>
							</view>
							<view class="order-btn" v-if="item.status==1">
								<view class="order-btn2">
									已确认
								</view>
							</view>
							<view class="order-btn" v-if="item.status==2">
								<view class="order-btn2" style="background: red;">
									已拒绝
								</view>
							</view>
							<view class="order-beizhu">
								备注：{{item.reason?item.reason:'无'}}
							</view>
							<view class="order-beizhu">
								注：7天内未确认信息，系统将自动为您确认
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcHeight: '',
				goodsdetail: [], //结算详情
				orderNo: '',
				total: 0,
				orderdetail: [], //订单详情
				picUrl: [], //凭证信息
				dwFile: null //下载文件
			};
		},
		onShow() {
			const res = uni.getSystemInfoSync()
			this.srcHeight = res.screenHeight
		},
		onLoad(options) {
			this.orderNo = options.orderNo
			this.$http.getOneByOrderNo({
				orderNo: options.orderNo
			}).then(res => {
				this.orderdetail = res.data.data.records
			})
			this.$http.gethistoryment({
				orderNo: options.orderNo
			}).then(res => {
				this.total = res.data.data.total
				this.goodsdetail = res.data.data.records
				this.goodsdetail.forEach(item => {
					item.picUrl = JSON.parse(item.picUrl)
				})
			}, error => {
				console.log(error);
			})
		},
		methods: {
			download(e) { //下载合同
				if(e.currentTarget.dataset.url){
					var imglist = []
					imglist.push(e.currentTarget.dataset.url)
					uni.previewImage({
						urls: imglist,
						current: e.currentTarget.dataset.url
					});
				}else{
					uni.showToast({
						icon:'none',
						title:'合同尚未生成，请耐心等待！'
					})
				}
				// let filePath = this.orderdetail[0].contract.replace("http:","https:")
				// uni.downloadFile({
				// 		url: this.orderdetail[0].contract, 
				// 		success: (res) => {
				// 			// console.log(filePath)
				// 			if (res.statusCode === 200) {
				// 				uni.showToast({
				// 					icon:'none',
				// 					title:'合同下载成功请在手机上查看！'
				// 				})
				// 			}
				// 			let that = this;
				// 			uni.saveFile({
				// 				tempFilePath: res.tempFilePath,
				// 				success: function(red) {
				// 					that.dwFile = red.savedFilePath
				// 					uni.openDocument({
				// 					      filePath: that.dwFile,
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
				// 			uni.showToast({
				// 				icon:'none',
				// 				title:'下载失败！请联系开发人员'
				// 			})
				// 		}
				// 	});
			},
			ViewImage(e, index) {
				var imglist = []
				imglist.push(e.currentTarget.dataset.url)
				uni.previewImage({
					urls: imglist,
					current: e.currentTarget.dataset.url
				});
			},
			settleAll() {
				uni.showModal({
					title: '提示',
					content: '你确定要全额结清吗？',
					success: (res) => {
						if (res.confirm) {
							this.$http.settleAll({
								orderNo: this.orderNo
							}).then(res => {
								if (res.data.ok) {
									uni.showToast({
										icon: "none",
										title: "该订单已全额结清！"
									})
								}
							})
						}
					}
				})
			},
			refuse(index) {
				// this.goodsdetail[index].status = '2'
				var goodsdetail = JSON.parse(JSON.stringify(this.goodsdetail[index]))
				goodsdetail.status = "2"
				goodsdetail.picUrl = JSON.stringify(goodsdetail.picUrl)
				this.$http.puthistoryment(goodsdetail).then(res => {
					if (res.data.ok) {
						this.goodsdetail[index].status = '2'
					}
				})
			},
			confirm(index) {
				var goodsdetail = JSON.parse(JSON.stringify(this.goodsdetail[index]))
				goodsdetail.status = "1"
				goodsdetail.picUrl = JSON.stringify(goodsdetail.picUrl)
				// console.log(this.goodsdetail)
				this.$http.puthistoryment(goodsdetail).then(res => {
					if (res.data.ok) {
						this.goodsdetail[index].status = '1'
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background: rgba(235, 245, 255, 1);
		padding: 30rpx;
	}

	.orderdetail {
		width: 690rpx;
		margin: 0 auto;
		background: rgba(254, 255, 255, 1);
		padding-bottom: 40rpx;

		.order-title {
			height: 120rpx;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 120rpx;
			padding: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2px dashed #CCE5FF;
			position: relative;

			.order-num {
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			// button{
			// 	position: absolute;
			// 	right: 40rpx;
			// 	top: 50%;
			// 	transform: translateY(-50%);
			// }
		}

		// 订单内容
		.order-con {
			width: 100%;
			padding: 40rpx 40rpx 0 40rpx;
			// height: 670px;

			.order-det {
				width: 100%;
				height: 550rpx;
				border-radius: 6px;
				margin-top: 20rpx;
				position: relative;
				z-index: 10;

				.bgc {
					width: 100%;
					height: 100%;
					border-radius: 6px;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
				}

				.bgcblack {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 4;
					background: rgba(0, 0, 0, 1);
					border-radius: 6px;
					opacity: 0.8;
				}

				.order-main {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					padding: 30rpx 40rpx;

					.order-price {
						height: 40rpx;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						line-height: 40rpx;
						display: flex;
						justify-content: space-between;
						margin-bottom: 20rpx;
						z-index: 20;
					}

					.order-image {
						height: 156rpx;

						image {
							width: 150rpx;
							height: 156rpx;
							border: 1px solid rgba(255, 255, 255, 0);
							border-radius: 4px;
							margin-left: 30rpx;
						}
					}

					.order-btn {
						display: flex;
						justify-content: flex-end;
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
						margin-bottom: 10rpx;

						.order-btn1 {
							width: 160rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							background-color: rgba(255, 53, 67, 1);
							color: #FFFFFF;
							border-radius: 2px;
						}

						.order-btn2 {
							width: 160rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
							border-radius: 2px;
							margin-left: 40rpx;
						}
					}

					.order-beizhu {
						width: 100%;
						text-align: right;
						height: 28rpx;
						font-size: 10px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 28rpx;
						margin-top: 10rpx;
					}
				}

			}
		}
	}
</style>
