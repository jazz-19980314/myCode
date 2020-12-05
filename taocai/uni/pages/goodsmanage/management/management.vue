<template>
	<view class="bigcontainer">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">商品管理</block>
		</cu-custom>
		<view class="topbgc"></view>
		<view class='searchInput999'>
			<view class='searchBox999'>
				<text class="cuIcon-search"></text>
			</view>
			<input class='input999' placeholder="请输入您要查询的商品名" placeholder-style="color:#ffffff;" @input="searchname" v-model="name"></input>
		</view>
		<!-- 商品列表 -->
		<view class="contents" v-if="goodslist.length">
			<view class="con-detail" v-for="(data,index) in goodslist" :key="index">
				<view class="con-top">
					<image :src="data.picUrls[0]" mode="heightFix"></image>
					<view class="con-right">
						<view class="con-goodsname">
							{{data.name}}
						</view>
						<view class="goodstype" v-if="data.specType == 0">
							规格型号：统一规格
						</view>
						<view class="goodstype" v-else>
							规格型号：多规格
						</view>
						<view class="goodsprice">
							<text>￥{{data.priceDown}}</text>
							<text class="yishou">已售：{{data.saleNum?data.saleNum:'0'}}</text>
						</view>
					</view>
				</view>
				<view class="con-bottom">
					<view class="" @click="entergoodschange(data.id)">
						编辑商品
					</view>
					<view class="" @click="delgoods(data.id)">
						删除商品
					</view>
					<view class="shangjia" style="border: none;height: 100%;">
						<text class="title" style="margin-right: 10rpx;" v-if="data.shelf==1">
							已上架
						</text>
						<text class="title" style="margin-right: 10rpx;" v-else>
							未上架
						</text>
						<switch class="green radius sm" :checked="data.shelf==1?true:false" :id="index" @change="switchChange($event,index,data.id)"></switch>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表空状态 -->
		<view class='noCard' v-else>
			<image src="../../../static/assets/kzt_1.svg" mode="widthFix"></image>
			<view class="" style="margin-top: 40rpx;">
				暂无数据,请及时发布商品
			</view>
			<view class="succontinue" @click="entermall">
				去发布商品
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// ischecked:false,
				name:'',
				goodslist: [], //商品列表
				current: 1, //请求的页数
				total: 1, //数据总长度
				goodsdetail:[],//商品详情
				loodMore:true,
				page:{
					size:10,
					current:1,
					specType:0
				}
			};
		},
		onLoad() {
			this.getAllGoodsss(this.page);
			// this.$http.getPage({
			// 	current: 1,
			// 	size: -1
			// }).then(res => {
			// 	this.total = res.data.data.total;
			// 	var data = res.data.data.records;
			// 	this.goodslist = data.filter(item=>item.specType == '0')
			// })
		},
		methods: {
			getAllGoodsss(page){
				this.$http.getallGoods(page).then(res => {
					var data = res.data.data.records;
					this.goodslist = [...this.goodslist,...data];
					if(data.length < this.page.size){
						this.loodMore = false
					}
				})
			},
			searchname(){
				this.$http.searchName({
					name:this.name
				}).then(res=>{
					// this.goodslist.length = 0
					// console.log(res.data)
					// console.log(JSON.parse(res.data))
					this.goodslist = res.data.data.records
				})
				if(!this.name){
					uni.redirectTo({
						url:'../management/management'
					})
				}
			},
			//去商城管理
			entermall(){
				uni.switchTab({
					url:'../postgoods/postgoods'
				})
			},
			//商品上下架
			switchChange(e,index,id) {
				this.$http.putshelfgoods({
					ids:id,
					shelf:e.detail.value?'1':'0'
				}).then(res => {
					if(res.data.ok){
						this.goodslist[index].shelf = e.detail.value
						if (e.detail.value) {
							uni.showToast({
								icon: 'none',
								title: '商品已上架'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '商品已下架'
							});
						}
					}
				})
			},
			//编辑商品
			entergoodschange(id) {
				let obj = {
					id: id,
					title: "编辑商品"
				}
				uni.navigateTo({
					url: `/pages/goodsmanage/goodschange/goodschange?data=${encodeURIComponent(JSON.stringify(obj))}`
				})
			},
			// 删除商品
			delgoods(id) {
				uni.showModal({
					title: '提示',
					content: '你确定要删除这个商品吗',
					success: (res) => {
						if (res.confirm) {
							this.$http.deletegood({
								id:id
							}).then(res=>{
								// console.log(res)
								if(res.data.ok){
									uni.showToast({
										icon:'none',
										title: '删除成功'
									})
									uni.redirectTo({
										url:'../management/management'
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
			if(this.loodMore){
				this.page.current++;
				this.getAllGoodsss(this.page);
			}
		}
	}
</script>

<style lang="scss">
	.bigcontainer {
		width: 100%;
		background-color: rgba(245, 250, 255, 1);
	}

	.contents {
		// height: 100%;
		width: 100%;
		padding: 40rpx 30rpx;
		// background: #F5FAFF;
		margin-top: 120rpx;

		.con-detail {
			width: 690rpx;
			height: 282rpx;
			background: rgba(254, 255, 255, 1);
			box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.1);
			border-radius: 6px;
			margin: 0 auto;
			margin-bottom: 30rpx;

			.con-top {
				height: 210rpx;
				width: 100%;
				padding: 20rpx 20rpx 30rpx 20rpx;
				display: flex;
				justify-content: space-between;

				image {
					width: 160rpx;
					height: 160rpx;
				}

				.con-right {
					width: 390rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.con-goodsname {
						font-size: 16px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
						line-height: 40px;
						// height: 40rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.goodstype {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 17px;
					}

					.goodsprice {
						height: 32rpx;
						width: 100%;
						font-size: 12px;
						font-family: Roboto-Medium, Roboto;
						font-weight: bold;
						color: rgba(13, 128, 247, 1);
						line-height: 14px;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.yishou {
							font-size: 12px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							line-height: 17px;
						}
					}
				}
			}

			.con-bottom {
				width: 100%;
				height: 72rpx;
				background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
				border-radius: 0px 0px 6px 6px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				view {
					width: 160rpx;
					height: 40rpx;
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 40rpx;
					border-right: 1px solid #FFFFFF;
				}

				.shangjia {
					width: 200rpx;
					border-right: none;
					display: flex;
					justify-content: space-around;
					align-items: center;
				}
			}
		}
	}

	.topbgc {
		height: 140rpx;
		width: 100%;
		position: fixed;
		top: 120rpx;
		z-index: 102;
		background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
		border-radius: 0px 0px 15px 15px;
	}

	.searchInput999 {
		width: 690rpx;
		height: 72rpx;
		background-image: linear-gradient(270deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.4) 100%);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		// margin-top: 20rpx;
		top: 155rpx;
		z-index: 103;
	}

	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;

		text {
			color: #FFFFFF;
		}
	}

	.input999 {
		color: #FFFFFF;
		width: 80%;
	}
	.noCard {
		width: 470rpx;
		margin: 400rpx auto;
		height: 400rpx;
		display: flex;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		.succontinue{
			width: 100%;
			height: 80rpx;
			background-image: linear-gradient(270deg, #0D80F7 0%, #02A0FE 100%);
			box-shadow: 2px 2px 4px 0 rgba(24,79,186,0.20), -2px -2px 4px 0 rgba(229,238,255,0.50);
			border-radius: 2px;
			color: #FFFFFF;
			line-height: 80rpx;
			margin-top: 40rpx;
			font-size:14px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		image {
			width: 348rpx;
			height: 200rpx;
		}
	}
</style>
