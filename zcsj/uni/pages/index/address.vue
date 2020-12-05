<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="message">
				<view class="cu-item flex flex-direction justify-center align-center">
					<view class="cu-avatar round xl head flex" :style="'background-image:url(' + userInfo.avatar + ')'">{{!userInfo.avatar ? '头' : ''}}</view>
					<view class="content text-center margin-top-xs">
						<view class="text-bold margin-top-xs" v-if="userInfo.nick_name">{{userInfo.nick_name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu margin-top-xs shadow-lg radius mine padding">
			<view class="content flex justify-between" @click="handelLogout">
				<text class="text-grey text-df">退出登录</text>
				<text class="cuIcon-right text-blue"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: ""
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('user_info');
		},
		methods: {
			handelLogout(){
				uni.showModal({
				  title: '提示',
				  content: '你确定要退出登录吗',
				  success (res) {
				    if (res.confirm) {
				      uni.redirectTo({
				      	url:"/pages/login"
				      })
					  uni.clearStorageSync()
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
				  }
				})
			}
		}
	}
</script>

<style scoped>
</style>
