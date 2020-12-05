<template>
	<view class="sku-form">
		<view>
			<view type="border-card">
				<view>
					<view class="">
						商品规格
					</view>
					<view v-if="goodsSpuSpec == null || goodsSpuSpec.length <=0 " class="">
						<text class="">暂无数据</text>
					</view>
					<view class="" v-for="(item,index) in goodsSpuSpec" :key="item.id">
						2222222222
					</view>
					<view class="" style="margin-bottom: 5px" v-for="(item,index) in goodsSpuSpec" :key="item.id">
						<view class="" style="padding: 5px 20px;">
							<view class="">
								<text>{{item.value}}</text>
								<text style="float: right; padding: 3px 0"  @click="delGoodsSpuSpec(index)">移除</text>
							</view>
						</view>
						<view class="" style="padding: 5px 20px;">
							<text v-for="(item2,index2) in item.leaf" :key="item2.id" @click="delGoodsSpuSpecValue(index,index2)">
								{{item2.value}}
							</text>
							<br>
							<view class="" v-if="SpecValuePicker">
								<picker @change="goodsSpecValueChange" :value="index" :range="goodsSpecValue" :range-key="'name'">
									<view class="picker">
										当前选择{{goodsSpecValue[index].name}}
									</view>
								</picker>
							</view>
							<text type="text" @click="addSpecValue(item.id)" style="margin-left: 5px">添加规格值
							</text>
						</view>
					</view>
					<view style="text-align: center">
						<view class="" v-if="SpecPicker">
							<picker @change="goodsSpecChange" :value="index" :range="goodsSpec" :range-key="'name'">
								<view class="picker">
									当前选择{{goodsSpec[index].name}}
								</view>
							</picker>
						</view>
						<text type="text" @click="addSpec">添加规格</text>
					</view>
				</view>
			</view>
			<view style="margin-top: 5px">
				<view>
					<view class="">
						商品SKU
					</view>
					<!-- <SkuTable :specData="goodsSpuSpecFilter" :goodsSku="goodsSku" v-if="goodsSpuSpec" @getGoodsSku="getGoodsSku"></SkuTable> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getgoodsspecTwo as specValueList
	} from '@/util/api.js';
	// import SkuTable from '@/components/sku/sku-table.vue'
	// import { addObj as addSpec } from '@/api/mall/goodsspec'

	export default {
		components: {
			// SkuTable
		},
		props: {
			goodsSpec: {
				type: Array
			},
			goodsSpuSpec: {
				type: Array
			},
			goodsSku: {
				type: Array
			},
			specType: {
				type: String
			}
		},
		created() {
			// if (this.goodsSku.length > 0) {
			// 	this.goodsSkuOne = this.goodsSku[0]
			// 	this.goodsSkuOne.enable = '1'
			// } else {
			// 	this.goodsSkuOne = {
			// 		salesPrice: 0,
			// 		marketPrice: undefined,
			// 		costPrice: undefined,
			// 		stock: 0,
			// 		weight: undefined,
			// 		volume: undefined,
			// 		enable: '1'
			// 	}
			// }
			
		},
		computed: {
			// 过滤掉属性名和属性值为空的数据规格项目
			goodsSpuSpecFilter() {
				return this.goodsSpuSpec.filter(item => item.value && item.leaf != null && item.leaf.length)
			}
		},
		watch: {
			goodsSkuOne: {
				deep: true,
				immediate: true,
				handler(newSkus, oldSkus) {
					this.$emit('getGoodsSku', [newSkus])
				}
			}
		},
		mounted() {
		},
		data() {
			return {
				goodsSpecAdd: null,
				goodsSpecValueAdd: null,
				goodsSpecValue: null,
				goodsSpuSpecIndex: null,
				goodsSkuOne: null,
				show1: false,
				show2: false,
				SpecValuePicker: false,
				SpecPicker: false,
				Spec: null,
				text:'1111'
			}
		},
		methods: {
			handleConfirm(item) { // 多规格
				console.log(item)
			},
			getGoodsSku(val) {
				this.$emit('getGoodsSku', val, this.goodsSpuSpec)
			},
			delGoodsSpuSpecValue(indexSpec, indexSpecValue) {
				this.goodsSpuSpec[indexSpec].leaf.splice(indexSpecValue, 1)
			},
			delGoodsSpuSpec(index) {
				let id = this.goodsSpuSpec[index].id
				this.goodsSpuSpec.splice(index, 1)
				let that = this
				that.goodsSpec.forEach(function(val, index) {
					if (val.id == id) {
						that.$set(val, 'disabled', false)
					}
				})
			},
			addSpecValue(specId) {
				this.SpecValuePicker = true
				specValueList({
					specId: specId
				}).then(data => {
					let that = this
					this.goodsSpecValue = data.data.data
					this.goodsSpuSpec.forEach(function(val, index) {
						if (val.id == specId) {
							that.goodsSpuSpecIndex = index
							that.goodsSpecValue.forEach(function(val2, index2) {
								val.leaf.forEach(function(val3, index3) {
									if (val2.id == val3.id) {
										that.$set(val2, 'disabled', true)
									}
								})
							})
						}
					})
				})
			},
			goodsSpecValueChange(id) {
				this.goodsSpecValueAdd = null
				let that = this
				let isNew = true
				this.goodsSpecValue.forEach(function(val, index) {
					if (val.id == id) {
						isNew = false
						that.$set(val, 'disabled', true)
						that.goodsSpuSpec[that.goodsSpuSpecIndex].leaf.push({
							id: val.id,
							value: val.name
						})
					}
				})
				if (isNew) { //需新增
					// addSpecValue({
					//   specId: this.goodsSpuSpec[this.goodsSpuSpecIndex].id,
					//   name: id
					// }).then(data => {
					//   this.goodsSpecValue.push({
					//     id: data.data.data.id,
					//     name: data.data.data.name,
					//     disabled: true
					//   })
					//   that.goodsSpuSpec[that.goodsSpuSpecIndex].leaf.push({
					//     id: data.data.data.id,
					//     value: data.data.data.name
					//   })
					// })
				}
			},
			goodsSpecChange(id) {
				var id = this.goodsSpec[id.detail.value].id;
				this.goodsSpecAdd = null
				let that = this
				let isNew = true
				this.goodsSpec.forEach(function(val, index) {
					if (val.id == id) {
						isNew = false
						that.$set(val, 'disabled', true)
						that.goodsSpuSpec.push({
							id: val.id,
							value: val.name,
							leaf: []
						})
					}
				})
				this.text = "2222";
				console.log(this.goodsSpuSpec);
			},
			addSpec() {
				this.SpecPicker = true;
				let that = this
				that.goodsSpec.forEach(function(val, index) {
					that.goodsSpuSpec.forEach(function(val2, index2) {
						if (val.id == val2.id) {
							that.$set(val, 'disabled', true)
						}
					})
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.sku-form .text+.text {
		margin-left: 10px;
	}
</style>
