<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="backIcon" @click="enterCenter"><text class="cuIcon-back" style="font-size: 18px;"></text></block>
			<block slot="content">订单中心</block>
		</cu-custom>
		<wyb-table ref="table" :headers="headers" :contents="contents" height="600rpx" :url-col="urlCol" />
		<view class="">
			<view class="">
				商品规格
			</view>
			<view class="box-card el-card" style="margin-bottom: 5px" v-for="(item,index) in goodsSpuSpec" :key="item.id">
				<view class="el-card__header" style="padding: 5px 20px;">
					<view class="clearfix"><text>{{item.value}}</text>
						<button style="float: right; padding: 3px 0" type="text" @click="delGoodsSpuSpec(index)">移除</button>
					</view>
				</view>
				<view class="el-card__body" style="padding: 5px 20px;">
					<text v-for="(item2,index2) in item.leaf" :key="item2.id" type="info" size="small" closable @close="delGoodsSpuSpecValue(index,index2)">
						{{item2.value}}
					</text>
					<br>
						<!-- <el-select v-model="goodsSpecValueAdd" filterable allow-create default-first-option placeholder="请输入规格值" @change="goodsSpecValueChange">
							<el-option v-for="item in goodsSpecValue" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
							</el-option>
						</el-select> -->
						<lb-picker ref="picker1" v-model="value1" mode="multiSelector" :list="list1" :level="2" @change="handleChange"
						 @confirm="handleConfirm1" @cancel="handleCancel">
						</lb-picker>
						<button slot="reference" type="text" @click="addSpecValue(item.id)" style="margin-left: 5px">添加规格值
						</button>
				</view>
			</view>
			<!-- 添加规格 -->
			<view class="">
				<lb-picker ref="picker2" v-model="value2" mode="multiSelector" :list="list1" :level="2" @change="handleChange"
				 @confirm="handleConfirm1" @cancel="handleCancel">
				</lb-picker>
			</view>
		</view>
	</view>
</template>
<script>
	import wybTable from '@/components/wyb-table/wyb-table.vue'
	export default {
		components: {
			wybTable
		},
		data() {
			const theUrl = '/pages/demos/noticeBar-demo/more' // 本地的某个页面
			const httpUrl = 'https://ext.dcloud.net.cn/plugin?id=2667' // 某个网址
			return {
				headers: [{
					label: '姓名',
					key: 'name'
				}, {
					label: '年龄',
					key: 'age'
				}, {
					label: '学院',
					key: 'collage'
				}],
				contents: [{
					name: '刘一',
					age: '',
					collage: '信息学院',
					score: '99',
					url: ['查看更多', theUrl],
					link: ''
				}, {
					name: '陈二',
					age: '18',
					collage: '商学院',
					score: '98',
					url: ['我带参数', theUrl, {
						name: '陈二'
					}],
					link: ''
				}],
				goodsSpecValue: null,
				goodsSpuSpecIndex: null,
				goodsSkuOne: null
			}
		},
		mounted() {
			this.getgoodsspec();
		},
		methods:{
			getgoodsspec() {
				//商品规格
				this.$http.getgoodsspec({
					current: 1,
					size: 20
				}).then(res => {
					let datas = res.data.data;
					this.guigeList = datas.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					})
				})
			},
		}
	}
</script>
