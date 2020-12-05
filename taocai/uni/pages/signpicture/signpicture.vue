<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">签收照片</block>
		</cu-custom>
		<view class="main">
			<view class="main-search">
				<text class="cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入您要搜索的单号" placeholder-style="font-size:12px;color:rgba(153,153,153,1);text-align:left;" />
				<view class="search-right">
					筛选
					<image src="../../static/assets/04icon_sx.svg" mode=""></image>
				</view>
			</view>
			<!-- 签收照片 -->
			<view class="signFor">
				<view class="contracttig">
					<view class="">
						2019-11-07
					</view>
					<view class="moreinfo">
						更多
						<image src="../../static/assets/04icon_gd.svg" mode=""></image>
					</view>
				</view>
				<view class="imagebox">
					<!-- 签收照片 -->
					<view class="signImageBox">
						<view class="signImage">
							<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
						</view>
						<view class="signImage">
							<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
						</view>
						<view class="signImage">
							<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
						</view>
					</view>
					<!-- 发货码 -->
					<view class="fahuocode">
						发货码：3242342 <text>复制</text>
					</view>
				</view>
			</view>
			<view class="signFor">
				<view class="contracttig">
					<view class="">
						2019-11-07
					</view>
					<view class="moreinfo">
						更多
						<image src="../../static/assets/04icon_gd.svg" mode=""></image>
					</view>
				</view>
				<view class="imagebox">
					<!-- 签收照片 -->
					<view class="signImageBox">
						<view class="signImage">
							<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
						</view>
						<view class="signImage">
							<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
						</view>
						<view class="signImage">
							<image src="../../static/picture/hetong.png" mode="" style="height: 100%;width: 100%;"></image>
						</view>
					</view>
					<!-- 发货码 -->
					<view class="fahuocode">
						发货码：3242342 <text>复制</text>
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

			};
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		padding: 40rpx 30rpx;

		.main-search {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			.cuIcon-search{
				position: absolute;
				top: 50%;
				left: 40rpx;
				transform: translateY(-50%);
			}
			input {
				width: 560rpx;
				height: 72rpx;
				padding-left: 80rpx;
				background: rgba(254, 255, 255, 1);
				box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.4);
				border-radius: 4px;
			}
			.search-right{
				height: 72rpx;
				width: 110rpx;
				line-height: 72rpx;
				padding-right: 40rpx;
				font-size:16px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				position: relative;
				image{
					width: 32rpx;
					height: 32rpx;
					position: absolute;
					top: 50%;
					right: 0rpx;
					transform: translateY(-50%);
				}
			}
		}
		// 签收信息
		.signFor{
			width:690rpx;
			height:400rpx;
			margin: 50rpx auto;
			background:rgba(254,255,255,1);
			box-shadow:-2px -2px 4px 0px rgba(227,238,255,0.5),2px 2px 4px 0px rgba(0,80,193,0.2);
			padding: 0 30rpx;
			.contracttig{
				height: 100rpx;
				font-size:18px;
				font-family:DINAlternate-Bold,DINAlternate;
				font-weight:bold;
				color:rgba(51,51,51,1);
				line-height:100rpx;
				padding-top: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.moreinfo{
					width: 100rpx;
					padding-right: 40rpx;
					position: relative;
					font-size:14px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(102,102,102,1);
					image{
						height: 24rpx;
						width: 24rpx;
						position: absolute;
						top: 50%;
						right: 0rpx;
						transform: translateY(-50%);
					}
				}
			}
			.imagebox{
				height: 340rpx;
				.fahuocode{
					font-size:16px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					text{
						color: rgba(13,128,247,1);
						text-decoration: underline;
						font-size: 12px;
						margin-left: 20rpx;
					}
				}
				.signImageBox{
					width: 100%;
					height: 200rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 40rpx;
					.signImage{
						height: 200rpx;
						width: 200rpx;
						border-radius: 2px;
						// background-color: rgba(245,250,255,1);
					}
				}
			}
		}
	}
</style>
