<template>
	<view>
		<view class="cu-list">
			<view class="padding">
				<view class="text-bold margin-bottom-sm flex justify-between align-center">
					<text>{{detail.name}}</text>
				</view>
				<view class="text-gray margin-bottom-sm">
					<text class="text-blue text-bold">奖补资金：</text>{{detail.capital?detail.capital:''}}
				</view>
				<view class="text-gray margin-bottom-sm">
					<text class="text-blue text-bold">政策要求：</text>{{detail.requested}}
				</view>
				<view class="text-blue text-bold margin-bottom-sm">政策相关公司</view>
				<view class='cu-tag radius line-blue margin-bottom-sm' v-for="item in companyList" :key="item.id">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: '',
				companyList: []
			}
		},
		onLoad(options) {
			this.getDeatil(options.id)
			this.getCompany(options.id)
		},
		methods: {
			getDeatil(id) {
				this.$http.getPolicyDetail({
					id: id
				}).then(res => {
					this.detail = res.data.data
				})
			},
			getCompany(id){
				this.$http.getByPolicyId({policyId:id}).then(res=>{
					this.companyList = res.data.data
				})
			}
		}
	}
</script>

<style>

</style>
