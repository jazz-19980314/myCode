<template>
	<view class="bigcontainer">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">报价信息选择</block>
		</cu-custom>
		<view class="main-content">
			<!-- 报价时间 -->
			<view class="spliceline">
			</view>
			<view class="offerDate">
				<view class="newsDate">
					<view class="">
						预计发货日期
					</view>
					<view class="cu-form-group">
						<picker mode="date" :value="fahuodate" start="2015-09-01" end="2020-09-01" @change="FahuoDateChange">
							<view class="picker">
								{{fahuodate}}
								<text class="cuIcon-unfold iconfold"></text>
							</view>
						</picker>
					</view>
				</view>
				<view class="newsDate">
					<view class="">
						最迟结款日期
					</view>
					<view class="cu-form-group">
						<!-- <view class="title">日期选择</view> -->
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
								<text class="cuIcon-unfold iconfold"></text>
							</view>
						</picker>
					</view>
				</view>
				<view class="newsDate">
					<view class="">
						报价有效时间到
					</view>
					<view class="cu-form-group">
						<!-- <view class="title">日期选择</view> -->
						<picker mode="date" :value="youxiaodata" start="2015-09-01" end="2020-09-01" @change="YouxiaoDateChange">
							<view class="picker">
								{{youxiaodata}}
								<text class="cuIcon-unfold iconfold"></text>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="spliceline">
			</view>
			<!-- 交货方式 -->
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
			<view class="spliceline">
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
						<!-- <view class="cu-form-group">
							<picker @change="date0PickerChange" :value="date0Index" :range="datePicker">
								<view class="picker">
									{{datePicker[date0Index]}}
									<text class="cuIcon-unfold iconfold"></text>
								</view>
							</picker>
						</view>
						<text>日内支付</text> -->
						<input type="number" value="" v-model="rizhifu1" />日内支付
						<input type="number" value="" v-model="daikuan2" />%货款;
					</view>
					<view class="paymentItem">
						<input type="number" value="" v-model="zibaojin" />%质保金
						<!-- <view class="cu-form-group">
							<picker @change="date1PickerChange" :value="date1Index" :range="datePicker">
								<view class="picker">
									{{datePicker[date1Index]}}
									<text class="cuIcon-unfold iconfold"></text>
								</view>
							</picker>
						</view>
						<text>日内支付；</text> -->
						<input type="number" value="" v-model="rizhifu2" />日内支付；
					</view>
				</view>
			</view>
			<view class="spliceline">
			</view>
			<!-- 其他说明 -->
			<view class="othersInfo">
				<view class="deliveryTitle">
					其他说明
				</view>
				<view class="mytextarea" :class="{textareabgc:isfocus}">
					<textarea placeholder-style="color:#cccccc" placeholder="其他说明" @focus="getfocus" @blur="blurfocus" v-model="othersInfo" :show-confirm-bar='true' :adjust-position="true"/>
					</view>
			</view>
		</view>
		<!-- 提交并报价 -->
		<view class="submitOffer" @click="enterOfferSuccess">
			<view class="">
				提交并报价
			</view>
		</view>
	</view>
</template>

