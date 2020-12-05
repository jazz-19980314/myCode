<template>
	<view>
		<view class="cu-list">
			<view class="cu-bar search bg-blue">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="searchKeyword" type="text" placeholder="请输入公司名" confirm-type="search" @confirm="searchHandle"></input>
					<text @click="searchClick" class="text-sm margin-right text-blue">搜索</text>
				</view>
			</view>
			<view class="solid-bottom padding" v-for="(item,index) in policyList" :key="item.id" @click="getByname(item)">
				<view class="text-bold margin-bottom-sm flex align-center justify-between">
					<view class="flex align-center">
						<view class="text-blue text-bold text-xl">{{index+1}}</view>
						<text class="margin-left-sm">{{item.companyName}}</text>
					</view>
				</view>
				<text class="text-gray margin-left">奖补金额：{{item.capital?item.capital:''}}</text>
				<view class="text-gray margin-left">
					项目、荣誉名称：{{item.remark}}
				</view>
			</view>
		</view>
		<view v-if="policyList.length == 0" class="padding text-center">
			暂无相关公司！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				policyList:[],
				loodMore:true,
				searchKeyword:'',
				page:{
					current:1,
					size:10,
					name:"",
					companyName:''
				}
			}
		},
		onLoad(options) {
			this.page.name = options.name
			this.getDetail(this.page)
		},
		methods: {
			getDetail(page){
				this.$http.getListByName(page).then(res=>{
					var data = res.data.data.records
					this.policyList = [...this.policyList,...res.data.data.records]
					if(data.length < data.length){
						this.loodMore = false
					}
				})
			},
			searchClick() {
				if(this.searchKeyword){
					this.page.companyName = this.searchKeyword
					this.policyList = []
					this.getDetail(this.page)
				}else{
					this.page.companyName = ''
					this.policyList = []
					this.getDetail(this.page)
				}
			},
		},
		onReachBottom() {
			if(this.loodMore){
				this.page.current = this.page.current+1
				this.getDetail(this.page)
			}
		}
	}
</script>

<style>

</style>
