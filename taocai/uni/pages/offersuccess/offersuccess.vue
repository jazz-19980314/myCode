<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">报价成功</block>
		</cu-custom>
		<view class="succontent">
			<image src="../../static/assets/icon_bjcgbz.svg" mode=""></image>
			<view class="suctitle">
				报价成功
			</view>
			<view class="sucinfo">
				可在【已报价】页面查看是否已中标
			</view>
			<view class="succontinue" @click="enterquotaioncenter">
				继续报价
			</view>
			<view class="tocenter" @click="entercenter">
				返回淘材首页
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 继续报价
			enterquotaioncenter(){
				uni.navigateTo({
					url:'../quotationcenter/quotationcenter'
				})
			},
			// 返回淘材中心
			entercenter(){
				uni.switchTab({
					url:'../center/center'
				})
			}
		}
	}
</script>

<style lang="scss">
.succontent{
	width: 470rpx;
	height: 560rpx;
	margin: 140rpx auto;
	text-align: center;
	font-family: PingFangSC-Regular;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	image{
		height: 120rpx;
		width: 120rpx;
	}
	.suctitle{
		font-size: 16px;
		color: #333333;
		margin-top: 20rpx;
		font-weight: bold;
	}
	.sucinfo{
		font-size: 12px;
		color: #666666;
		margin: 20rpx 0 40rpx 0;
	}
	.succontinue{
		width: 100%;
		height: 80rpx;
		background-image: linear-gradient(270deg, #0D80F7 0%, #02A0FE 100%);
		box-shadow: 2px 2px 4px 0 rgba(24,79,186,0.20), -2px -2px 4px 0 rgba(229,238,255,0.50);
		border-radius: 2px;
		color: #FFFFFF;
		line-height: 80rpx;
		margin-bottom: 40rpx;
	}
	.tocenter{
		width: 100%;
		height: 80rpx;
		border: 1px solid rgba(2, 160, 254, 1);
		border-radius: 2px;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(13,128,247,1);
		margin-bottom: 40rpx;
		line-height: 80rpx;
		text-align: center;
	}
}
</style>
