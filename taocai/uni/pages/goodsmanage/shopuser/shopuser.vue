<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">商城用户</block>
		</cu-custom>
		<view class="userlist" v-for="(item,index) in userlist" :key="index">
			<image :src="item.headimgUrl?item.headimgUrl:'../../../static/management/01-1@3x.png'" class="tx-image"></image>
			<!-- 具体信息 -->
			<view class="userinfo">
				<view class="username">
					{{item.nickName?item.nickName:'匿名用户'}}
				</view>
				<view class="">
					手机号：{{item.phone?item.phone:'无'}}
				</view>
				<view class="">
					地区：{{item.province?item.province:'无'}}
				</view>
				<view class="" v-if="item.sex == 1">
					性别：女
				</view>
				<view class="" v-else-if="item.sex == 2">
					性别：男
				</view>
				<view class="" v-else>
					性别：未知
				</view>
				<view class="">
					创建时间：{{item.createTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: {
					current: 1,
					size: 10,
					descs: 'create_time'
				},
				parameter: {
				},
				loadmore: true,
				userlist:[],
				
			};
		},
		onLoad() {
			this.getMallUser()
		},
		methods:{
			getMallUser(){
				this.$http.mallUser(this.page).then(res=>{
					var userlist = res.data.data.records
					this.userlist = [...this.userlist,...userlist]
					if(userlist.length < this.page.size){
						this.loadmore = false
					}
				})
			}
		},
		onReachBottom() {
			if(this.loadmore){
				this.page.current =  this.page.current + 1
				this.getMallUser()
			}
		}
	}
</script>

<style lang="scss">
.userlist{
	width: 100%;
	padding: 30rpx;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(234,234,234,1);
}
.tx-image{
	width: 208rpx;
	height: 208rpx;
	margin-right: 40rpx;
}
.userinfo{
	text-align: left;
	font-size:12px;
	// font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:36rpx;
	.username{
		font-size:16px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-bottom: 20rpx;
	}
}
</style>
