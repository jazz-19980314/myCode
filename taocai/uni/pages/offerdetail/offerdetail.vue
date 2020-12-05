<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">报价详情</block>
		</cu-custom>
		<!-- 分隔条 -->
		<view class="spliceline">
		</view>
		<!-- 合同照片 -->
		<view class="contractImage">
			<view class="contracttig">
				<image src="../../static/assets/03icon_http.svg" mode="" class="imageicon"></image>
				合同图片
			</view>
			<view class="imagebox">
				<view class="">
					<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
				</view>
			</view>
		</view>
		<view class="spliceline">
		</view>
		<!-- 报价函照片 -->
		<view class="contractImage">
			<view class="contracttig">
				<image src="../../static/assets/03icon_http.svg" mode="" class="imageicon"></image>
				报价函图片
			</view>
			<view class="imagebox">
				<view class="">
					<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
				</view>
			</view>
		</view>
		<view class="spliceline">
		</view>
		<!-- 材料名称照片 -->
		<view class="contractImage" style="height: 466rpx;">
			<view class="contracttig">
				<image src="../../static/assets/03icon_http.svg" mode="" class="imageicon"></image>
				材料名称：螺纹钢
			</view>
			<view class="materialsname">
				<view class="">
					<text>规格型号</text>
					<text class="leftdata">HRBHHJ*12米</text>
				</view>
				<view class="">
					<text>单位</text>
					<text class="leftdata">吨</text>
				</view>
				<view class="">
					<text>数量</text>
					<text class="leftdata">10</text>
				</view>
				<view class="">
					<text>单价（元）</text>
					<text class="leftdata">200</text>
				</view>
				<view class="">
					<text>备注</text>
					<text class="leftdata">无</text>
				</view>
				<view class="">
					<text>品牌</text>
					<text class="leftdata">淘材</text>
				</view>
			</view>
		</view>
		<view class="spliceline">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad: (options) => {
			console.log(options.id)
		}
	}
</script>

<style lang="scss">
	.spliceline {
		width: 100%;
		height: 20rpx;
		background: rgba(245, 250, 255, 1);
	}
	.contractImage{
		height: 362rpx;
		padding: 0 30rpx;
		.contracttig{
			height: 100rpx;
			border-bottom: 2rpx solid rgba(234,234,234,1);
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:100rpx;
			padding-left: 60rpx;
			position: relative;
			.imageicon{
				height: 36rpx;
				width: 36rpx;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
		.imagebox{
			height: 260rpx;
			position: relative;
			view{
				width:292rpx;
				height:180rpx;
				// background:rgba(245,250,255,1);
				border-radius:4px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.materialsname{
			height: 366rpx;
			padding: 20rpx 60rpx;
			font-size:12px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
			line-height:17px;
			view{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.leftdata{
					width: 200rpx;
					text-align: center;
				}
			}
		}
	}
</style>
