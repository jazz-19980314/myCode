<template>
	<view style="height: 100vh;background-color: #F5FAFF;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">开户信息管理</block>
		</cu-custom>
		<view class="bigcontent">
			<radio-group name="" style="width: 100%;" @change="radioChange">
				<view class="main">
					<view class="m-name">
						<text>毛尚昆</text>
						<text style="margin-left: 40rpx;">327841284812648</text>
					</view>
					<view class="bankname">
						交通银行 政务区支行
					</view>
					<view class="action">
						<view class="a-left">
							<radio style="transform: scale(0.653);" class="blue"  value="1" :checked="true"></radio>
							<view class="deliveryInfo">
								<view>默认信息</view>
							</view>
						</view>
						<view class="a-right">
							<view class="" @click="editInfo">
								<image src="../../../static/management/4-icon@3x.png" mode=""></image>
								<text>编辑</text>
							</view>
							<view class="" style="margin-left: 60rpx;" @click="deleteInfo">
								<image src="../../../static/management/5-icon@3x.png" mode=""></image>
								<text>删除</text>
							</view>
						</view>
					</view>
				</view>
				<view class="main">
					<view class="m-name">
						<text>毛尚昆</text>
						<text style="margin-left: 40rpx;">327841284812648</text>
					</view>
					<view class="bankname">
						交通银行 政务区支行
					</view>
					<view class="action">
						<view class="a-left">
							<radio style="transform: scale(0.653);" class="blue" value="2" ></radio>
							<view class="deliveryInfo">
								<view>设为默认信息</view>
							</view>
						</view>
						<view class="a-right">
							<view class="">
								<image src="../../../static/management/4-icon@3x.png" mode=""></image>
								<text>编辑</text>
							</view>
							<view class="" style="margin-left: 60rpx;">
								<image src="../../../static/management/5-icon@3x.png" mode=""></image>
								<text>删除</text>
							</view>
						</view>
					</view>
				</view>
			</radio-group>
			<view class="addbtn" @click="addInfo">
				<image src="../../../static/management/7-icon@3x.png" mode=""></image>
				添加开户信息
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shuilvValue:0
			};
		},
		onLoad() {
			this.$http.bankInfo().then(res=>{
				console.log(res.data)
			})
		},
		methods:{
			radioChange(e){
				this.shuilvValue = e.detail.value-1
			},
			editInfo(){
				uni.navigateTo({
					url:"../editInfo/editInfo"
				})
			},
			deleteInfo(){
				uni.showModal({
					title:"提示",
					content:"你确定要删除此条信息吗?",
					cancelText:'再想想',
					confirmText:'确定',
					success: (res) => {
						if(res.confirm){
							// uni.redirectTo({
							// 	url:'../login/login'
							// })
						}
					}
				})
			},
			addInfo(){
				uni.navigateTo({
					url:"../editInfo/editInfo"
				})
			}
		}
	}
</script>

<style lang="scss">
.bigcontent{
	width: 100%;
	margin-bottom: 100rpx;
	.main{
		width: 100%;
		height:264rpx;
		background:rgba(255,255,255,1);
		padding: 40rpx 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.m-name{
			height:22px;
			font-size:16px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:22px;
		}
		.bankname{
			height:20px;
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:20px;
		}
		.action{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.a-left{
				display: flex;
				justify-content: space-between;
				line-height: 52rpx;
				.deliveryInfo{
					margin-left: 20rpx;
				}
			}
			.a-right{
				display: flex;
				justify-content: space-between;
				font-size:14px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				view{
					image{
						width: 14px;
						height: 14px;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	.addbtn{
		width:100%;
		height:100rpx;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		font-size:14px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		line-height: 100rpx;
		text-align: center;
		position: fixed;
		bottom: 0;
		image{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 250rpx;
			width: 16px;
			height: 16px;
		}
	}
}
</style>
