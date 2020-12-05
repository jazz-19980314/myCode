<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">结款详情</block>
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
				<image src="../../static/assets/03icon_clmc.svg" mode="" class="imageicon"></image>
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
		<!-- 订单信息详情 -->
		<view class="contractImage orderDetail" style="height: 660rpx;">
			<view class="contracttig">
				<image src="../../static/assets/03icon_ddxx.svg" mode="" class="imageicon"></image>
				订单信息
			</view>
			<view class="materialsname">
				<view class="">
					<text>报价有效期</text>
					<text class="leftdata rightdata">1天</text>
				</view>
				<view class="">
					<text>最快交货日期</text>
					<text class="leftdata rightdata">2020-10-11</text>
				</view>
				<view class="">
					<text>交货方式</text>
					<text class="leftdata rightdata">供方配送到需方物流点</text>
				</view>
				<view class="">
					<text>是否卸车</text>
					<text class="leftdata rightdata">是</text>
				</view>
				<view class="">
					<text>结算价格</text>
					<text class="leftdata rightdata">不包含运费</text>
				</view>
				<view class="">
					<text>付款方式</text>
					<text class="leftdata rightdata">下单预0%定金；发货前支付0%货到验收合格0日内支付0%货款；0%质保金0日内支付</text>
				</view>
				<view class="">
					<text>发票类型</text>
					<text class="leftdata rightdata">增值税专用发票，税率</text>
				</view>
				<view class="">
					<text>其他说明</text>
					<text class="leftdata rightdata">测试使用</text>
				</view>
			</view>
		</view>
		<view class="spliceline">
		</view>
		<!-- 签收信息 -->
		<view class="signFor">
			<view class="contracttig">
				<image src="../../static/assets/03icon_qsxx.svg" mode="" class="imageicon"></image>
				签收信息
			</view>
			<view class="imagebox">
				<view class="signTitle">
					2020-12-07
				</view>
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
		<view class="spliceline">
		</view>
		<!-- 确认结款 -->
		<view class="affirmmoney" @click="enterapplysuccess">
			确认结款
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
			enterapplysuccess(){
				uni.navigateTo({
					url:'../applysuccess/applysuccess'
				})
			}
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
				background:rgba(245,250,255,1);
				border-radius:4px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.materialsname{
			height: 366rpx;
			padding: 20rpx 20rpx 20rpx 60rpx;
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
					width: 340rpx;
					text-align: center;
				}
				.rightdata{
					text-align: right;
				}
			}
		}
	}
	.orderDetail{
		height: 660rpx;
	}
	// 签收信息
	.signFor{
		height: 440rpx;
		padding: 0 30rpx;
		.contracttig{
			height: 100rpx;
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:100rpx;
			padding-left: 60rpx;
			position: relative;
			padding-top: 10rpx;
			.imageicon{
				height: 36rpx;
				width: 36rpx;
				position: absolute;
				top: 40rpx;
				left: 0;
			}
		}
		.imagebox{
			height: 340rpx;
			.signTitle,.fahuocode{
				margin: 0rpx 0 20rpx 60rpx;
				font-size:12px;
				font-family:DIN-Regular,DIN;
				font-weight:400;
				color:rgba(51,51,51,1);
				text{
					color: rgba(13,128,247,1);
					text-decoration: underline;
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
					background-color: rgba(245,250,255,1);
				}
			}
		}
	}
	// 确认结款
	.affirmmoney{
		width:690rpx;
		height:90rpx;
		margin: 40rpx auto;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		border-radius:2px;
		text-align: center;
		line-height: 90rpx;
		color: #FFFFFF;
		font-size:16px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
	}
</style>
