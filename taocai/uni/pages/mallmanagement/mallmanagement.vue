<template>
	<view class="bigcontainer">
		<!-- <view class="busname">
			安徽淘材直供基地
		</view>
		<view class="bususer">
			安徽淘材直供基地·基地主（老板）
		</view> -->
		<!-- <button type="default" @click="enterGoodsManage">商品管理</button> -->
		<!-- 用户信息 -->
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">商城管理</block>
		</cu-custom>
		<view class="cu-list maincontainer">
			<view class="cu-list menu-avatar card-menu">
				<image src="../../static/management/bj@3x.png" mode="" class="bg-image"></image>
				<view class="cu-item">
					<view class="cu-avatar round">
						<image :src="userInfo.avatar" style="width: 100%;height: 100%;" class="tx-image" v-if="userInfo.avatar"></image>
						<image src="../../static/management/01-1@3x.png" mode="" style="width: 100%;height: 100%;" v-else></image>
					</view>
					<view class="content" style="font-weight: bold;">
						<view class="text-lg" style="color: #FFFFFF;" v-if="userInfo.username">{{userInfo.username}}</view>
						<view class="text-lg" style="color: #FFFFFF;" v-else>游客</view>
						<!-- <button class="cu-btn round sm" open-type="getUserInfo" bind:getuserinfo="agreeGetUser" lang="zh_CN">
							 更新昵称
						</button> -->
					</view>
					<view class='action' @click="redirctLogin">
						<view class="text-xl " bindtap="settings">
							<!-- <text class="cuIcon-settingsfill text-blue icon-setting"></text> -->
							<image src="../../static/management/01-2@3x.png" class="icon-setting"></image>
							<!-- <text class="cuIcon-right text-white icon-right"></text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 系统公告 -->
		<!-- <view class="sysnotice">
			<image src="../../static/management/gongao@3x.png" mode=""></image>
			<view class="">
				www.yizhuang.com翼装科技提供技术支持
			</view>
		</view> -->
		<!-- 常用业务 -->
		<view class="no-title" style="font-size: 16px;font-weight: bold;margin: 60rpx 0 40rpx 0;">
			<view class="" style="color:rgba(13,128,247,1);">
				商品管理
			</view>
			<view class="" style="color:rgba(255,142,44,1);">
				发布商品
			</view>
		</view>
		<view class="no-content">
			<view class="no-tabbar mainbox" @click="enterGoodsManage">
				<image src="../../static/management/01-4@3x.png" mode=""></image>
				<text style="color:rgba(13,128,247,1);">{{total1?total1:'0'}}</text>
			</view>
			<view class="no-tabbar mainbox" @click="postgoods">
				<image src="../../static/management/01-5@3x.png" mode=""></image>
				<text style="color:rgba(255,142,44,1);">{{total2?total2:'0'}}</text>
			</view>
		</view>
		<view class="no-navbar">
			<view class="no-top" @click="enterOrdercenter">
				<view class="no-left">
					<image src="../../static/management/01-6@3x.png" mode=""></image>
					<text>订单中心</text>
				</view>
				<view class="text-right" style="width: 180rpx;position: relative;">
					<text class="text-sm text-gray" style="position: absolute;top: 1px;left: 0;">前往订单中心</text>
					<text class="cuIcon-right text-xsl"></text>
				</view>
			</view>
			<navigator url="../goodsmanage/comments/comments">
				<view class="no-top">
					<view class="no-left">
						<image src="../../static/management/01-8@3x.png" mode=""></image>
						<text>商品评价</text>
					</view>
					<text class="cuIcon-right"></text>
				</view>
			</navigator>
			<navigator url="../goodsmanage/shopuser/shopuser">
				<view class="no-top ">
				<view class="no-left">
					<image src="../../static/management/01-9@3x.png" mode="" style="width: 45rpx;"></image>
					<text>商城用户</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			</navigator>
			<navigator url="../goodsmanage/addnotice/addnotice">
				<view class="no-top" style="margin-bottom: 20rpx;">
				<view class="no-left">
					<image src="../../static/management/01-10@3x.png" mode=""></image>
					<text>新增公告</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			</navigator>
			
			<view class="" :style="[{width:srcWidth + 'px'}]" style="height: 1px;background-color: rgba(228,233,242,1);;">
			</view>
			<navigator url="../goodsmanage/helpcenter/helpcenter">
				<view class="no-top" style="margin-top: 20rpx;">
				<view class="no-left">
					<image src="../../static/management/01-11@3x.png" mode=""></image>
					<text>关于我们</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				imagelist:'',
				userInfo:'',
				total1:'', //已上架
				total2:''  ,//未上架
				srcWidth:''
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.userInfo = uni.getStorageSync('users')
			// console.log(this.userInfo)
			// this.$http.getAllGoods({
			// 	shelf:1
			// }).then(res => {
			// 	this.total1 = res.data.data.total
			// })
			// this.$http.getallGoods().then(res => {
			// 	this.total2 = res.data.data.total
			// })
			this.$http.getAllGoodsss({
				specType:"0"
			}).then(res => {
				this.total2 = res.data.data.total
				this.total1 = res.data.data.total
			})
			const res=  uni.getSystemInfoSync()
			this.srcWidth = res.screenWidth
		},
		methods: {
			//退出登录
			redirctLogin(){
				uni.navigateTo({
					url:'../goodsmanage/setting/setting'
				})
			},
			//商品管理
			enterGoodsManage() {
				uni.navigateTo({
					url: "../goodsmanage/management/management"
				})
			},
			//进入订单中心
			enterOrdercenter(){
				uni.navigateTo({
					url:'../ordercenter/ordercenter'
				})
			},
			// 发布商品
			postgoods() {
				uni.navigateTo({
					url:'../goodsmanage/postgoods/postgoods'
				})
				// var that = this
				// uni.chooseImage({
				// 	count: 6, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album','camera'], //从相册选择
				// 	success: function(res) {
				// 		// console.log(res.tempFilePaths);
				// 		that.imagelist = res.tempFilePaths[0]
				// 		let obj = {
				// 			// imagelist:res.tempFilePaths[0],
				// 			title:"发布商品"
				// 		}
				// 		uni.navigateTo({
				// 			url:`../goodsmanage/goodschange/goodschange?data=${encodeURIComponent(JSON.stringify(obj))}`
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
	.bigcontainer {
		height: 100vh;
		// padding-top: 120rpx;
		background: rgba(245, 250, 255, 1);
	}

	.busname {
		width: 100%;
		text-align: center;
		height: 44rpx;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		line-height: 44rpx;
		margin-bottom: 5rpx;
	}

	.bususer {
		width: 100%;
		text-align: center;
		height: 34rpx;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 34rpx;
	}

	//用户信息
	// .maincontainer {
	// 	/* margin-top: -50px; */
	// 	/* margin-top: 10px;
	// position: relative;
	// z-index: 10000;
	// background-color: #fff; */
	// }

	/* 大盒子 */
	.cu-list.menu-avatar {
		width: 690rpx;
		height: 160rpx;
		border-radius: 10px;
		margin: 20rpx auto;
		margin-top: 44rpx;
		position: relative;
		.bg-image{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}

	.cu-list.menu-avatar>.cu-item {
		height: 100%;
	}

	.cu-list.menu-avatar>.cu-item>.cu-avatar {
		width: 80rpx;
		height: 80rpx;
		left: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	/* 头像 */
	.tx-image {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}

	/* 用户名盒子 */
	.cu-list.menu-avatar>.cu-item .content {
		left: 130rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.cu-list.menu-avatar>.cu-item .content>.text-black {
		width: 248rpx;
		height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 44rpx;
		margin-bottom: 10rpx;
	}

	.cu-btn.sm {
		width: 144rpx;
		height: 36rpx;
		border-radius: 18rpx;
		border: 1px solid #FFFFFF;
		background-color: rgba(0, 0, 0, 0);
		font-size: 10px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		line-height: 36rpx;
	}

	/* 设置按钮 */
	.cu-list.menu-avatar>.cu-item .action {
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		/* margin-bottom: 210rpx; */
		margin-left: 80rpx;
	}

	.icon-setting {
		height: 36rpx;
		width: 36rpx;
		position: absolute;
		top: 30rpx;
		right: 20rpx;
	}

	// 常用业务
	.normal {
		width: 690rpx;
		height: 464rpx;
		background: rgba(254, 255, 255, 1);
		box-shadow: -2px -2px 4px 0px rgba(229, 238, 255, 0.5), 2px 2px 4px 0px rgba(24, 79, 186, 0.4);
		border-radius: 10px;
		margin: 40rpx auto;
		padding: 30rpx;

		// display: flex;
		// justify-content: space-around;
		// align-items: center;
		// .no-title {
		// 	font-size: 16px;
		// 	font-family: PingFangSC-Medium, PingFang SC;
		// 	font-weight: 500;
		// 	color: rgba(51, 51, 51, 1);
		// 	line-height: 22px;
		// 	margin-bottom: 40rpx;
		// }

	}
	.no-content,.no-title {
		font-size: 14px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 20px;
		text-align: center;
		.mainbox{
			width:240rpx;
			height:240rpx;
			background:#FEFFFF;
			box-shadow:-2px -2px 4px 1px rgba(255,255,255,1),2px 2px 4px 1px rgba(24,79,186,0.4);
			border-radius:4px;
			position: relative;
			text{
				width:44rpx;
				height:50rpx;
				font-size:18px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				line-height:50rpx;
				position: absolute;
				bottom: 60rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			image{
				width: 120rpx;
				height: 120rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
	}
	.no-navbar{
		margin-top: 60rpx;
		width: 100%;
		padding: 10rpx 0;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		.no-top{
			width: 100%;
			height: 70rpx;
			padding: 0 40rpx 0 60rpx;
			margin-bottom: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.no-left{
				padding-left: 60rpx;
				width: 180rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				image{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
