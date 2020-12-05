<template>
	<view style="height: 100vh;background-color: #F5FAFF;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">编辑/添加</block>
		</cu-custom>
		<view class="container">
			<view class="main">
				<view class="">
					标签
				</view>
				<input type="text" value="" placeholder="请输入标签" v-model="tag" />
			</view>
			<view class="main">
				<view class="">
					内容(0-25个字)
				</view>
				<input type="text" value="" maxlength="25" placeholder="请输入内容" v-model="content" />
			</view>
			<view class="main">
				<view class="">
					排序
				</view>
				<input type="number" value="" placeholder="请输入排序" v-model="sort" />
			</view>
		</view>
		<view class="setting">
			<text>是否启用</text>
			<switch class="green radius sm" style="transform: scale(0.7);" :checked="enable==1?true:false" @change="switchChange"></switch>
		</view>
		<view class="savebtn" @click="saveBank">
			保存
			<view class="shadowbtn" v-if="tag == '' || content == ''|| sort == ''">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tag: '',
				content: '',
				sort: '',
				enable: '',
				appId:'',
				id:'',
				noticeDetail:null
			};
		},
		onLoad(option) {
			this.getappid()
			if(option.id){
				this.$http.changNotice({id:option.id}).then(res=>{
					this.noticeDetail = res.data.data
					var detail = res.data.data
					this.tag = detail.tag
					this.content = detail.content
					this.sort = detail.sort.toString()
					this.enable = detail.enable
				})
			}
		},
		methods: {
			getappid(){
				this.$http.getAppid().then(res=>{
					this.appId = res.data[0].id
				})
			},
			switchChange(e){
				this.enable = e.detail.value?'1':'0'
			},
			saveBank() {
				if (this.tag == '' || this.content == '' || this.sort == '' || this.enable == '') {
					uni.showToast({
						icon: "none",
						title: "请完善页面信息"
					})
				} else {
					if(this.noticeDetail){
						this.noticeDetail.tag = this.tag
						this.noticeDetail.content = this.content
						this.noticeDetail.sort = this.sort
						this.noticeDetail.enable = this.enable
						// console.log(this.noticeDetail)
						this.$http.enableNotice(this.noticeDetail).then(res=>{
							if(res.data.ok){
								uni.showToast({
									icon: "none",
									title: "编辑公告成功！"
								})
								uni.navigateTo({
									url:'../addnotice/addnotice'
								})
							}else{
								uni.showToast({
									icon: "none",
									title: "新增失败！请检查网络或者联系管理员"
								})
							}
						})
					}else{
						var notice={}
						notice.tag = this.tag
						notice.content = this.content
						notice.sort = this.sort
						notice.enable = this.enable
						notice.appId = this.appId
						notice.noticeType = '2'
						notice.type="2"
						notice.createTime = ''
						notice.page=''
						this.$http.addNotice(notice).then(res=>{
							if(res.data.ok){
								uni.showToast({
									icon: "none",
									title: "新增公告成功！"
								})
								uni.navigateTo({
									url:'../addnotice/addnotice'
								})
							}else{
								uni.showToast({
									icon: "none",
									title: "新增失败！请检查网络或者联系管理员"
								})
							}
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
		// margin: 20rpx auto;
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
