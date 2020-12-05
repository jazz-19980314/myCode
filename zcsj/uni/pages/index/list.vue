<template>
	<view class="cu-list">
		<view class="cu-bar search bg-blue">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchKeyword" type="text" placeholder="请输入公司名" confirm-type="search" @confirm="searchHandle"></input>
				<text @click="searchClick" class="text-sm margin-right text-blue">搜索</text>
			</view>
			<navigator url="./index">
				<button class="cu-btn round margin-right-sm text-blue" style="">
					新增公司
				</button>
			</navigator>
		</view>
		<view class="cu-item flex padding bg-white radius justify-between align-center solid-bottom" v-for="(item,index) in list" :key="index">
			<view @click="toUpdate(item.id)" class="flex flex-direction justify-start" style="width: 45%;">
				<text class="text-bold" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.name}}</text>
				<text class="text-sm">销售代表:{{item.salesManagerName}}</text>
				<text class="text-sm">注册时间:{{item.establishedTime.substr(0,10)}}</text>
			</view>
			<view class="flex justify-around align-center">
				<navigator :url="'./policy?id='+item.id" class="margin-right-sm">
					<button type="" class="cu-btn round bg-gradual-green">匹配政策</button>
				</navigator>
				<navigator :url="'./target?id='+item.id">
					<button type="" class="cu-btn round bg-gradual-blue">公司指标</button>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				searchKeyword:'',
				page:{
					current:1,
					size:10,
					name:''
				},
				loodMore:true
			};
		},
		onShow() {
			this.list= [];
			this.page.current = 1;
			this.getList(this.page)
		},
		methods:{
			getList(page){
				this.$http.getCompanyList(page).then(res=>{
					var data = res.data.data.records
					this.list = [...this.list,...data]
					if(data.length < this.page.size){
						this.loodMore = false
					}
				})
			},
			searchClick() {
				if(this.searchKeyword){
					this.page.name = this.searchKeyword
					this.list = []
					this.getList(this.page)
				}else{
					this.page.name = ''
					this.list = []
					this.getList(this.page)
				}
			},
			toUpdate(id){
				uni.navigateTo({
					url:`/pages/index/update?id=${id}`
				})
			},
			onReachBottom() {
				if (this.loodMore) {
					this.page.current = this.page.current + 1;
					this.getList(this.page);
				}
			}
		}
	}
</script>

<style lang="scss">
.login{
	display: fixed;
	bottom: 100px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
