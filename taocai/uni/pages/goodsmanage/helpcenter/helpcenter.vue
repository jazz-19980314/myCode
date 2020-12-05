<template>
	<view style="background-color: #f5faff;height: 100vh;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">关于我们</block>
		</cu-custom>
		<view class="main">
			<image src="../../../static/management/mmexport1594989680000.png" mode=""></image>
			<view class="" style="font-size: 16px;color: #0D80F7;font-weight: bold;margin: 120rpx 0;">
				翼装科技有限公司
			</view>
			<view style="color: #333;margin-top: 50rpx;font-size: 14px;">客服电话：152-0569-2881</view>
			<view style="color: #333;margin-top: 20rpx;font-size: 14px;">专注于提供建材领域电商一站式解决方案</view>
			<view class="company" style="color: #999;position: fixed;bottom: 120rpx;font-size: 12px;">
				技术支持 翼装科技有限公司
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.main{
	position: relative;
	padding-top: 300rpx;
	image{
		width: 160rpx;
		height: 180rpx;
		position: absolute;
		top: 120rpx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 10px;
	}
	view{
		width: 100%;
		text-align: center;
	}
}
</style>
