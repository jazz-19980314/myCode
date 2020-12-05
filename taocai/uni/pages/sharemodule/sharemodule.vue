<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">分润模块</block>
		</cu-custom>
		<view class="" style="width: 240rpx;height: 240rpx;margin:0 auto;margin-top: 250rpx;">
			<image src="../../static/management/nullstatus.png" mode="" style="width: 100%;height: 100%;"></image>
		</view>
		<view class="desc" style="width: 100%;">
			该功能正在努力开发中，敬请期待。。。
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				
			};
		},
		// mixins:[Vue.prototype.$tabBarView.$mixins()]
	}
</script>

<style lang="scss">
.desc{
	height:22px;
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:22px;
	margin-top: 60rpx;
	text-align: center;
}
</style>
