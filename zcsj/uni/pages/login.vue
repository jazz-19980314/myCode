<template>
	<view style="background: #F7F9FB;padding: 32rpx;">
		<image class="logo" src="../static/logo.png"></image>
		<view class="m_title">政策服务云平台</view>
		<view class="cu-form-group margin-top">
			<view class="title">账户</view>
			<input placeholder="请输入账户" v-model="username" name="input"></input>
		</view>
		<view class="cu-form-group margin-top" style="border-top: none;">
			<view class="title">密码</view>
			<input placeholder="请输入密码" v-model="password" name="input" type="text" :password="true"></input>
		</view>
		<view class="cu-form-group margin-top" style="border-top: none;">
			<view class="title">验证码</view>
			<input placeholder="请输入验证码" v-model="code" name="input"></input>
			<image :src="image" class="login-code-img" @click="refreshCode"></image>
		</view>
		<view style="margin: 40px auto;width: 80%;">
			<button class="cu-btn bg-gradual-blue round margin-tb-sm lg login" style="width: 100%;margin:0 auto;" @click="startLogin">
				登 录
			</button>
		</view>
		<view class="logintouser" style="text-align: center;">
			此小程序为公司内部使用，只支持账号密码登录
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				username: '',
				password: '',
				code:'',
				key:'',
				image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
			}
		},
		onLoad() {
			 this.refreshCode();
		},
		onReady() {},
		methods: {
			refreshCode(){
				this.$http.getCaptcha().then(res => {
				  const data = res.data;
				  this.key = data.key;
				  this.image = data.image;
				})
			},
			startLogin() {
				if (this.username.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入账户名'
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
				if (this.code.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				let data = {
					username: this.username,
					password: md5(this.password),
					code: this.code,
					grant_type: 'captcha',
					scope: 'all',
					type: "account",
					tenantId: "000000",
				};
				uni.request({
				    // url: `https://zhuochuang.program66.com/api/blade-auth/oauth/token?tenantId=000000&username=${data.username}&password=${data.password}&grant_type=captcha&scope=all&type=account`, //仅为示例，并非真实接口地址。
					url: `http://111.231.238.159:9090/blade-auth/oauth/token?tenantId=000000&username=${data.username}&password=${data.password}&grant_type=captcha&scope=all&type=account`, //仅为示例，并非真实接口地址。
				    method:"POST",
				    header: {
						'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
				        'Tenant-Id': data.tenantId,
				        'Captcha-Key': this.key,
				        'Captcha-Code': this.code,
				    },
				    success: (res) => {
						if(res.data.user_name){
							uni.setStorage({
								key: 'token',
								data: res.data.access_token
							});
							uni.setStorage({
								key: 'user_info',
								data: res.data
							});
							uni.showToast({
								icon:'none',
								title:'登录成功！'
							})
							uni.switchTab({
								url:'./index/list'
							})
						}else{
							this.refreshCode();
							uni.showToast({
								icon:'none',
								title:res.data.msg?res.data.msg:res.data.error_description
							})
						}
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.logo {
		width: 180px;
		height: 65px;
		margin-top: 50rpx;
	}
	.login-code-img{
		width: 100px;
		height: 40px;
	}
	.m_title {
		width: 100%;
		text-align: left;
		margin-top: 30rpx;
		margin-bottom: 80rpx;
		height: 25px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #062F6D;
		line-height: 25px;
	}

	.box_shadow {
		box-shadow: 0px 5px 15px 0px rgba(12, 131, 248, 0.4);
	}
	.logintouser {
		width: 100%;
		height: 34rpx;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 34rpx;
		margin-top: 40rpx;
		text-align: right;
	}
</style>
