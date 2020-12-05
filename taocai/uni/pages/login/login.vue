<template>
	<view class="main">
		<image src="../../static/login/bg-c.png" mode="widthFix" class="banner" style="height: 400rpx;"></image>
		<image src="https://qtvedio.oss-cn-qingdao.aliyuncs.com/1286144732258635776/material/8b3a36e4-40ef-4908-8511-271d41a2955d.png" mode="" class="tclogo"></image>
		<!-- <view class="tctitle">
			一淘在手，采售无忧
		</view> -->
		<view class="logintype" v-if="loginType">
			手机号快捷登录
		</view>
		<view class="logintype" v-else>
			账户密码登录
		</view>
		<!-- 手机号登录 -->
		<view class="loginInput" v-if="loginType">
			<view class="usInput">
				<view class="inputIcon">
					<image src="../../static/login/sj_icon.svg" mode=""></image>
				</view>
				<input type="text" value="" v-model="phone" placeholder="请输入11位手机号" placeholder-style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);text-align:left;" />
			</view>
			<view class="pwdInput">
				<view class="inputIcon">
					<image src="../../static/login/yzm_icon.svg" mode=""></image>
				</view>
				<input type="text" value="" v-model="code" placeholder="请输入验证码" placeholder-style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);text-align:left;" />
				<view class="yzm" @click="getCode" v-if="!countDown">
					获取验证码
				</view>
				<button class="yfs" type="default" disabled v-else :plain='true'>
					重新获取（{{countDown}}秒）
				</button>
			</view>
			<view class="loginBtn" @click="loginByPhone">
				登录
			</view>
			<view class="logintouser" @click="checkLoginType">
				账号密码登录>
			</view>
		</view>
		<!-- 账户密码登录 -->
		<view class="loginInput logginbyuser" v-else>
			<view class="usInput">
				<view class="inputIcon">
					<image src="../../static/login/zh_icon.svg" mode=""></image>
				</view>
				<input type="text" value="" v-model="username" placeholder="账号/手机号" placeholder-style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);text-align:left;" />
			</view>
			<view class="pwdInput">
				<view class="inputIcon">
					<image src="../../static/login/mm_icon.svg" mode=""></image>
				</view>
				<input type="password" value="" v-model="password" placeholder="请输入密码" placeholder-style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);text-align:left;" />
			</view>
			<view class="loginBtn" @click="loginByuser">
				登录
			</view>
			<view class="logintouser" style="text-align: center;color: #999;">
				此小程序为商家后台，只支持账号密码登录
			</view>
			<!-- <view class="logintouser" @click="checkLoginType">
				手机号快捷登录>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				//18855360701
				password: '',
				phone: '',
				// 验证码
				code: '',
				// 当前屏幕宽度
				scrHeight: '',
				//登录类型true为手机号登录false为用户名登录
				loginType: false,
				// 是否发送验证码
				issend: false,
				// 倒计时
				countDown: 0
			};
		},
		computed: {
			// 验证手机号是否合理
			phoneRight() {
				return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
			}
		},
		mounted() {},
		methods: {
			// 获取验证码
			getCode() {
				if (this.phoneRight) {
					this.countDown = 90;
					this.intervalId = setInterval(() => {
						this.countDown--;
						// 判断
						if (this.countDown === 0) {
							clearInterval(this.intervalId);
						}
					}, 1000);
				} else {
					uni.showModal({
						title: '请输入正确手机号',
						position: 'center'
					})
				}
			},
			// 切换登录类型
			checkLoginType() {
				this.loginType = !this.loginType
			},
			getScreenHeight() {
				uni.getSystemInfo({
					success(res) {
						// console.log(res.screenHeight)
						this.scrHeight = res.screenHeight
					}
				})
			},
			// 验证码登录
			loginByPhone() {
				if (this.phone.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
					return;
				} else {
					if (!this.phoneRight) {
						uni.showModal({
							title: '请输入正确手机号',
							position: 'center'
						})
						return;
					}
				}
				if (this.code.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				uni.showToast({
					icon: 'none',
					title: '登录成功'
				});
				// uni.switchTab({
				// 	url: '../center/center',
				// })
			},
			loginByuser() {
				if (this.username.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					});
					return;
				}

				if (this.password.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				// uni.switchTab({
				// 	url: '../center/center',
				// })
				let data = {
					username: this.username,
					password: this.password,
					randomStr: '32423423',
					code: null,
					grant_type: 'password',
					scope: 'server'
				};
				this.$http.login(data).then(res => {
					// console.log(res.data);
					//打印请求返回的数据 
					if (res.data.username) {
						uni.setStorage({
							key: 'token',
							data: res.data.access_token,
							success: function() {
							}
						});
						uni.switchTab({
							url: '../center/center',
						})
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '用户名或密码错误'
						});
					}
				}, error => {
					console.log(error);
				})
			}
		}
	}
