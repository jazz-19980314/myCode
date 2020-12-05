<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">申请成功</block>
		</cu-custom>
		<view class="succontent">
			<image src="../../static/assets/icon_bjcgbz.svg" mode=""></image>
			<view class="suctitle">
				申请提交成功
			</view>
			<view class="sucinfo">
				结款审核中...
			</view>
			<view class="succontinue" @click="entermoneydeclre">
				继续申请结款
			</view>
			<view class="succontinue" @click="enterCenter">
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
			// 申请继续结款
			entermoneydeclre(){
				uni.navigateTo({
					url:'../moneydeclre/moneydeclre'
				})
			},
			// 返回首页
			enterCenter(){
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
	height: 520rpx;
	margin: 240rpx auto;
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
		margin-top: 40rpx;
	}
}
</style>
