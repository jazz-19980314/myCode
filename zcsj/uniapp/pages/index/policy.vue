<template>
	<view>
		<view class="padding bg-blue text-white flex align-center">
			<image style="height: 50rpx;width: 50rpx;" src="../../static/icon-1.png" mode=""></image>
			<text class="margin-left text-white">{{companyDetail.name}}</text>
		</view>
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" style="margin: 0 80rpx;" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect"
			 :data-id="item.value">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="cu-list" v-if="policyList.length > 0">
			<view class="solid-bottom padding" v-for="item in policyList" :key="item.id" @click="getByname(item)">
				<view class="text-bold margin-bottom-sm flex justify-between align-center">
					<text>{{item.name?item.name:item.policyName}}</text>
				</view>
				<view v-if="TabCur ==1">
					<text class="text-gray">奖补金额：{{item.capital?item.capital:''}}</text>
					<view class="text-gray">
						项目、荣誉名称：{{item.remark}}
					</view>
				</view>
				<view class="" v-if="TabCur == 0">
					<text class="text-gray">申报时间：{{item.acceptedTime}}</text>
				</view>
			</view>
		</view>
		<view v-else class="padding text-center">
			暂无相关政策！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyId: "", //公司ID
				companyDetail: '',
				TabCur:0,
				tabList:[
					{
						name:"匹配政策",
						value:'0'
					},
					{
						name:"已报政策",
						value:'1'
					}
				],
				policyList:[],
				page:{
					current:1,
					size:-1,
					companyId:''
				},
			}
		},
		onLoad(options) {
			this.companyId = options.id
			this.page.companyId = options.id
			this.getDetail()
			this.getPolicy()
		},
		methods: {
			getDetail() {
				this.$http.getCompanyDetail(this.companyId).then((res) => {
					this.companyDetail = res.data.data;
				});
			},
			getPolicy(){
				this.$http.getVirtualNum(this.companyId).then(res=>{
					this.policyList = res.data.data;
				})
			},
			getProject(page){
				this.$http.companyProject(page).then(res=>{
					var data = res.data.data.records
					this.policyList = [...this.policyList,...res.data.data.records]
					if(data.length < data.length){
						this.loodMore = false
					}
				})
			},
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.policyList = []
				if(this.TabCur == "1"){
					this.getProject(this.page)
				}else{
					this.getPolicy()
				}
			},
			getByname(data){
				if(this.TabCur == "1"){
					uni.navigateTo({
						url:`./policyDetail?name=${data.name}`
					})
				}else{
					uni.navigateTo({
						url:`./detail?id=${data.id}`
					})
				}
			}
		},
		onReachBottom() {
			if(this.loodMore && this.TabCur == "1"){
				this.page.current = this.page.current+1
				this.getProject(this.page)
			}
		}
	}
</script>

<style>

</style>
