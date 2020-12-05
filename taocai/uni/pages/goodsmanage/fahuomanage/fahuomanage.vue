<template>
	<view style="height: 100vh;background-color: #F5FAFF;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">编辑</block>
		</cu-custom>
		<view class="deliveryType">
			<!-- 发票类型 -->
			<view class="invoiceType">
				<view class="deliveryTitle" style="color: rgba(13, 128, 247, 1);">
					发票类型
				</view>
				<view class="invoiceContent">
					<radio-group name="" @change="radioChange">
						<view class="deliveryList">
							<radio style="transform: scale(0.653);" value="1" :checked="shuilvValue=='0'"></radio>
							<view class="deliveryInfo">
								<view>不开票</view>
							</view>
						</view>
						<view class="deliveryList">
							<radio style="transform: scale(0.653);" value="2" :checked="shuilvValue=='1'"></radio>
							<view class="deliveryInfo">
								<view>增值税普通发票<text>【税率3/9/13%】</text>
								</view>
								<view class="cu-form-group">
									<picker @change="commonPickerChange" :value="commonIndex" :range="taxRatePicker">
										<view class="picker">
											{{taxRatePicker[commonIndex]}}
											<text class="cuIcon-unfold iconfold"></text>
										</view>
									</picker>
								</view>
							</view>
						</view>
						<view class="deliveryList">
							<radio style="transform: scale(0.653);" value="3" :checked="shuilvValue=='2'?true:false"></radio>
							<view class="deliveryInfo">
								<view>增值税专用发票<text>【税率3/9/13%】</text>
								</view>
								<view class="cu-form-group">
									<picker @change="specialPickerChange" :value="specialIndex" :range="taxRatePicker">
										<view class="picker">
											{{taxRatePicker[specialIndex]}}
											<text class="cuIcon-unfold iconfold"></text>
										</view>
									</picker>
								</view>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
		<!-- 付款方式 -->
		<view class="paymentType">
			<view class="deliveryTitle">
				付款方式
			</view>
			<view class="paymentContent">
				<view class="paymentItem">
					<text>下单预付</text>
					<input type="number" value="" v-model="dingjin" />%定金；
				</view>
				<view class="paymentItem">
					<text>发货前支付</text>
					<input type="number" value="" v-model="daikuan1" />%货款；
				</view>
				<view class="paymentItem">
					<text>货到验收合格</text>
					<input type="number" value="" v-model="rizhifu1" />日内支付
					<input type="number" value="" v-model="daikuan2" />%货款;
				</view>
				<view class="paymentItem">
					<input type="number" value="" v-model="zibaojin" />%质保金
					<input type="number" value="" v-model="rizhifu2" />日内支付；
				</view>
			</view>
		</view>
		<view class="savebtn">
			保存模板
			<view class="shadowbtn" v-if="dingjin == '' || daikuan1 == ''|| rizhifu1 == ''|| daikuan2 == ''|| zibaojin == ''|| rizhifu2 == ''">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taxRatePicker: ['3%', '9%', '13%'],
				dingjin:'',// 定金
				daikuan1:'',//发货前货款
				rizhifu1:'',//验收日内支付
				daikuan2:'',// 验收贷款
				zibaojin:'',//质保金
				rizhifu2:'',//日内支付
				shuilv:['不开票','增值税普通发票','增值税专业发票'],
				shuilvValue:0,
				commonIndex:0,
				specialIndex: 0,
				index: 0,
			};
		},
		methods:{
			// 单选框改变
			radioChange(e){
				this.shuilvValue = e.detail.value-1
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			// 普通税率选择
			commonPickerChange(e) {
				this.commonIndex = e.detail.value
			},
			// 专用税率选择
			specialPickerChange(e) {
				this.specialIndex = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
// 交货方式
	.deliveryType {
		width: 100%;
		height: 340rpx;
		background-color: #FFFFFF;
		padding: 30rpx 60rpx 0 60rpx;
		margin: 20rpx 0;

		// 发票类型
		.invoiceType {
			width: 100%;
			width: 100%;
			background-color: #FFFFFF;
			padding-top: 30rpx;

			.invoiceContent {
				padding-bottom: 20rpx;

				.deliveryList {
					display: flex;
					justify-content: flex-start;
					margin-top: 20rpx;

					.deliveryInfo {
						margin-left: 20rpx;
						display: flex;
						align-items: center;
						justify-content: space-around;

						.cu-form-group {
							width: 94rpx;
							min-height: 50rpx;
							padding: 0;
							box-sizing: border-box;

							picker {
								.picker {
									width: 94rpx;
									line-height: 50rpx;
									text-align: center;
									border-radius: 4px;
									border: 1px solid rgba(13, 128, 247, 1);
									color: rgba(51, 51, 51, 1);
									font-size: 12px;
									padding-right: 40rpx;
									.iconfold{
										position: absolute;
										font-size: 14px;
										top: 50%;
										right: 10rpx;
										transform: translateY(-50%);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	// 付款方式
	.paymentType {
		width: 100%;
		height: 392rpx;
		padding: 30rpx 0rpx 30rpx 60rpx;
		// margin-top: 100rpx;
		background-color: #FFFFFF;

		.deliveryTitle {
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 500;
			color: rgba(13, 128, 247, 1);
			margin-bottom: 40rpx;
		}

		.paymentContent {
			.paymentItem {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 20rpx;

				input {
					border-bottom: 1px solid rgba(102, 102, 102, 1);
					width: 120rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.savebtn{
		width:690rpx;
		height:80rpx;
		margin: 40rpx auto;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		border-radius:4px;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		position: relative;
		.shadowbtn{
			width:690rpx;
			height:80rpx;
			margin: 0 auto;
			background:#FFFFFF;
			opacity: 0.7;
			border-radius:4px;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	
</style>
