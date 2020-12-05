<template>
	<view style="height: 100vh;background-color: #F5FAFF;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">设置</block>
		</cu-custom>
		<view class="maincontainer">
			<view class="mc-big">
				<view class="mc-left">
					<view class="tx-image">
						<image :src="userInfo.avatar" class="" v-if="userInfo.avatar"></image>
						<image v-else src="../../../static/management/01-1@3x.png" mode=""></image>
					</view>
					<view class="content" style="font-weight: bold;">
						<view class="text-lg"  v-if="userInfo.username">{{userInfo.username}}</view>
						<view class="text-lg" v-else>游客</view>
						<view class="" style="font-size: 14px;color: rgba(102,102,102,1);">
							{{phone?phone:''}}
						</view>
					</view>
				</view>
				<!-- <view class='action' @click="chooseImage">
					<view class="text-sm text-center" style="color: #666666;">
						头像设置
						<text class="cuIcon-right text-gray text-sm" style="margin-left: 10rpx;"></text>
					</view>
				</view> -->
			</view>
		</view>
		<navigator url="../editInfo/editInfo">
			<view class="kaihu">
				<text>个人信息管理</text>
				<text class="cuIcon-right text-gray"></text>
			</view>
		</navigator>
		<!-- <navigator url="../fahuomanage/fahuomanage">
			<view class="kaihu">
				<text>发货信息设置</text>
				<text class="cuIcon-right text-gray"></text>
			</view>
		</navigator> -->
		<view class="exitlogin" @click="exitlogin">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',
				avatar:[],
				phone:''
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('users')
			this.phone = this.userInfo.phone
		},
		computed:{
			// phoneNum(){
			// 	return this.phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
			// }
		},
		methods:{
			chooseImage(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.avatar = res.tempFilePaths
						console.log(this.avatar)
					}
				})
			},
			exitlogin(){
				uni.showModal({
					title:"提示",
					content:"你确定要退出登录吗?",
					cancelText:'再想想',
					confirmText:'确定',
					success: (res) => {
						if(res.confirm){
							uni.removeStorage({
								key:'users'
							})
							uni.removeStorage({
								key:'token'
							})
							uni.redirectTo({
								url:'/pages/login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.maincontainer{
		width: 100%;
		height: 180rpx;
		padding: 40rpx 30rpx;
		background-color: #FFFFFF;
		.mc-big{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			.mc-left{
				width: 400rpx;
				display: flex;
				margin-left: 20rpx;
				justify-content: flex-start;
				align-items: center;
				.tx-image {
					height: 100rpx;
					width: 100rpx;
					border: 1px solid #FFFFFF;
					border-radius: 50%;
					image{
						height: 100%;
						width: 100%;
						border: 1px solid #FFFFFF;
						border-radius: 50%;
					}
				}
				.content{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height:100%;
					margin-left: 20rpx;
					font-size:16px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
				}
			}
			.action {
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
	
	.spliceline{
		width: 100%;
		height: 20rpx;
		background-color: #F5FAFF;
	}
	.kaihu{
		width: 100%;
		height: 100rpx;
		padding: 30rpx;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
	}
	.exitlogin{
		width:690rpx;
		height:80rpx;
		margin: 40rpx auto;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		border-radius:4px;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
	}
</style>
