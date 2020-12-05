<template>
	<view style="height: 100vh;background-color: #F5FAFF;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">添加个人信息</block>
		</cu-custom>
		<view class="container">
			<view class="main">
				<view class="">
					责任人
				</view>
				<input type="text" value="" placeholder="请输入责任人" v-model="username" />
			</view>
			<view class="main">
				<view class="">
					责任人联系电话
				</view>
				<input type="number" value="" placeholder="请输入责任人联系电话" v-model="userPhone" />
			</view>
			<view class="main">
				<view class="">
					开户行
				</view>
				<input type="text" value="" placeholder="请输入开户行" v-model="bankName" />
			</view>
			<view class="main">
				<view class="">
					账号
				</view>
				<input type="number" value="" placeholder="请输入银行账号" v-model="bankCard" />
			</view>
			<view class="main">
				<view class="">
					开户名
				</view>
				<input type="text" value="" placeholder="请输入预留开户名" v-model="bankPhone" />
			</view>
		</view>
		<!-- <view class="setting">
			<text>设置为默认信息</text>
			<switch class="green radius sm"></switch>
		</view> -->
		<view class="savebtn" @click="saveBank">
			保存
			<view class="shadowbtn" v-if="username == '' || userPhone == ''|| bankName == ''|| bankCard == ''|| bankPhone == ''">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				userPhone: '',
				bankName: '',
				bankCard: '',
				bankPhone: '',
				bankInfo: null
			};
		},
		onLoad() {
			this.$http.bankInfo().then(res => {
				console.log(res.data)
				this.bankInfo = res.data[0]
				this.username = this.bankInfo.username?this.bankInfo.username:''
				this.userPhone = this.bankInfo.userPhone?this.bankInfo.userPhone:''
				this.bankName = this.bankInfo.bankName?this.bankInfo.bankName:''
				this.bankCard = this.bankInfo.bankCard?this.bankInfo.bankCard:''
				this.bankPhone = this.bankInfo.bankPhone?this.bankInfo.bankPhone:''
			})
		},
		computed: {
			UserPhoneRight() {
				return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhone)
			},
			bankCardRight() {
				return /^([1-9]{1})(\d{14}|\d{18})$/.test(this.bankCard)
			}
		},
		methods: {
			saveBank() {
				if (this.username == '' || this.userPhone == '' || this.bankName == '' || this.bankCard == '' || this.bankPhone == '') {
					uni.showToast({
						icon: "none",
						title: "请完善页面信息"
					})
				} else {
					if (this.UserPhoneRight && this.bankCardRight) {
						this.bankInfo.username = this.username
						this.bankInfo.userPhone = this.userPhone
						this.bankInfo.bankName = this.bankName
						this.bankInfo.bankCard = this.bankCard
						this.bankInfo.bankPhone = this.bankPhone
						console.log(this.bankInfo)
						this.$http.putBankInfo(this.bankInfo).then(res => {
							// console.log(res.data)
							if(res.data.ok){
								uni.showToast({
									icon: "none",
									title: "保存信息成功"
								})
								uni.navigateBack()
							}
						})
					} else {
						uni.showToast({
							icon: "none",
							title: "请输入正确信息"
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		padding-left: 30rpx;
		background-color: #FFFFFF;

		.main {
			width: 100%;
			// margin-left: 30rpx;
			height: 160rpx;
			padding-top: 40rpx;
			border-bottom: 1px solid rgba(234, 234, 234, 1);
			background-color: #FFFFFF;

			view {
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 20rpx;
			}

			input {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
	}

	.setting {
		width: 100%;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		margin: 20rpx auto;
	}

	.savebtn {
		width: 690rpx;
		height: 80rpx;
		margin: 40rpx auto;
		background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
		border-radius: 4px;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		position: relative;

		.shadowbtn {
			width: 690rpx;
			height: 80rpx;
			margin: 0 auto;
			background: #FFFFFF;
			opacity: 0.7;
			border-radius: 4px;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
