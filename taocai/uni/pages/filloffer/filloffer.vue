<template>
	<view class="bigContent">
		<!-- :style="[{height:srcHeight + 'px'}]" -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">报价填写</block>
		</cu-custom>
		<view class="main_container" v-for="(item,index) in datalist" :key="index">
			<!-- 基本信息 -->
			<view class="basicInfo">
				<view class="firstline">
					<view class="iconbasic"></view>
					基本信息
				</view>
				<view class="">
					材料：<text>{{item.spuName}}</text>
				</view>
				<view class="">
					规格型号：<text>{{item.specInfo?item.specInfo:'无规格'}}</text>
				</view>
				<view class="" style="margin: 0;">
					需求数量：<text>{{item.quantity}}</text>
				</view>
				<!-- <view class="">
					订单备注：<text>无</text>
				</view> -->
			</view>
			<view class="spliceline">
			</view>
			<!-- 表单填写 -->
			<view class="frominfo">
				<view class="priceinfo">
					<view class="">
						<text class="text-red text-bold">*</text><text class="tag-blue" style="margin: 0 20rpx;">销售价格</text>(单价/元)
					</view>
					<input type="digit" placeholder="请输入您的销售价格" name="input" value="item.salesPrice" v-model="salesPrice[index]" @input="inputPrice(index)"></input>
				</view>
				<!-- 订单备注 -->
				<view class="usermessage">
					<text class="tag-blue">商品备注</text>
					<input type="text"  placeholder="请输入您的备注信息" name="input" value="item.remark" v-model="remark[index]" @input="inputMessage(index)" style="color: #333;"></input>
				</view>
			</view>
		</view>
		<!-- 订单留言 -->
		<view class="remark">
			<text class="tag-blue">订单留言</text>
			<view class="">
				{{usermessage?usermessage:''}}
			</view>
		</view>
		<!-- 结算 -->
		<view class="bottom_offer">
			<view class="bottom_left">
				报价金额<text style="color:  rgba(2, 160, 254, 1);font-size: 14px;margin-left: 40rpx;">￥</text><text style="font-size: 20px;color: rgba(2, 160, 254, 1);font-weight: bold;">{{allprice=='NaN'?'':allprice}}</text>
			</view>
			<view class="bottom_right" @click="enterInfoSelect">
				立即报价
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 屏幕高度
				srcHeight:'',
				// 是否第一次进入
				isfirst:1,
				salesPrice:[],//销售价格
				remark:[], //商品备注
				usermessage:'',//订单留言
				orderlist:[],
				datalist:[],
				allprice:0,//订单总额
				orderId:'',//订单ID
			};
		},
		onLoad(options) {
			this.isfirst = options.isfirst
			this.orderId = options.id
			this.$http.getOne({
				id:options.id
			}).then(res=>{
				this.usermessage = res.data.data.userMessage 
			})
			this.$http.orderInfoOne({
				orderId:options.id
			}).then(res=>{
				this.datalist = res.data.data.records
				for(var i=0;i<this.datalist.length;i++){
					this.allprice+=Math.floor(parseFloat(this.datalist[i].salesPrice)*parseFloat(this.datalist[i].quantity)*100)/100
					this.salesPrice.push(this.datalist[i].salesPrice)
					this.remark.push(this.datalist[i].remark) 
				}
			})
		},
		onShow() {
			const res=  uni.getSystemInfoSync()
			this.srcHeight = res.screenHeight
		},
		methods:{
			//价格
			inputPrice(index){
				let allprice = 0 
				this.datalist.forEach((item,index)=>{
					item.salesPrice = this.salesPrice[index]
					this.allprice = 0
					allprice += parseFloat(item.salesPrice)*parseFloat(item.quantity)
				})
				this.allprice = allprice.toFixed(2)
			},
			//备注
			inputMessage(index){
				for(var i=0;i<this.datalist.length;i++){
					this.datalist[i].remark = this.remark[i]
				}
			},
			enterInfoSelect(){
				this.$http.postquestionInfo(JSON.stringify(this.datalist)).then(res=>{
					// console.log(res.data)
					if(res.data.ok){
						// uni.showToast({
						// 	icon:'none',
						// 	title:"报价成功"
						// })
						let url = '/pages/infoselect/infoselect'
						let param = {
							id: this.orderId
						}
						this.$navTo.togo(url, param)
					}else{
						uni.showToast({
							icon:'none',
							title:"报价失败"
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.bigContent {
		width: 100%;
		height: 100vh;
		background: rgba(245, 250, 255, 1);
		overflow: auto;
		padding-bottom:140rpx ;
		.main_container{
			background-color: #FFFFFF;
			width: 690rpx;
			margin: 40rpx auto;
			border-radius: 5px;
			box-shadow:-2px -2px 4px 0px rgba(229,238,255,0.5),2px 2px 4px 0px rgba(24,79,186,0.2);
		}
		.basicInfo {
			width: 690rpx;
			box-sizing: border-box;
			font-size: 14px;
			padding: 40rpx 40rpx 30rpx 40rpx ;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 20px;
			background: rgba(254, 255, 255, 1);
			border-radius: 10rpx 10rpx 0 0 ;
			
			view {
				margin-bottom: 20rpx;
			}

			.firstline {
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 22px;
				padding-left: 40rpx;
				position: relative;

				.iconbasic {
					width: 8rpx;
					height: 36rpx;
					background: linear-gradient(90deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
					border-radius: 2px;
					position: absolute;
					top: 4rpx;
					left: 0;
				}
			}
		}

		.frominfo {
			width: 690rpx;
			padding: 30rpx 40rpx 40rpx 40rpx;
			box-sizing: border-box;
			background: rgba(254, 255, 255, 1);
			border-radius:  0  0 10rpx 10rpx;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 17px;
			margin: 0 auto;

			.priceinfo,
			.brandinfo,
			.usermessage {
				height: 125rpx;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				border-bottom: 2rpx solid #EAEAEA;
				position: relative;

				.tag-blue {
					font-weight: bold;
					color: rgba(13, 128, 247, 1);
					line-height: 20px;
				}
				input {
					
				}
			}
		}

		.bottom_offer {
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			box-shadow:0px -1px 2px 0px rgba(0,0,0,0.1);
			z-index: 100;
			.bottom_left {
				width: 61.8%;
				height: 100rpx;
				padding: 30rpx;
				background: rgba(255, 255, 255, 1);
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 50rpx;
			}

			.bottom_right {
				position: absolute;
				top: -2rpx;
				right: 0;
				width: 38.2%;
				height: 102rpx;
				text-align: center;
				background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
				font-size: 16px;
				box-shadow:0px -1px 2px 0px rgba(0,0,0,0.1);
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 100rpx;
			}
		}
}
		.spliceline {
			width: 610rpx;
			height: 20rpx;
			margin: 0 auto;
			background: rgba(245, 250, 255, 1);
			border-radius: 5px;
		}
		.remark{
			height: 160rpx;
			width: 690rpx;
			padding: 20rpx 40rpx;
			margin: 20rpx auto;
			background: rgba(254, 255, 255, 1);
			border-radius:  10rpx;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			
			.tag-blue {
				font-weight: bold;
				color: rgba(13, 128, 247, 1);
				line-height: 20px;
			}
			input {
				border-bottom: 2rpx solid #EAEAEA;
			}
		}
</style>
