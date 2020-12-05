<template>
	<view class="bigContent">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">编辑商品</block>
		</cu-custom>
		<scroll-view scroll-y="true" style="height: 100vh;margin-bottom: 160rpx;">
			<!-- 图片上传 -->
			<view class="cu-bar bg-white">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/5
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<5" style="position: relative;">
						<!-- <text class='cuIcon-cameraadd'></text> -->
						<image src="../../../static/management/camera.png" mode="" style="width: 88rpx;height: 74rpx;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"></image>
					</view>
				</view>
			</view>
			<view class="" style="padding-left: 30rpx;width: 100%;">
				<!-- 商品标题 -->
				<view class="goodsname needInput">
					<view class="">
						<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
						<text>商品名称</text>
					</view>
					<input type="text" value="goodsname" v-model="goodsname" placeholder="请输入商品名称" />
				</view>
				<!-- 商品类目 -->
				<view class="goodstype goodsname goodsbiao">
					<view class="">
						<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
						<text>商品类目</text>
					</view>
					<view class="pleasecheck" @tap="handleTap('picker1')">
						<text>{{label1.length?label1[0].label+'/'+label1[1].label:'请选择'}}</text>
						<text class="cuIcon-right" v-if="!label1.length"></text>
					</view>
					<!-- <view>{{ value1.join('-') }}</view> -->
					<lb-picker ref="picker1" v-model="value1" mode="multiSelector" :list="list1" :level="2" @change="handleChange"
					 @confirm="handleConfirm1" @cancel="handleCancel">
					</lb-picker>
				</view>
				<!-- 商品标准名 -->
				<view class="goodstype goodsname goodsbiao" v-if="biaozhun">
					<view class="" style="padding-left: 18rpx;">
						<text>标准分类</text>
					</view>
					<view class="pleasecheck" @tap="handleTap('picker2')">
						<text>{{label2.length?label2[0].label+'/'+label2[1].label:'请选择'}}</text>
						<text class="cuIcon-right" v-if="!label2.length"></text>
					</view>
					<lb-picker ref="picker2" v-model="value2" mode="multiSelector" :list="list2" :level="2" @change="handleChange"
					 @confirm="handleConfirm2" @cancel="handleCancel">
					</lb-picker>
				</view>
				<!-- <view class="goodstype goodsname goodsbiao">
					<view class="" style="padding-left: 18rpx;">
						<text>商品标准名</text>
					</view>
					<view class="pleasecheck" @tap="handleTap('picker2')">
						<text>{{label2.length?label2[0].label:'请选择'}}</text>
						<text class="cuIcon-right" v-if="!label2.length"></text>
					</view>
					<lb-picker ref="picker2" v-model="value2" mode="multiSelector" :list="list2" :level="1" @change="handleChange"
					 @confirm="handleConfirm2" @cancel="handleCancel">
					</lb-picker>
				</view> -->
			</view>
			<view class="" style="width: 100%;height: 20rpx;background-color: rgba(245,250,255,1);">
			</view>
			<!-- 规格型号 -->
			<view class="" style="padding-left: 30rpx;width: 100%;">
				<view class="goodssize">
					<view class="" style="height: 40rpx;line-height: 40rpx;">
						<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
						<text style="font-weight:bold;font-size:14px;color:rgba(13,128,247,1);">规格型号</text>
					</view>
					<radio-group class="block" @change="RadioChange" :picker="picker2">
						<view class="cu-form-group margin-top">
							<radio :checked="radio=='0'?true:false" value="0"></radio>
							<text style="margin-left: 20rpx;">统一规格</text>
							<!-- <radio :checked="radio=='1'?true:false" value="1" @tap="handleTap('picker')"></radio>
							<text style="margin-left: 20rpx;">多规格</text> -->
							<!-- <image src="../../../static/management/down.png" mode="" v-if="guigeShow" @click="checkshow"></image>
							<image src="../../../static/management/up.png" mode="" v-else @click="checkshow"></image> -->
						</view>
					</radio-group>
				</view>

				<!-- 统一规格 -->
				<view class="ty-size" v-if="radio=='0'">
					<!-- 价格 -->
					<view class="goodsname needInput">
						<view class="">
							<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
							<text>价格</text>
						</view>
						<input type="number" value="goodsprice" v-model="goodsprice" placeholder="请输入价格" />
					</view>
					<!-- 库存 -->
					<view class="goodsname needInput">
						<view class="">
							<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
							<text>库存</text>
						</view>
						<input type="number" value="kucun" v-model="kucun" placeholder="请输入库存量" />
					</view>
				</view>
				<!-- 多规格 -->
				<view class="moresize" v-if="radio=='1'">
					<view class="" v-for="(item,index) in moresizelist" :key="index" style="margin-bottom: 40rpx;" :class="guigeShow?'':'ishide'">
						<view class="guige">
							<text style="width: 400rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.specs[0].specName+'/'+item.specs[0].specValueName}}</text>
							<text v-if="!item.specs[0].specValueName" style="color:#0D80F7;" @tap="handleTap('picker5')">添加规格值</text>
							<view class="" style="position: relative; padding-right: 40rpx;" @click="deleteGoods(index)">
								<text style="font-size: 12px;">移除</text>
								<image src="../../../static/management/del.png" mode="" style="width: 32rpx;height: 32rpx;position: absolute;top: 50%;right: 0;transform: translateY(-50%);"></image>
							</view>
						</view>
						<view class="goodsname needInput">
							<view class="">
								<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
								<text>价格</text>
							</view>
							<input type="number" value="item.price" v-model="item.salesPrice" placeholder="请输入价格" />
						</view>
						<view class="goodsname needInput">
							<view class="">
								<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
								<text>库存</text>
							</view>
							<input type="number" value="item.goodsnum" v-model="item.stock" placeholder="请输入库存量" />
						</view>
					</view>
					<!-- <view class="searchInput999" v-if="ishow">
						<bjx-inputs :value="value" item-key="value" placeholder='请输入你要添加的规格名称' @list="getData2" @select='select2' overflow="hide" >
						</bjx-inputs>
					</view> -->
					<view class="pleasecheck" :class="guigeShow?'':'ishide'" @tap="handleTap('picker')" style="text-align: center;color:#0D80F7;font-size: 14px;height: 60rpx;line-height: 60rpx;position: relative;margin-top: 20rpx;">
						<image src="../../../static/management/02-4@3x.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;top: 50%;transform: translateY(-50%);left: 200rpx;"></image>
						<text>添加规格</text>
					</view>
					<!-- 折叠部分 -->
					<view class="zhedie" :class="guigeShow?'ishide':''" @click="checkshow">
						折叠部分
					</view>
					<lb-picker ref="picker" v-model="value" mode="multiSelector" :list="guigeList" :level="1" @change="handleChange"
					 @confirm="handleConfirm" @cancel="handleCancel">
					</lb-picker>
					<lb-picker ref="picker5" v-model="value5" mode="multiSelector" :list="guigeListTwo" :level="1" @change="handleChange"
					 @confirm="handleConfirm5" @cancel="handleCancel">
					</lb-picker>
				</view>
			</view>
			<view class="" style="width: 100%;height: 20rpx;background-color: rgba(245,250,255,1);">
			</view>
			<!-- 卖点-->
			<view class="" style="padding-left: 30rpx;width: 100%;">
				<view class="goodsname needInput" style="padding-left: 18rpx;">
					<view class="">
						<!-- <text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text> -->
						<text>商品卖点</text>
					</view>
					<input type="text" value="maidian" v-model="maidian" placeholder="请输入商品卖点" />
				</view>
				<!-- 运费模板 -->
				<view class="goodstype goodsname">
					<view class="">
						<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
						<text>运费模板</text>
					</view>
					<view class="pleasecheck" @tap="handleTap('picker3')">
						<text>{{label3.length?label3[0].label:'请选择'}}</text>
						<text class="cuIcon-right" v-if="!label3.length"></text>
					</view>
					<!-- <view>{{ value1.join('-') }}</view> -->
					<lb-picker ref="picker3" v-model="value3" mode="multiSelector" :list="list3" :level="1" @change="handleChange"
					 @confirm="handleConfirm3" @cancel="handleCancel">
					</lb-picker>
				</view>
				<!-- 发货地 -->
				<view class="goodstype goodsname">
					<view class="">
						<text class="text-red" style="line-height: 100rpx;margin-right: 4rpx;">*</text>
						<text>发货地</text>
					</view>
					<view class="pleasecheck" @tap="handleTap('picker4')">
						<text>{{label4.length?label4[0].label:'请选择'}}</text>
						<text class="cuIcon-right" v-if="!label4.length"></text>
						<!-- {{ value4.join('-') }} -->
					</view>
					<!-- <view>{{ value1.join('-') }}</view> -->
					<lb-picker ref="picker4" v-model="value4" mode="multiSelector" :list="list4" :level="1" @change="handleChange"
					 @confirm="handleConfirm4" @cancel="handleCancel">
					</lb-picker>
				</view>
			</view>
		</scroll-view>
		<!-- 底部操作 -->
		<view class="goodsbottom">
			<view class="gd-left" @click="clearall">
				清空
			</view>
			<view class="gd-right">
				<view class="" style="margin-right: 60rpx;" @click="timeoutsuc">
					暂不上架
				</view>
				<view class="" style="color: #FFFFFF;background-image:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);border: none;"
				 @click="enterpostsuccess">
					立即上架
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BjxInputs from '@/components/bjx-inputs/bjx-inputs.vue'
	export default {
		components: {
			BjxInputs
		},
		data() {
			return {
				title: '', //导航栏名称
				goodsname: '', //商品名称
				maidian: '', //商品卖点
				goodsdetail: [], //商品详情
				imgList: [], //图片列表
				guigeShow: true, //是否展开
				value: [], //商品规格
				label: [],
				radio: '', //0统一规格 1多规格
				goodsprice: '', //价格
				kucun: "", //库存
				guigeList: [], //规格一级列表
				guigeListTwo: [], //规格二级列表
				moresizelist: [], //多规格列表
				value5: [],
				value1: [], //商品类目
				label1: [],
				list1: [],
				value2: [], //商品标准名
				label2: [],
				list2: [],
				value3: [], //运费模板
				label3: [],
				list3: [],
				value4: [], //发货地
				label4: [],
				list4: [],
				onesizelist: [],
				goodsId: '',
				changeimges: [],
				tempChangeList: [],
				tempimgList: [],
				tmplabel: [],
				categoryFirst: '',
				categorymorelist: null,
				biaozhun:true
			};
		},
		onLoad(options) {
			this.$http.userInfo().then(res => {
				this.biaozhun = res.data.data.permissions.indexOf("mall:goodscategorymore:index") == '-1'?false:true
			}, error => {
				console.log(error);
			})
			let obj = JSON.parse(decodeURIComponent(options.data));
			this.goodsId = obj.id
			this.getgoodscategory()
			this.getcategorymore()
			this.$http.getcategorymore().then(res => {
				this.categorymorelist = res.data
			})
			this.getgoodsspec()
			this.getdeliveryplace()
			this.getfreighttemplat()
			this.getGoodsDetail()

		},
		methods: {
			getGoodsDetail() {
				this.$http.getOneGoods({
					id: this.goodsId
				}).then(res => {
					this.goodsdetail = res.data.data
					if (this.goodsdetail.specType == 1) {
						for (var i = 0; i < this.goodsdetail.skus.length; i++) {
							delete this.goodsdetail.skus[i].id
							delete this.goodsdetail.skus[i].spuId
							delete this.goodsdetail.skus[i].tenantId
							delete this.goodsdetail.skus[i].specs[0].id
							delete this.goodsdetail.skus[i].specs[0].spuId
							delete this.goodsdetail.skus[i].specs[0].tenantId
							delete this.goodsdetail.skus[i].specs[0].skuId
						}
					}
					this.goodsname = res.data.data.name
					this.maidian = res.data.data.sellPoint
					this.tempChangeList = res.data.data.picUrls
					this.imgList = res.data.data.picUrls
					this.radio = this.goodsdetail.specType
					this.moresizelist = this.goodsdetail.skus
					console.log(this.moresizelist)
					var list = JSON.parse(JSON.stringify(this.list1))
					this.label1 = list.filter((item) => {
						return item.value == this.goodsdetail.categoryFirst;
					})
					this.tmplabel = this.label1[0].children.filter(item => {
						return item.value == this.goodsdetail.categorySecond
					})
					this.label1.push(this.tmplabel[0])
					if (this.goodsdetail.categoryThird) {
						var testlabel = null
						testlabel = this.categorymorelist.filter(item => {
							return item.id == this.goodsdetail.categoryThird;
						})
						this.label2 = this.list2.filter((item) => {
							return item.value == testlabel[0].parentId;
						})
						var testlabel2 = this.label2[0].children.filter(item => {
							return item.value == testlabel[0].id
						})
						this.label2.push(testlabel2[0])
					}
					this.label3 = this.list3.filter((item) => {
						return item.value == this.goodsdetail.freightTemplatId;
					})
					this.label4 = this.list4.filter((item) => {
						return item.value == this.goodsdetail.deliveryPlaceId;
					})
					this.goodsprice = this.goodsdetail.skus[0].salesPrice.toString()
					this.kucun = this.goodsdetail.skus[0].stock
				})
			},
			getgoodscategory() {
				//商品类目
				this.$http.getgoodscategory({
					current: 1,
					size: 20
				}).then(res => {
					let datas = res.data.data;
					this.list1 = datas.map(item => {
						return {
							label: item.name,
							value: item.id,
							children: item.children
						}
					})
					this.list1.forEach(item => {
						item.children = item.children.map(data => {
							return {
								label: data.name,
								value: data.id,
							}
						})
					})
				})
			},
			getcategorymore() {
				//商品标准名
				this.$http.getgoodscategorymore().then(res => {
					let datas = res.data.data;
					if(datas){
						this.list2 = datas.map(item => {
							return {
								label: item.name,
								value: item.id,
								children: item.children
							}
						})
						for (var i = 0; i < this.list2.length; i++) {
							this.list2[i].children = this.list2[i].children.map(item => {
								return {
									label: item.name,
									value: item.id,
								}
							})
						}
					}
				})
			},
			//商品规格
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
					if (this.radio == 1) {
						this.moresizelist = this.goodsdetail.skus
					}
				})
			},
			//发货地选择
			getdeliveryplace() {
				this.$http.getdeliveryplace({
					current: 1,
					size: 20
				}).then(res => {
					let datas = res.data.data.records;
					this.list4 = datas.map(item => {
						return {
							label: item.place,
							value: item.id,
						}
					})
				})
			},
			//运费模板
			getfreighttemplat() {
				//运费模板
				this.$http.getfreighttemplat({
					current: 1,
					size: 20
				}).then(res => {
					let datas = res.data.data.records;
					this.list3 = datas.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					})
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.imgList = this.imgList.concat(res.tempFilePaths)
						var tempImgList = res.tempFilePaths
						for (var index = 0; index < tempImgList.length; index++) {
							uni.uploadFile({
								url: 'https://mall.program66.com/admin/file/uploads',
								filePath: tempImgList[index],
								header: {
									'Authorization': "Bearer " + uni.getStorageSync('token'),
								},
								name: 'file',
								success: (res) => {
									var cc = JSON.parse(res.data);
									this.changeimges = this.changeimges.concat(cc.link)
								},
								complete: () => {
									var c = Number(index)
									if (this.changeimges.length > 0) {
										this.tempChangeList = this.tempChangeList.concat(this.changeimges)
									}
								}
							});
						};
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.tempChangeList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//商品类目
			handleTap(picker) {
				this.$refs[picker].show()
			},
			handleChange(item) {
			},
			handleConfirm(item) { // 多规格
				this.moresizelist.push({
					specs: [{
						specId: item.item[0].value,
						specName: item.item[0].label,
						specValueId: '',
						specValueName: ''
					}],
					specIds: item.item[0].value,
					picUrl: "",
					picUrls: [],
					salesPrice: '',
					stock: '',
					enable: "1"
				})
				this.$http.getgoodsspecTwo({
					id: item.item[0].value
				}).then(res => {
					this.guigeListTwo = res.data.data.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					})
				})
			},
			handleConfirm5(itemss) { //规格值
				var list = []
				list.push(this.moresizelist[this.moresizelist.length - 1])
				list.forEach(item => {
					item.specs.forEach(data => {
						data.specValueId = itemss.item[0].value,
							data.specValueName = itemss.item[0].label
					})
				})
				list.forEach(item => {
					item.specIds = item.specs[0].specId + "-" + item.specs[0].specValueId
				})
			},
			// 移除商品
			deleteGoods(index) {
				// console.log(index)
				uni.showModal({
					title: '提示',
					content: '你确定要删除这个规格吗',
					success: (res) => {
						if (res.confirm) {
							this.moresizelist.splice(index, 1)
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});

			},

			// 商品类目
			handleConfirm1(item) {
				this.label1 = item.item
			},
			//商品标准名
			handleConfirm2(item) {
				this.label2 = item.item
			},
			//运费模板
			handleConfirm3(item) {
				this.label3 = item.item
			},
			//发货地
			handleConfirm4(item) {
				this.label4 = item.item
			},
			//商品规格
			handleCancel(item) {

			},
			// 商品规格
			RadioChange(e) {
				this.radio = e.detail.value
				this.goodsdetail.skus = []
				this.moresizelist = []
				this.goodsprice = ''
				this.kucun = ''
			},
			//多规格规格的消失
			checkshow() {
				this.guigeShow = !this.guigeShow
				this.ishow = false
			},
			handelAdd() {
				this.ishow = true
			},
			timeoutsuc() {
				uni.navigateBack();
			},
			putgoods() {
				if (this.radio == 0) {
					this.onesizelist.push({
						specs: [],
						specIds: '',
						picUrl: "",
						picUrls: [],
						salesPrice: this.goodsprice,
						stock: this.kucun,
						enable: "1"
					})
					this.goodsdetail.name = this.goodsname
					this.goodsdetail.picUrls = this.tempChangeList
					this.goodsdetail.categoryId = [this.label1[0].value, this.label1[1].value]
					this.goodsdetail.sellPoint = this.maidian
					this.goodsdetail.price = ""
					this.goodsdetail.spuCode = ""
					this.goodsdetail.specType = this.radio
					this.goodsdetail.saleNum = ''
					this.goodsdetail.createTime = ''
					this.goodsdetail.updateTime = ''
					this.goodsdetail.shelf = '1'
					this.goodsdetail.pointsGiveSwitch = "0",
					this.goodsdetail.pointsDeductSwitch = "0"
					this.goodsdetail.categoryThird = this.label2.length==0?'':this.label2[1].value
					this.goodsdetail.freightTemplatId = this.label3[0].value
					this.goodsdetail.deliveryPlaceId = this.label4[0].value
					this.goodsdetail.ensureIds = []
					this.goodsdetail.skus = this.onesizelist
					this.goodsdetail.description = ""
					this.goodsdetail.spuSpec = this.goodsdetail.spuSpec
					this.goodsdetail.categoryFirst = this.label1[0].value,
						this.goodsdetail.categorySecond = this.label1[1].value
				}
				if (this.radio == 1) {
					// console.log(this.goodsdetail)
					var spuSpec = []
					for (var i = 0; i < this.moresizelist.length; i++) {
						spuSpec.push({
							id: this.moresizelist[i].specs[0].specId,
							value: "",
							leaf: [{
								id: this.moresizelist[i].specs[0].specValueId,
								value: ''
							}]
						})
					}
					this.goodsdetail.name = this.goodsname
					this.goodsdetail.picUrls = this.tempChangeList
					this.goodsdetail.categoryId = [this.label1[0].value, this.label1[1].value]
					this.goodsdetail.sellPoint = this.maidian
					this.goodsdetail.price = ""
					this.goodsdetail.spuCode = ""
					this.goodsdetail.specType = this.radio
					this.goodsdetail.saleNum = ''
					this.goodsdetail.createTime = ''
					this.goodsdetail.updateTime = ''
					this.goodsdetail.shelf = '1'
					this.goodsdetail.pointsGiveSwitch = "0",
						this.goodsdetail.pointsDeductSwitch = "0"
					this.goodsdetail.categoryThird = this.label2.length==0?'':this.label2[1].value
					this.goodsdetail.freightTemplatId = this.label3[0].value
					this.goodsdetail.deliveryPlaceId = this.label4[0].value
					this.goodsdetail.ensureIds = []
					this.goodsdetail.skus = this.moresizelist
					this.goodsdetail.description = ""
					this.goodsdetail.spuSpec = spuSpec
					this.goodsdetail.categoryFirst = this.label1[0].value,
					this.goodsdetail.categorySecond = this.label1[1].value
				}
				this.$http.putgoods(this.goodsdetail).then(res => {
					if (res.data.ok) {
						uni.showToast({
							icon: 'none',
							title: "编辑商品成功"
						})
						uni.navigateTo({
							url: '../postsuccess/postsuccess'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: "编辑商品失败，请检查网络"
						})
					}
				})
			},
			// 上架成功
			enterpostsuccess() {
				if (this.imgList.length == 0 || this.goodsname == '' || this.label1.length == 0 || this.label3.length == 0 || this.label4
					.length == 0) {
					uni.showToast({
						title: "请完善页面信息",
						duration: 2000,
						icon: 'none'
					});
				} else {
					this.putgoods()
				}
			},
			// 清空
			clearall() {
				uni.showModal({
					title: '提示',
					content: '你确定清空所有数据吗',
					success: (res) => {
						if (res.confirm) {
							this.goodsdetail = ''
							this.goodsname = ''
							this.maidian = ''
							this.goodsprice = ''
							this.kucun = ''
							this.imgList = ''
							this.label = []
							this.label1 = []
							this.label2 = []
							this.label3 = []
							this.label4 = []
							this.moresizelist = []
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.bigContent {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow: auto;

		.cu-bar {
			width: 100%;
			background-color: #FFFFFF;
			// padding: 60rpx 30rpx;
		}

		.goodsname {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			// margin-left: 30rpx;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx 0 0;
			background-color: #FFFFFF;
			border-bottom: 1px solid rgba(234, 234, 234, 1);

			.goodsname-1 {
				width: 500rpx;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.needInput {
			display: flex;
			justify-content: flex-start;

			input {
				margin-left: 40rpx;
				width: 500rpx;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.goodstype {
			position: relative;
			// padding-left: 30rpx;

			.pleasecheck {
				position: absolute;
				top: 50%;
				right: 30rpx;
				transform: translateY(-50%);
			}
		}

		.goodsbiao {
			border-bottom: none;
			// margin-bottom: 20rpx;
		}

		.goodssize {
			width: 100%;
			height: 180rpx;
			padding: 0 30rpx 0 0;
			background-color: #FFFFFF;
			// margin-bottom: 20rpx;

			.cu-form-group {
				display: flex;
				justify-content: flex-start;
				position: relative;

				radio {
					margin-left: 40rpx;
					transform: scale(0.653);
				}

				image {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}
		}

		.goodsbottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 160rpx;
			background: rgba(245, 250, 255, 1);
			padding: 40rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			z-index: 100;
			color: rgba(102, 102, 102, 1);

			.gd-right {
				display: flex;
				justify-content: space-around;

				view {
					width: 200rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					border-radius: 2px;
					border: 1px solid rgba(153, 153, 153, 1);
				}
			}
		}

		.moresize {
			background-color: #FFFFFF;
			padding: 10rpx 30rpx;
			width: 100%;

			.ishide {
				display: none;
			}

			.guige {
				width: 100%;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				display: flex;
				justify-content: space-between;
			}

			.zhedie {
				width: 100%;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background: rgba(245, 250, 255, 1);
				border-radius: 2px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				margin: 20rpx auto;
			}
		}
	}

	.searchInput999 {
		width: 100%;
		z-index: 1000;
	}
</style>
