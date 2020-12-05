<template>
	<view class="bjx-inputs">
		<view class="bjx-background" @tap="isShow=false" v-show="isShow"></view>
		<view class="bjx-con">
			<slot name='left'></slot>
			<input :disabled="theDisabled" :placeholder="placeholder" v-model="theValue" @input="theInput" @tap='isShow=true'
			 @focus="theFocus" @blur="theBlur" autocomplete="off" placeholder-style='color:rgba(153, 153, 153, 1);' style="border: 1px solid rgba(153, 153, 153, 1);border-radius: 2px;color: rgba(153, 153, 153, 1);"/>
			<slot name='right'></slot>
		</view>
		<view class='searchBox999'>
			<text class="cuIcon-search"></text>
		</view>
		<view class="bjx-select" v-show="show">
			<view class="data">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in data" :key="index" @tap="selectItem(item,index)">
					<view class="item-text" :class="{active: getItem(item) == theValue}">{{getItem(item)}}</view>
				</view>
			</view>
			<!-- <view class="item-close" @tap="isShow=false">收起</view> -->
		</view>
	</view>
</template>

<script>
	let fontUnit = 'upx'
	// #ifdef MP-WEIXIN
	fontUnit = 'rpx'
	// #endif
	export default {
		name: 'BjxInputs',
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			itemKey: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '600'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			timeDelay: {
				type: Number,
				default: 60
			},
			theStyle: {
				type: String,
				default: ''
			},
			overflow: {
				type: String,
				default: 'auto'
			},
		},
		data() {
			return {
				timer: null,
				data: [],
				isShow: false,
				theValue: this.value,
				theDisabled: this.disabled,
			}
		},
		watch: {
			value(val) {
				this.theValue = val
			}
		},
		computed: {
			show() {
				return this.isShow && this.data.length
			},
		},
		methods: {
			showItem() {
				this.isShow = this.data.length > 0
			},
			theFocus(e) {
				// this.isShow = true
				this.$emit('focus', e)
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.$emit('list', {
						value: e.detail.value,
						callback: this.setData
					})
				}, this.timeDelay)
			},
			theBlur(e) {
				this.theValue = ''
				this.isShow = false
				this.$emit('blur', e)
			},
			theInput(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.$emit('list', {
						value: e.detail.value,
						callback: this.setData
					})
				}, this.timeDelay)
			},
			getItem(item) {
				return this.itemKey && typeof item == 'object' ? item[this.itemKey] : item
			},
			selectItem(item) {
				this.isShow = false
				this.theValue=  ''
				this.theValue = this.itemKey ? item[this.itemKey] : item
				this.$emit('select', item)
			},
			setData(data) {
				if (data) {
					this.isShow = true
					this.data = data
				}
			},
			setValue(value) {
				this.theValue = value
			},
			setDisabled(value) {
				this.theDisabled = value
			},
		},
	}
</script>

<style lang="scss" scoped>
	.bjx-inputs {
		width:100%;
		height:72rpx;
		// background-color: blue;
		background-image:linear-gradient(270deg,rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.4) 100%);
		border-radius:4px;
		margin: 20rpx auto;
		position: relative;
		// padding-left: 70rpx;
		
		.bjx-background {
			position: fixed;
			top: 0;
			left: 0;
			width: 750upx;
			height: 100%;
		}

		.bjx-con {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			line-height: 72rpx;

			input {
				flex: 1;
				// margin: 0 6upx;
				height: 72rpx;
			}
		}
		.searchBox999 {
			width: 56upx;
			height: 56upx;
			position: absolute;
			top: 50%;
			left: 20rpx;
			transform: translateY(-50%);
			text {
				color: #FFFFFF;
				line-height: 56upx;
				text-align: center;
			}
		}
		.bjx-select {
			border: 1px solid rgba(153, 153, 153, 1);
			border-top: none;
			position: absolute;
			top: 72rpx;
			left: 0;
			z-index: 999;
			color: rgba(153, 153, 153, 1);
			background: #fff;
			width: 100%;

			.data {
				max-height: 400upx;
				padding: 10upx;
				overflow: auto;

				.select-item {
					width: 100%;
					// border-bottom: 1px solid #8F8F94;
					.item-text {
						padding: 10upx 0;
					}

					.active {
						font-weight: bold;
					}
				}

				.item-auto {
					overflow: auto;

					.item-text {
						width: max-content;
					}
				}

				.item-hide .item-text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.item-close {
				padding: 20upx;
				text-align: center;
				font-size: 32upx;
				height: 80rpx;
				border-top: 1px solid rgba(153, 153, 153, 1);
				color: rgba(153, 153, 153, 1);
			}
		}
	}
</style>
