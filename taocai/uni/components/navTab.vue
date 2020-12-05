<template>
	<view class="navTabBox">
		<view class="longTab">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex;justify-content: space-around;" scroll-with-animation :scroll-left="tabLeft">
					<view class="" style="display: flex;justify-content: space-around;">
						<view class="longItem" :data-index="index"  :class="index===tabClick?'click':''" v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index,item.key)">{{item.value}}</view>
					</view>
				<!-- <view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
					<view class="underline"></view>
				</view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'navTab',
		props: {
			tabTitle: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				tabLeft:0
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					if(that.tabTitle.length<= 5 ){
						that.isWidth = e.windowWidth / that.tabTitle.length //宽度除以导航标题个数=一个导航所占宽度	
					} else {
						that.isWidth = e.windowWidth / 5 
					}
				}
			})
		},
		methods: {
			// 导航栏点击
			longClick(index,key){
				if(this.tabTitle.length>5){
					var tempIndex = index - 2;
					tempIndex = tempIndex<=0 ? 0 : tempIndex;
					this.tabLeft = (index-2) * this.isWidth //设置下划线位置
				}
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置
				this.$emit('changeTab', index,key);//设置swiper的第几页
				// this.$parent.currentTab = index //设置swiper的第几页
			}
		}
	}
</script>

<style lang="scss">
	.navTabBox {
		color: #rgba(102,102,102,1);;
		width:690rpx;
		height:64rpx;
		background:rgba(254,255,255,1);
		box-shadow:-2px -2px 4px 0px rgba(227,238,255,0.5),2px 2px 4px 0px rgba(0,80,193,0.2);
		display: flex;
		justify-content: space-around;
		align-items: center;
		.click {
			color: #0D80F7;
			border-bottom: 2px solid #0D80F7;
		}
		.longTab {
			width: 100%;
			height: 64rpx;
			.longItem{ 
				height: 64rpx;
				 width: 200rpx;
				 display: inline-block;
				line-height: 64rpx;
				text-align: center;
				font-size:14px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
			}
			.underlineBox {
				height: 3px;
				width: 20%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;
				.underline {
					width: 84upx;
					height: 4px;
					background-color: white;
				}
			}
		}
	}
</style>
