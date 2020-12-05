<template>
	<view style="background:rgba(245,250,255,1);padding-bottom: 100rpx;" :class="ishei?'heivh':''">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">公告信息管理</block>
		</cu-custom>
		<view class="notice" v-for="(item,index) in noticeList" :key="index">
			<view class="no-top">
				<view class="not-left">
					<view class="">
						<text class="textleft">标签</text>
						<text>{{item.tag}}</text>
					</view>
					<view class="">
						<text class="textleft" style="width: 160rpx;">内容</text>
						<text> {{item.content}}</text>
					</view>
					<view class="">
						<text class="textleft">排序</text>
						<text>{{item.sort}}</text>
					</view>
					<view class="">
						<text class="textleft">是否启用</text>
						<switch class="green radius sm" :checked="item.enable==1?true:false" :id="index" @change="switchChange($event,index,item.id)"></switch>
					</view>
				</view>
			</view>
			<view class="action">
				<view class="a-left">
					<view class="deliveryInfo">
						<view>创建时间：{{item.createTime.substring(0,10)}}</view>
					</view>
				</view>
				<view class="a-right">
					<view class="" @click="editInfo(item.id)">
						<image src="../../../static/management/4-icon@3x.png" mode=""></image>
						<text>编辑</text>
					</view>
					<view class="" style="margin-left: 60rpx;" @click="deleteInfo(item.id)">
						<image src="../../../static/management/5-icon@3x.png" mode=""></image>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="addbtn" @click="addNotice">
			<image src="../../../static/management/7-icon@3x.png" mode=""></image>
			新增公告信息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList:[],
				notice:{
					appId:'',
				},
				page: {
					current: 1,
					size: 10,
					ascs:"sort",
					appId:'',
					noticeType:'2'
				},
				parameter: {
				},
				loadmore: true,
				ishei:true
			};
		},
		onLoad() {
			this.getappid()
		},
		// onShow() {
		// 	this.getappid()
		// },
		methods:{
			addNotice(){
				let url = '/pages/goodsmanage/changenotice/changenotice'
				let param = {
					name: 'navto'
				}
				this.$navTo.togo(url, param)
			},
			editInfo(id){
				let url = '/pages/goodsmanage/changenotice/changenotice'
				let param = {
					id: id
				}
				this.$navTo.togo(url, param)
			},
			getappid(){
				this.$http.getAppid().then(res=>{
					this.notice.appId = res.data[0].id
					this.page.appId = res.data[0].id
					this.getNotice()
				})
			},
			getNotice(){
				this.$http.getNotice(Object.assign(this.page)).then(res=>{
					var noticeList = res.data.data.records
					this.noticeList = [...this.noticeList,...noticeList]
					if(noticeList.length>2){
						this.ishei = false
					}
					if(noticeList.length<this.page.size){
						this.loadmore = false
					}
				})
			},
			// 是否启用
			switchChange(e,index,id){
				this.$http.enableNotice({
					id:id,
					enable:e.detail.value?'1':'0'
				}).then(res => {
					if(res.data.ok){
						this.noticeList[index].enable = e.detail.value
						if (e.detail.value) {
							uni.showToast({
								icon: 'none',
								title: '公告已启用'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '公告已关闭'
							});
						}
					}
				})
			},
			//删除公告
			deleteInfo(id){
				uni.showModal({
					title: '提示',
					content: '你确定要删除这条公告吗',
					success: (res) => {
						if (res.confirm) {
							this.$http.delNotice({
								id:id
							}).then(res=>{
								// console.log(res)
								if(res.data.ok){
									uni.showToast({
										icon:'none',
										title: '删除成功'
									})
									uni.redirectTo({
										url:'../addnotice/addnotice'
									})
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								icon:'none',
								title: '取消删除'
							})
						}
					}
				});
			}
		},
		onReachBottom() {
			if(this.loadmore){
				this.page.current = this.page.current + 1
				this.getNotice()
			}
		}
	}
</script>

<style lang="scss">
.heivh{
	height: 100vh;
}
.notice{
	width: 100%;
	padding: 40rpx 30rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	.no-top{
		width: 100%;
		// display: flex;
		// align-items: center;
		.not-left{
			width: 100%;
			font-size:16px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-right: 40rpx;
			view{
				margin-bottom: 30rpx;
				line-height: 44rpx;
				display: flex;
				text-align: left;
				font-size: 14px;
				color:rgba(102,102,102,1);
				text{
					width: 72%;
				}
				.textleft{
					width: 160rpx;
					font-size:16px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-right: 40rpx;
				}
				switch{
					transform:scale(0.7);
				}
			}
		}
		.not-right{
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			view{
				margin-bottom: 30rpx;
				// line-height: 44rpx;
			}
		}
	}
	.action{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.a-left{
			display: flex;
			justify-content: space-between;
			line-height: 52rpx;
			.deliveryInfo{
				color:rgba(102,102,102,1);
				// margin-left: 20rpx;
			}
		}
		.a-right{
			display: flex;
			justify-content: space-between;
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			view{
				image{
					width: 14px;
					height: 14px;
					margin-right: 10rpx;
				}
			}
		}
	}
}
.addbtn{
		width:100%;
		height:100rpx;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		font-size:14px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		line-height: 100rpx;
		text-align: center;
		position: fixed;
		bottom: 0;
		image{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 250rpx;
			width: 16px;
			height: 16px;
		}
	}
</style>