</script>

<style lang="scss">
	input {}

	.main {
		.banner {
			width: 100%;
		}

		.tclogo {
			width: 428rpx;
			height: 100rpx;
			position: fixed;
			top: 168rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.tctitle {
			width: 300rpx;
			height: 44rpx;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: rgba(230, 0, 18, 1);
			line-height: 44rpx;
			text-align: center;
			position: fixed;
			top: 264rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.logintype {
			width: 180rpx;
			height: 34rpx;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 34rpx;
			text-align: center;
			position: fixed;
			top: 328rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		// 手机号快捷登录
		.loginInput {
			padding: 0 60rpx;
			margin-top: 100rpx;

			.usInput {
				width: 630rpx;
				height: 80rpx;
				background: rgba(254, 255, 255, 1);
				box-shadow: -2px -2px 4px 0px rgba(229, 238, 255, 0.5), 2px 2px 4px 0px rgba(24, 79, 186, 0.2);
				border-radius: 2px;
				margin-top: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.inputIcon {
					height: 32rpx;
					width: 130rpx;
					position: relative;
					border-right: 1px solid rgba(216, 216, 216, 1);

					image {
						width: 32rpx;
						height: 48rpx;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						left: 60rpx;
					}
				}

				input {
					// flex: 7;
					width: 520rpx;
					padding-left: 30rpx;
				}
			}

			.pwdInput {
				width: 630rpx;
				height: 80rpx;
				background: rgba(254, 255, 255, 1);
				box-shadow: -2px -2px 4px 0px rgba(229, 238, 255, 0.5), 2px 2px 4px 0px rgba(24, 79, 186, 0.2);
				border-radius: 2px;
				margin-top: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;

				.inputIcon {
					height: 32rpx;
					width: 130rpx;
					border-right: 1px solid rgba(216, 216, 216, 1);
					position: relative;

					image {
						width: 32rpx;
						height: 48rpx;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						left: 60rpx;
					}
				}

				input {
					width: 520rpx;
					padding-left: 30rpx;
				}

				.yzm {
					width: 200rpx;
					height: 48rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 40rpx;
					border-radius: 2px;
					border: 1px solid rgba(13, 128, 247, 1);
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(13, 128, 247, 1);
					text-align: center;
					line-height: 48rpx;
					z-index: 100;
				}

				.yfs {
					width: 240rpx;
					height: 48rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 40rpx;
					border-radius: 2px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					text-align: center;
					border-image: rgba(204, 204, 204, 1);
					line-height: 48rpx;
					z-index: 100;
					padding: 0;
				}
			}

			.loginBtn {
				width: 630rpx;
				height: 80rpx;
				margin-top: 100rpx;
				background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
				border-radius: 2px;
				text-align: center;
				line-height: 80rpx;
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}

			.logintouser {
				width: 630rpx;
				height: 34rpx;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(13, 128, 247, 1);
				line-height: 34rpx;
				margin-top: 40rpx;
				text-align: right;
			}
		}

		// 用户名登录
		.logginbyuser {
			.pwdInput {
				position: relative;

				input {
					width: 520rpx;
					padding-left: 30rpx;
				}

			}

		}

	}
</style>
