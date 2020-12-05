<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">商品评价</block>
		</cu-custom>
		<view class="condetail" v-for="(item,index) in goodsAppraises" :key="index">
			<view class="cd-title">
				<view class="cd-left">
					<view class="cu-avatar round">
						<image src="../../../static/management/01-1@3x.png" v-if="!item.headimgUrl" class="tx-image"></image>
						<image v-else :src="item.headimgUrl" class="tx-image"></image>
					</view>
					<view class="cd-name">
						<text style="font-weight: bold;"> {{item.nickName ? item.nickName : '匿名'}}</text>
						<rate :value="item.goodsScore" disabled :size="24" style="width: 100%;"></rate>
					</view>
				</view>
				<view class="cd-date">{{item.createTime}}</view>
			</view>
			<view class="cd-info">
				{{item.content ? item.content : '此人很懒没写评语'}}
			</view>
			<view class="cd-imagebox" v-if="item.picUrls">
				<!-- <image v-for="it" src="item" mode=""></image> -->
				<image v-for="(item,index) in item.picUrls" :src="item" :key="index" />
			</view>
			<view class="cd-bussname">
				{{item.goodsSpu.name}}({{item.specInfo}})
			</view>
			<view class="shoptime">
				购买日期：{{item.goodsSpu.createTime}}
			</view>
		</view>
	</view>
</template>

<script>
	import rate from '../../../components/rate.vue'
	export default {
		components: {
			rate
		},
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
				goodsAppraises: []
			};
		},
		mounted() {
			this.goodsAppraisesPage()
		},
		methods: {
			onChange(d) {
				// console.log(d)
			},
			goodsAppraisesPage() {
				this.$http.goodsAppraisesPage(this.page).then(res => {
					// console.log(res.data.data.records)
					let goodsAppraises = res.data.data.records
					this.goodsAppraises =  [...this.goodsAppraises, ...goodsAppraises]
					// console.log(this.goodsAppraises)
					if (goodsAppraises.length < this.page.size) {
							this.loadmore = false
					}
				})
			}
		},
		onReachBottom() {
		  if (this.loadmore) {
		    this.page.current =  this.page.current + 1
		    this.goodsAppraisesPage()
		  }
		},
	}
</script>

<style lang="scss">
	.condetail {
		width: 92%;
		padding: 30rpx 0;
		margin: 0 auto;
		// margin-bottom: 30rpx;
		border-bottom: 1px solid rgba(234, 234, 234, 1);
	}

	.cd-title {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cd-title image {
		width: 52rpx;
		height: 52rpx;
	}

	.cd-left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.tx-image{
			border-radius: 50%;
		}
	}

	.cd-name {
		font-size: 14px;
		/* font-family:PingFangSC-Regular,PingFang SC; */
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		text-align: left;
	}

	.cd-name text {
		width: 100%;
		height: 40rpx;
	}

	.cd-name image {
		width: 116rpx;
		height: 20rpx;
	}

	.cd-date {
		font-size: 12px;
		/* font-family:PingFangSC-Regular,PingFang SC; */
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}

	.cd-info {
		width: 100%;
		/* height: 144rpx; */
		font-size: 12px;
		/* font-family:PingFangSC-Regular,PingFang SC; */
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 18px;
		margin: 30rpx 0;
	}

	.cd-bussname {
		width: 100%;
		height: 72rpx;
		font-size: 12px;
		/* font-family:PingFangSC-Regular,PingFang SC; */
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 18px;
	}

	.shoptime {
		width: 100%;
		font-size: 12px;
		/* font-family:PingFangSC-Regular,PingFang SC; */
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 17px;
		margin-top: 20rpx;
	}

	.cd-imagebox {
		width: 100%;
		height: 480rpx;
	}

	.cd-imagebox image {
		width: 440rpx;
		height: 440rpx;
	}
</style>