<script>
	import util from "../../util/util.js"
	export default {
		data() {
			return {
				index: 0,
				fahuodate:'',
				date: '',
				youxiaodata:'', //报价时效期
				picker: ['天', '月', '年'],
				// commonTaxRate: '3%',
				commonIndex: 0,
				// specialTaxRate: '9%',
				specialIndex: 0,
				taxRatePicker: ['3%', '9%', '13%'],
				// 是否获取焦点
				isfocus:true,
				srcHeight:'',
				dingjin:'0',// 定金
				daikuan1:'0',//发货前货款
				rizhifu1:'0',//验收日内支付
				daikuan2:'0',// 验收贷款
				zibaojin:'0',//质保金
				rizhifu2:'0',//日内支付
				othersInfo:'',//其他说明
				shuilv:['不开票','增值税普通发票','增值税专业发票'],
				shuilvValue:0,
				datalist:'',
				userMessage:'' //备注信息
			};
		},
		onLoad(options) {
			this.fahuodate  = util.formatTime(new Date())
			this.date  = util.formatTime(new Date())
			this.youxiaodata  = util.formatTime(new Date())
			this.$http.getOne({
				id:options.id
			}).then(res=>{
				this.datalist = res.data.data
				this.fahuodate = this.datalist.estimateDeliveryTime?this.datalist.estimateDeliveryTime:this.fahuodate
				this.date = this.datalist.payClosingDate?this.datalist.payClosingDate:this.date
				this.youxiaodata = this.datalist.quoteClosingDate?this.datalist.quoteClosingDate:this.youxiaodata
				this.othersInfo = this.datalist.remark
				if(this.datalist.remarkInfo2 && this.datalist.remarkInfo1){
				this.dingjin = JSON.parse(this.datalist.remarkInfo2).dingjin
				this.daikuan1 = JSON.parse(this.datalist.remarkInfo2).daikuan1
				this.rizhifu1 = JSON.parse(this.datalist.remarkInfo2).rizhifu1
				this.daikuan2 = JSON.parse(this.datalist.remarkInfo2).daikuan2
				this.zibaojin =JSON.parse(this.datalist.remarkInfo2).zibaojin
				this.rizhifu2 = JSON.parse(this.datalist.remarkInfo2).rizhifu2
				var temp = []
				var cascader = this.datalist.remarkInfo1.split("|")
				this.shuilvValue = this.shuilv.indexOf(cascader[0].replace(/\s+/g,""))
				if(this.shuilvValue==1){
					this.commonIndex = this.taxRatePicker.indexOf(cascader[1].replace(/\s+/g,""))
				}
				if(this.shuilvValue==2){
					this.specialIndex = this.taxRatePicker.indexOf(cascader[1].replace(/\s+/g,""))
				}
				}
			})
		},
		onShow() {
			const res=  uni.getSystemInfoSync()
			this.srcHeight = res.screenHeight
		},
		methods: {
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
			DateChange(e) {
				this.date = e.detail.value
				this.datalist.payClosingDate = this.date
			},
			FahuoDateChange(e){
				this.fahuodate = e.detail.value
				this.datalist.estimateDeliveryTime = this.fahuodate
			},
			YouxiaoDateChange(e){
				this.youxiaodata = e.detail.value
			},
			// 获取焦点
			getfocus(){
				this.isfocus = false
			},
			// 失去焦点
			blurfocus(){
				this.isfocus = true
			},
			// 报价成功
			enterOfferSuccess(){
				var remarkInfo2 = {}
				remarkInfo2.dingjin = this.dingjin
				remarkInfo2.daikuan1 = this.daikuan1
				remarkInfo2.rizhifu1 = this.rizhifu1
				remarkInfo2.daikuan2 = this.daikuan2
				remarkInfo2.zibaojin = this.zibaojin
				remarkInfo2.rizhifu2 = this.rizhifu2
				if(this.shuilvValue==0){
					this.datalist.remarkInfo1 = this.shuilv[this.shuilvValue]
				}
				if(this.shuilvValue==1){
					this.datalist.remarkInfo1 = this.shuilv[this.shuilvValue]+'|'+this.taxRatePicker[this.commonIndex]
				}
				if(this.shuilvValue==2){
					this.datalist.remarkInfo1 = this.shuilv[this.shuilvValue]+'|'+this.taxRatePicker[this.specialIndex]
				}
				
				this.datalist.remarkInfo2 = JSON.stringify(remarkInfo2)
				this.datalist.remark = this.othersInfo
				this.datalist.estimateDeliveryTime = this.fahuodate
				this.datalist.payClosingDate = this.date
				this.datalist.quoteClosingDate = this.youxiaodata
				// console.log(this.datalist)
				this.$http.postoneOrder(this.datalist).then(res=>{
					if (res.data.ok) {
						uni.showToast({
							icon: 'none',
							title:"报价成功"
						})
						uni.navigateTo({
							url:'../offersuccess/offersuccess'
						})
					}else{
						uni.showToast({
							icon: 'none',
							title:"报价失败，请检查网络"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.bigcontainer {
		width: 100%;
		// background-color: rgba(245, 250, 255, 1);
	}
	.main-content{
		width: 100%;
		// margin-top: 30rpx;
	}
	// 报价日期
	.offerDate {
		height: 280rpx;
		width: 100%;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: rgba(13, 128, 247, 1);
		line-height: 20px;
		padding: 20rpx 60rpx 30rpx 60rpx;
		background-color: #FFFFFF;
		// margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.newsDate {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 450rpx;
			min-height: 50rpx;
			margin-top: 20rpx;
			.cu-form-group {
				height: 50rpx;
				width: 216rpx;
				padding: 0;
				min-height: 50rpx;
				box-sizing: border-box;

				picker {
					.picker {
						width: 216rpx;
						line-height: 50rpx;
						text-align: center;
						border-radius: 4px;
						border: 1px solid rgba(13, 128, 247, 1);
						color: rgba(51, 51, 51, 1);
						font-size: 12px;
						padding-right: 40rpx;
						position: relative;
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

	// 交货方式
	.deliveryType {
		width: 100%;
		height: 340rpx;
		background-color: #FFFFFF;
		padding: 30rpx 60rpx 0 60rpx;
		// margin-bottom: 20rpx;

		// 发票类型
		.invoiceType {
			width: 100%;
			width: 100%;
			background-color: #FFFFFF;
			padding-top: 30rpx;
			// margin-top: 30rpx;

			.invoiceContent {
				padding-bottom: 20rpx;
				// border-bottom: 1px solid rgba(234, 234, 234, 1);

				.deliveryList {
					display: flex;
					justify-content: flex-start;
					margin-top: 20rpx;

					// align-items: center;
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
		padding: 30rpx 0rpx 0rpx 60rpx;
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

				.cu-form-group {
					width: 94rpx;
					min-height: 50rpx;
					padding: 0;
					box-sizing: border-box;
					margin: 0 10rpx;

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

	// 其他说明
	.othersInfo {
		width: 100%;
		height: 390rpx;
		background-color: #FFFFFF;
		padding: 30rpx 60rpx;
		margin-top: 20rpx;

		.deliveryTitle {
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 500;
			color: rgba(13, 128, 247, 1);
			margin-bottom: 40rpx;
		}

		.mytextarea {
			border: 1px solid rgba(13, 128, 247, 1);
			height: 240rpx;
			border-radius: 3px;
			margin-bottom: 40rpx;
			textarea {
				height: 100%;
				width: 100%;
				padding: 20rpx 0 0 30rpx;
			}
		}

		.textareabgc {
			background: rgba(245, 250, 255, 1);
			border: 1px solid #CCCCCC;
		}
	}
// 提交并报价
.submitOffer{
	width:100%;
	height:98rpx;
	padding: 0 30rpx;
	line-height: 98rpx;
	font-size:16px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(255,255,255,1);
	view{
		width: 100%;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		border-radius:2px;
		margin: 40rpx 0;
		text-align: center;
	}
}
	.spliceline {
		width: 100%;
		height: 30rpx;
		background: rgba(245, 250, 255, 1);
	}
</style>
