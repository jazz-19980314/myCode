<template>
	<view class="container999">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="backIcon" @click="enterCenter"><text class="cuIcon-back" style="font-size: 18px;"></text></block>
			<block slot="content">订单中心</block>
		</cu-custom>
		<view class="topbgc"></view>
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<!-- <refresh ref="refresh" @isRefresh='isRefresh'></refresh> -->
		<!-- 搜索 -->
		<view class='searchInput999'>
			<view class='searchBox999'>
				<text class="cuIcon-search"></text>
			</view>
			<input class='input999' placeholder="请输入您要查询的单号" placeholder-style="color:#ffffff;" @input="searchOrder" v-model="orderNo" type="number"></input>
		</view>
		<view class="navbgc">
			<view class='nav'>
				<!-- 导航栏 agents导航栏标题 -->
				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			</view>
		</view>

		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<!-- <swiper style="min-height: 100vh;margin-top: 220rpx;" :current="currentTab" @change="swiperTab" v-if="dataList.length !=0 "> -->
			<!-- <swiper-item v-for="(listItem,listIndex) in dataList" :key="listIndex"> -->
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class='content' style="margin-top: 280rpx;" v-if="dataList.length != 0">
						<view class='card main_content' v-for="(item,index) in dataList" :key="index">
							<view class="main_title">
								<text>单号：{{item.orderNo}}</text>
								<text class="lookdetail"  v-if="item.status == 2 || item.status == 3" @click="showFahuoModal(item.id)">查看物流</text>
							</view>
							<view class="main_detail">
								<view class="companyName">
									{{item.userInfo.nickName}}
								</view>
								<view class="materialsname" v-for="(meitem,index) in item.listOrderItem" :key="index">
									<text>{{meitem.spuName}}*{{meitem.specInfo?meitem.specInfo:'无规格'}}</text>
									<text class="materialsprice">￥{{meitem.salesPrice}}</text>
								</view>
							</view>
							<view class="main_connect">
								<view class="main_phone" style="margin-bottom: 15rpx;">
									电话：<text>{{item.orderLogistics.telNum}}</text>
								</view>
								<view class="main_address">
									收货地点：<text class="main_address11">{{item.orderLogistics.address}}</text>
								</view>
							</view>
							<view class="main_order">
								<view class="main_order1">
									<!-- <view class="" v-if="item.outstandingAmount" style="font-size: 10px;color:rgba(102,102,102,1);">
										未结款金额：￥{{item.outstandingAmount}}
									</view> -->
									<view class="">
										订单总额：<text>￥{{item.paymentPrice}}</text>
									</view>
								</view>
								<view class="main_order2">
									<view class="wuliu" v-if="item.status == 1 && item.deliveryWay == '1'" @click="showModal(item.id)">
										<image src="../../static/assets/ico_wswlxx.svg" mode=""></image>
										<text>完善物流信息</text>
									</view>
									<view class="wuliu" v-if="item.status == 1 && item.deliveryWay == '0'" @click="zitifahuo(item.id)">
										<!-- <image src="../../static/assets/ico_wswlxx.svg" mode=""></image> -->
										<text>上门自提发货</text>
									</view>
									<view class="qianshou" v-if="item.status == 2 || item.status == 3">
										<view class="" v-if="item.status == 3">
											<image src="../../static/assets/03icon_yqs.svg" mode=""></image>
											<text>已签收</text>
										</view>
										<!-- <view class="" v-else-if="item.status===2" @click="showFahuoModal">
											<image src="../../static/picture/icon_bf.svg" mode=""></image>
											<text style="color: #FF8E2C;">待签收</text>
										</view> -->
										<view class="" v-else >
											<image src="../../static/picture/icon_wqs.svg" mode=""></image>
											<text style="color: #FF3543;">未签收</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 订单中心空状态 -->
					<view class='noCard' v-if="dataList.length == 0">
						<image src="../../static/assets/button_wss.svg" mode=""></image>
						<view class="" style="margin-top: 40rpx;">
							暂无数据,请及时报价
						</view>
						<view class="succontinue" @click="enterQuocenter">
							去报价中心
						</view>
					</view>
					<view class="bottomInfo" v-if="dataList.length > 0">
						<view class="bottomLine">
						</view>
						<view class="">
							没有更多数据啦，快去报价吧
						</view>
						<view class="bottomLine">
						</view>
					</view>
				</scroll-view>

			<!-- </swiper-item> -->
		<!-- </swiper> -->
		<!-- 订单中心空状态 -->
		<!-- <view class='noCard' v-else>
			<image src="../../static/assets/button_wss.svg" mode=""></image>
			<view class="" style="margin-top: 40rpx;">
				暂无数据,请及时报价
			</view>
			<view class="succontinue" @click="enterQuocenter">
				去报价中心
			</view>
		</view> -->
		<!-- 完善物流信息模态框 -->
		<view class="wuliInfoModal">
			<view class="cu-modal bottom-modal" :class="modalName?'show':''">
				<view class="cu-dialog">
					<view class="cancel" @click="hideModals">
						<image src="../../static/assets/icon_ch.svg" mode=""></image>
					</view>
					<view class="modalContent">
						<view class="modaltitle">
							填写物流信息
						</view>
						<view style="width:690rpx;height: 80rpx;border-radius: 5px 5px 0 0;background-color: rgba(8, 141, 250, 1);"></view>
						<view class="wuliutype" v-if="wuliutype" style="color:rgba(13,128,247,1) ;">
							专业物流
						</view>
						<view class="wuliutype" v-else style="color: rgba(13,128,247,1);">
							普通快递
						</view>
						<!-- 普通快递 -->
						<view class="wuliinfo" v-if="wuliutype">
							<view class="detailInfo">
								<image src="../../static/picture/icon_sjxm@3x.png" mode="" style="width: 60rpx;"></image>
								<input type="text" value="sijiname" v-model="sijiname" placeholder="请输入司机姓名" placeholder-style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);text-align:left;" />
							</view>
							<view class="detailInfo">
								<image src="../../static/picture/03icon_sjh@3x.png" mode="" style="height: 64rpx;top: -10rpx;"></image>
								<input type="number" value="sijiphone" v-model="sijiphone" placeholder="请输入联系电话" placeholder-style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);text-align:left;" />
							</view>
							<!-- <view class="detailInfo">
								<image src="../../static/picture/03icon_cph@3x.png" mode="" style="width: 72rpx;height: 56rpx;top: -2rpx;"></image>
								<input type="text" value="" placeholder="请输入车牌号码" placeholder-style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);text-align:left;" />
							</view> -->
							<view class="" @click="checkwuliuType()" style="text-align:right;color:rgba(13,128,247,1) ;">
								普通快递发货>>
							</view>
						</view>
						<!-- 专业物流 -->
						<view class="wuliinfo" v-else>
							<view class="detailInfo">
								<image src="../../static/picture/ktgs.png" mode="" style="width: 60rpx;height: 50rpx;"></image>
								<view class="checkkuaidi">
									<view class="">
										快递公司
									</view>
									<picker @change="PickerChange" :value="index" :range="picker">
										<view class="picker">
											{{picker[index]}}
											<text class="cuIcon-unfold iconfold"></text>
										</view>
									</picker>
								</view>
							</view>
							<view class="detailInfo">
								<image src="../../static/picture/icon_dh@3x.png" mode="" style="height: 64rpx;top: -10rpx;"></image>
								<input type="number" value="fahuotiker" v-model="fahuotiker" placeholder="请输入发货单号" placeholder-style="font-size:14px;font-weight:400;color:rgba(102,102,102,1);text-align:left;" />
							</view>
							<view class="" @click="checkwuliuType()" style="text-align: right;color:rgba(13,128,247,1) ;">
								专业物流发货>>
							</view>
						</view>
						<!-- 其他说明 -->
						<view class="othersInfo" v-if="modalName">
							<view class="mytextarea" :class="{textareabgc:isfocus}">
								<textarea @focus="getfocus" @blur="blurfocus" :show-confirm-bar='true' :adjust-position="true" placeholder="其他说明:例如车牌号,车型" placeholder-style="color:rgba(102,102,102,1);font-size:10px;text-align:left;" v-model="othersInfo" />
							</view>
						</view>
						<!-- 提交 -->
						<view class="submitInfo" @click="hideModal">
							提交
						</view>
						<view class="wraningInfo">
							注：提交信息后无法修改，请正确填写
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 发货详情信息模态框 -->
		<view class="fahuoDetailModal">
			<view class="cu-modal"  :class="modalFahuo?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<view class="cubar-title">
							{{orderLogistics.statusDesc?orderLogistics.statusDesc:''}}
						</view>
						<view class="cubar-info">
							<!-- <image src="../../static/picture/goods.png" mode=""></image> -->
							<view class="">
								<view class="">
									<!-- 淘材电子商务有限公司 -->
								</view>
								<view class="" v-if="orderLogistics.logisticsDesc">
									{{orderLogistics.logisticsDesc?orderLogistics.logisticsDesc:''}}:{{orderLogistics.logisticsNo?orderLogistics.logisticsNo:''}}
									<button class="cu-btn sm" @click="copyData(orderLogistics.logisticsNo)" style="margin-left: 30rpx;">复制</button>
								</view>
							</view>
						</view>
					</view>
					<view class="action">
						<image src="../../static/picture/icon_close.png" mode="" @click="hideFahuoModal"></image>
					</view>
				</view>
				<view class="modalMain-title">
					<image src="../../static/assets/03icon_shdz.svg" mode=""></image>
					<view class="">
						{{orderLogistics.address?orderLogistics.address:''}}
					</view>
				</view>
				<view class="modalMain">
					<!-- <view class="modalMainContent">
						物流信息事件轴
						<view class="cu-bar bg-white solid-bottom margin-top">
							<view class="action">
								<button class="cu-btn bg-green shadow" @click="numSteps">下一步</button>
							</view>
						</view>
						<view class="bg-white">
							<view class="cu-steps">
								<view class="cu-item" :class="index<num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
									<view class="detailTime" v-if="item.time">
										<text style="font-size: 14px;"> {{item.time}}</text>
										<text style="font-size: 12px;"> {{item.date}}</text>
									</view>
									<view class="detailTime" v-else>
										
									</view>
									<text class="num" ></text>
									<view class="detailInfo" :class="index<num?'':'text-blue'"> {{item.name}}</view>
								</view>
							</view>
						</view>
					</view> -->
					<view class="cu-card">
					  <view class="cu-item">
					    <view class="cu-timeline" v-if="orderLogistics.listOrderLogisticsDetail.length <= 0">
					      <view class="cu-item">
					        <view class="content">暂无物流信息</view>
					      </view>
					    </view>
					    <view class="cu-timeline" v-for="(item,index) in orderLogistics.listOrderLogisticsDetail" :key="index">
					      <view class="cu-item" :class="index == 0 ? 'text-red cuIcon-location' : ''">
					        <view class="content" :class="index == 0 ? 'bg-red' : ''">
					          <view class="text-gray">
					            {{item.logisticsTime?item.logisticsTime:''}}
					          </view>
					          <view>
					            {{item.logisticsInformation?item.logisticsInformation:''}}
					          </view>
					        </view>
					      </view>
					    </view>
					  </view>
					</view>
				</view>
				<view class="modalBottom">
					www.zkxr.com 中科新软提供技术支持
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../util/util.js');
	import refresh from '../../components/refresh.vue';
	import navTab from '../../components/navTab.vue';
	// import tabBar4 from '../../components/tabBar4.vue';
	export default {
		components: {
			refresh,
			navTab,
			// tabBar4
		},
		data() {
			return {
				orderNo:'', //输入框值
				index: 0,
				picker: ['请选择'],
				currentPage: 'index',
				toView: '', //回到顶部id
				tabTitle: [{
					value: '未完善订单',
					key: "1"
				}, {
					value: '已发货订单',
					key: "2"
				}],
				// tabTitle: ['未完善订单', '已发货订单'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1], //第几个swiper的第几页
				notPerfectOrder:[],// 未完善订单
				shippedOrder:[],// 以发货订单
				// dataList:[[],[]], // 所有订单
				dataList: [],
				modalName: false, // 物流信息模态框显示与隐藏
				modalFahuo:false, // 发货信息
				isfocus:true,  // 多行文本框的状态
				wuliutype:true, //true为专业物流
				sijiname:'',//司机姓名
				sijiphone:'',//联系方式
				fahuotiker:'',//发货单号
				othersInfo:'', //其他说明
				// 发货状态
				numList: [{
					time: null,
					date:' 5-18',
					name: '【收件地址】安徽省合肥市蜀山区华邦世贸城1栋2308'
				}, {
					time: '19.11',
					date:' 5-18',
					name: '快件交给毛尚昆，正在派送中（联系电话：18312564321，翼装已开启安全呼叫，保护您的电话隐私，请放心接听'
				}, {
					time: '19.11',
					date:' 5-18',
					name: '快件交给毛尚昆，正在派送中（联系电话：18312564321，翼装已开启安全呼叫，保护您的电话隐私，请放心接听'
				}, {
					time: '19.11',
					date:' 5-18',
					name: '快件交给毛尚昆，正在派送中（联系电话：18312564321，翼装已开启安全呼叫，保护您的电话隐私，请放心接听'
				}, {
					time: '19.11',
					date:' 5-18',
					name: '快件交给毛尚昆，正在派送中（联系电话：18312564321，翼装已开启安全呼叫，保护您的电话隐私，请放心接听'
				}, {
					time: '19.11',
					date:' 5-18',
					name: '快件交给毛尚昆，正在派送中（联系电话：18312564321，翼装已开启安全呼叫，保护您的电话隐私，请放心接听'
				}],
				num: 0,
				current:1,
				total:1,
				total2:1,
				tatal3:1,
				orderdetail:[] ,//订单详情
				orderLogistics:[],//详情
				loadmore: true,
				page: {
					status: 1,
					current: 1,
					size: 5
				}
			};
		},
		onLoad(options) {
			this.num = this.numList.length -1
			this.currentTab = options.id
			this.orderlist(this.page);
			//物流信息
			this.$http.wuliuInfo().then(res=>{
				res.data.data.forEach(item=>{
					this.picker.push(item.label)
				})
			})
		},
		computed: {
			// 验证手机号是否合理
			phoneRight() {
				return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.sijiphone)
			}
		},
		onShow() {},
		onHide() {},
		methods: {
			//上门自提
			zitifahuo(id){
				uni.showModal({
					title: '你确定发货吗？',
					position: 'center',
					success: (res) => {
						if(res.confirm){
							this.$http.shangemen({
								id:id
							}).then(res=>{
								console.log(res.data)
								if(res.data.ok){
									uni.showToast({
										title:"发货成功",
										icon:'none'
									})
									uni.redirectTo({
										url:'../ordercenter/ordercenter'
									})
									// this.currentTab = 1
								}
							})
						}
					}
				})
				
			},
			//复制内容
			copyData(data) {
			  uni.setClipboardData({
			      data: data,
			      success: function () {
			          // console.log(data);
			      }
			  });
			},
			orderlist(key){
				//未完善订单
				this.$http.orderInfo(key).then(res => {
					// this.notPerfectOrder = res.data.data.records
					// this.dataList[0] = res.data.data.records
					// this.total = res.data.data.total
					var list = res.data.data.records;
					this.dataList = [...this.dataList, ...list];
					if (list.length < 5) {
						this.loadmore = false;
					}
				}, error => {
					console.log(error);
				})
				// this.$http.orderInfo({
				// 	current:1,
				// 	size:5,
				// 	status:2
				// }).then(res => {
				// 	// this.shippedOrder = res.data.data.records
				// 	this.dataList[1] = res.data.data.records
				// 	this.total2 = res.data.data.total
				// }, error => {
				// 	console.log(error);
				// })
				// setTimeout(()=>{
				// 	// 已签收订单
				// 	this.$http.orderInfo({
				// 		current:1,
				// 		size:5,
				// 		status:3
				// 	}).then(res => {
				// 		this.total3 = res.data.data.total
				// 		for(var i=0;i<res.data.data.records.length;i++){
				// 			this.dataList[1].push(res.data.data.records[i])
				// 		}
				// 		// console.log(this.dataList)
				// 	}, error => {
				// 		console.log(error);
				// 	})
				// },500)
			},
			//搜索
			searchOrder(){
				this.$http.searchOrder({
					orderNo:this.orderNo
				}).then(res=>{
					// this.dataList.length = 0
					this.dataList = res.data.data.records;
				})
				if(!this.orderNo){
					uni.redirectTo({
						url:'../ordercenter/ordercenter'
					})
				}
			},
			//下拉选择
			PickerChange(e) {
			    this.index = e.detail.value
			},
			// 切换物流方式
			checkwuliuType(){
				this.sijiname = ''
				this.sijiphone = ''
				this.othersInfo = ''
				this.index = 0
				this.fahuotiker = ''
				this.wuliutype = !this.wuliutype
			},
			// 返回首页
			enterCenter(){
				uni.switchTab({
					url:'../center/center'
				})
			},
			// 进入报价中心
			enterQuocenter() {
				uni.navigateTo({
					url: '../quotationcenter/quotationcenter'
				})
			},
			// // 进入订单详情
			// enterorderdetai() {
			// 	uni.navigateTo({
			// 		url: '../orderdetail/orderdetail'
			// 	})
			// },
			// 进入结款详情页面
			enterapplymoney(){
				uni.navigateTo({
					url:'../applymoney/applymoney'
				})
			},
			changeTab(index,key) {
				this.currentTab = index;
				this.page.status = key;
				this.dataList = [];
				this.page.current = 1;
				this.loadmore = true;
				this.orderlist(this.page);
			},
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			// 显示物流信息填写模态框
			showModal(id) {
				this.modalName = true
				this.$http.getOne({
					id:id
				}).then(res => {
					this.orderdetail = res.data.data
				}, error => {
					console.log(error);
				})
				// console.log()
				
			},
			// 隐藏物流信息填写模态框
			hideModals(e){
				this.modalName = false
			},
			hideModal(e) {
				if(this.wuliutype){
					if (!this.phoneRight) {
						uni.showModal({
							title: '请输入正确手机号',
							position: 'center'
						})
						return;
					}
				}
				// console.log(this.orderdetail)
				if(this.wuliutype){
					var otherInfo = {
						sijiname:this.sijiname,//司机姓名
						sijiphone:this.sijiphone,//联系方式
					}
					this.orderdetail.orderLogistics.otherInfo = JSON.stringify(otherInfo)
					this.orderdetail.remark = this.othersInfo
					this.orderdetail.status = '2'
				}else{
					this.orderdetail.orderLogistics.logistics = this.picker[this.index]
					this.orderdetail.orderLogistics.logisticsNo = this.fahuotiker
					this.orderdetail.remark = this.othersInfo
					this.orderdetail.status = '2'
				}
				this.$http.postoneOrder(this.orderdetail).then(res=>{
					if (res.data.ok) {
						uni.showToast({
							icon: 'none',
							title:"物流填写成功"
						})
						uni.redirectTo({
							url:'../ordercenter/ordercenter'
						})
					}
				})
				this.modalName = false
			},
			// 显示发货详情模态框
			showFahuoModal(id) {
				this.$http.getOne({
					id:id
				}).then(res=>{
					this.orderLogistics = res.data.data.orderLogistics
				})
				this.modalFahuo = true
			},
			// 隐藏发货详情模态框
			hideFahuoModal(e) {
				this.modalFahuo = false
			},
			// 获取焦点
			getfocus(){
				this.isfocus = false
			},
			// 失去焦点
			blurfocus(){
				this.isfocus = true
			},
			numSteps() {
				this.num = this.num == 0 ? this.numList.length -1 : this.num - 1
			},
			onReachBottom() {
				if (this.loadmore) {
					this.page.current = this.page.current + 1;
					this.orderlist(this.page);
				}
			}
			// onReachBottom() {
			// 	var total = this.total2+this.total3
			// 	if (this.dataList[0].length == this.total && this.dataList[1].length == total) {
			// 		return
			// 	}
			// 	this.current++;
			// 	this.$http.orderInfo({
			// 		status:1,
			// 		current: this.current,
			// 		size: 5
			// 	}).then(res => {
			// 		this.dataList[0] = [...this.dataList[0],...res.data.data.records]
			// 	})
			// 	this.$http.orderInfo({
			// 		status:2,
			// 		current: this.current,
			// 		size: 5
			// 	}).then(res => {
			// 		this.dataList[1] = [...this.dataList[1],...res.data.data.records]
			// 	})
			// 	this.$http.orderInfo({
			// 		status:3,
			// 		current: this.current,
			// 		size: 5
			// 	}).then(res => {
			// 		this.dataList[1] = [...this.dataList[1],...res.data.data.records]
			// 		// console.log(this.dataList[1])
			// 	})
			// }
		}
	};
</script>

<style lang="scss">
	.container999 {
		width: 100%;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6B8082;
		position: relative;
		background-color: #FFFFFF;
	}

	.content {
		width: 100%;
	}
	.topbgc{
		height: 140rpx;
		width: 100%;
		position: fixed;
		top: 120rpx;
		z-index:102 ;
		background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
		border-radius:0px 0px 15px 15px;
	}
	.main_content {
		width: 690rpx;
		// height: 432rpx;
		background: rgba(254, 255, 255, 1);
		box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.1);
		border-radius: 12rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		position: relative;

		.main_title {
			width: 100%;
			padding: 0 40rpx;
			height: 80rpx;
			background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
			border-radius: 4px 4px 0px 0px;
			opacity: 0.9;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;

			.lookdetail {
				font-size: 16px;
				font-weight: bold;
				text-decoration: underline;
			}
		}

		.main_detail {
			padding: 30rpx 0 20rpx 40rpx;
			border-bottom: 1px solid rgba(228,229,230,1);
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.companyName {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 20rpx;
			}

			.materialsname {
				width: 500rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				margin-bottom: 12rpx;
				text{
					width: 400rpx;
					height: 40rpx;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.materialsprice {
					// width: 100rpx;
					text-align: right;
					font-size: 14px;
					font-family: Menlo-Regular, Menlo;
					font-weight: bold;
					color: rgba(102, 102, 102, 1);
					// margin-left: 200rpx;
				}
			}
		}

		.main_connect {
			// height: 110rpx;
			border-bottom: 1px solid rgba(228,229,230,1);
			display: flex;
			flex-direction: column;
			padding: 20rpx 20rpx 20rpx 40rpx;
			justify-content: space-around;
			align-items: flex-start;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			// line-height: 64rpx;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
		}

		.main_order {
			height: 106rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.main_order1 {
				height: 100%;
				line-height: 106rpx;
				width: 50%;
				text-align: center;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				color: rgba(51, 51, 51, 1);
				border-right: 1px solid rgba(228, 229, 230, 1);
				// border-bottom: 1px solid rgba(228, 229, 230, 1);
				view {
					height: 50%;
					line-height: 53rpx;
				}
			}

			.main_order2 {
				height: 100%;
				width: 50%;
				text-align: center;
				line-height: 106rpx;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				position: relative;

				.wuliu {
					color: rgba(255, 53, 67, 1);
				}

				.fahuo {
					color: #E6A23C;

					image {
						position: absolute;
						top: 35rpx;
						left: 80rpx;
						width: 40rpx;
						height: 40rpx;
					}

				}

				.qianshou {
					color: #67C23A;
				
					image {
						position: absolute;
						top: 35rpx;
						left: 70rpx;
						width: 40rpx;
						height: 40rpx;
					}
				}
				image {
					position: absolute;
					top: 30rpx;
					left: 40rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		// 结款信息
		.payInfo {
			height: 84rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.payInfo-l {
				height: 100%;
				width: 50%;
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				border-right: 1px solid rgba(228, 229, 230, 1);
				border-radius: 0px 0px 0px 6px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;
				padding-left: 40rpx;
			}

			.payInfo-r {
				height: 100%;
				width: 50%;
				text-align: center;
				line-height: 84rpx;
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				text-decoration: underline;
				background: linear-gradient(270deg, rgba(13, 128, 247, 1) 0%, rgba(2, 160, 254, 1) 100%);
				border-radius: 0px 0px 6px 0px;
			}

			.payInfo-n {
				background: rgba(204, 204, 204, 1);
				border-radius: 0px 0px 6px 0px;
			}
		}
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

	.bottomInfo {
		display: flex;
		width: 100%;
		padding: 60rpx 30rpx;
		justify-content: space-between;
		height: 40rpx;
		align-items: center;

		view {
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			width: 336rpx;
		}

		.bottomLine {
			width: 156rpx;
			height: 1px;
			background: rgba(216, 216, 216, 1);
		}
	}

	.navbgc {
		background-color: #FFFFFF;
		height: 104rpx;
		padding-top: 40rpx;
		width: 100%;
		position: fixed;
		top: 254rpx;
		z-index: 100;

		.nav {
			width: 100%;
			height: 64rpx;
			// margin: 40rpx auto;
			background: rgba(254, 255, 255, 1);
			box-shadow: 0px 0px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.2);
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: rgba(102, 102, 102, 1);
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			z-index: 996;

			.navTabBox {
				color: #rgba(102, 102, 102, 1);
				;
				width: 750rpx;
				height: 64rpx;
				background: rgba(254, 255, 255, 1);
				box-shadow: -2px -2px 4px 0px rgba(227, 238, 255, 0.5), 2px 2px 4px 0px rgba(0, 80, 193, 0.2);
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}
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

	.isbiding {
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 53, 67, 1);
		line-height: 22px;
	}

	.isnotbiding {
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		line-height: 22px;
		color: rgba(255, 142, 44, 1);
	}
	// 完善物流模态框模态框
	.wuliInfoModal{
		.cu-modal.bottom-modal .cu-dialog{
			width:100%;
			height:67%;
			background:linear-gradient(180deg,rgba(119,183,255,1) 0%,rgba(255,255,255,1) 100%);
			border-radius:20px 20px 0px 0px;
			padding: 60rpx 30rpx 0 30rpx;
			.modalContent{
				width:690rpx;
				height:100%;
				background:rgba(254,255,255,1);
				box-shadow:-2px -2px 4px 0px rgba(229,238,255,1),2px 2px 4px 0px rgba(24,79,186,0.4);
				border-radius:5px;
				.modaltitle{
					font-size:14px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:bold;
					color:rgba(255,255,255,1);
					position: absolute;
					top: 80rpx;
					left: 50%;
					transform: translateX(-50%);
					z-index: 100;
				}
				.wuliutype{
					height:100rpx;
					text-align: center;
					font-size:16px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:bold;
					color:rgba(102,102,102,1);
					line-height:100rpx;
					margin: 0 auto;
				}
				.wuliinfo{
					padding: 20rpx 60rpx 20rpx 60rpx;
					.detailInfo{
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 60rpx;
						margin-bottom: 40rpx;
						position: relative;
						padding-left:90rpx ;
						.checkkuaidi{
							width: 100%;
							display: flex;
							justify-content: space-between;
							border-bottom: 1px solid rgba(234, 234, 234, 1);
							padding-right: 50rpx;
							.picker{
								position: relative;
								.iconfold{
									position: absolute;
									font-size: 14px;
									top: 50%;
									right: -40rpx;
									transform: translateY(-50%);
								}
							}
						}
						image{
							height: 64rpx;
							width: 52rpx;
							position: absolute;
							bottom: 0;
							left: 0;
						}
						input{
							width: 476rpx;
							border-bottom: 1px solid rgba(234, 234, 234, 1);
							text-align: left;
						}
					}
					
			}
			// 其他说明
				.othersInfo {
						width: 570rpx;
						height: 120rpx;
						background-color: #FFFFFF;
						margin: 20rpx auto;
						// margin-top: 40rpx;
						.mytextarea {
							width: 570rpx;
							border: 1px solid rgba(13, 128, 247, 1);
							height: 120rpx;
							border-radius: 3px;
							textarea {
								height: 100%;
								width: 100%;
								text-align: left;
								padding: 12rpx 16rpx;
							}
						}
						.textareabgc {
							background: rgba(245, 250, 255, 1);
							border: 1px solid #CCCCCC;
						}
					}
			}
				.submitInfo{
					width:570rpx;
					height:72rpx;
					background:linear-gradient(270deg,rgba(13,128,247,1) 0%,rgba(2,160,254,1) 100%);
					border-radius:5px;
					color: #FFFFFF;
					text-align: center;
					line-height: 72rpx;
					margin: 20rpx auto;
				}
				.wraningInfo{
					width:570rpx;
					font-size:12px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					text-align: left;
					color:rgba(102,102,102,1);
					margin: 20rpx auto;
				}
			.cancel{
				height: 40rpx;
				width: 40rpx;
				position: absolute;
				top: 10rpx;
				right: 30rpx;
				image{
					height: 100%;
					width: 100%;
				}
			}
		}
	}
	// 发货信息详情模态框
	.fahuoDetailModal{
		.cu-dialog{
			width: 690rpx;
			height: 1220rpx;
			background:rgba(254,255,255,1);
			border-radius:10px;
			position: relative;
			top: 100rpx;
			.Modalclose{
				position: absolute;
				bottom: -100rpx;
				left: -50%;
				transform: translateX(-50%);
				width:78rpx;
				height:78rpx;
				opacity:0.8;
				color: #FFFFFF;
				border: 1px solid #fff;
				border-radius: 50%;
				text-align: center;
				line-height: 78rpx;
			}
			.cu-bar{
				width: 100%;
				height: 244rpx;
				background:linear-gradient(270deg,rgba(35,156,244,1) 0%,rgba(98,188,255,1) 100%);
				border-radius:10px 10px 0px 0px;
				font-size:16px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:bold;
				color:rgba(255,255,255,1);
				text-align: center;
				.content{
					height: 100%;
					width: 100%;
					padding: 30rpx;
					display: flex;
					justify-content: space-around;
					flex-direction: column;
					.cubar-title{
						
					}
					.cubar-info{
						height: 80rpx;
						display: flex;
						justify-content: flex-start;
						font-size: 14px;
						color: #FFFFFF;
						text-align: left;
						view{
							height: 40rpx;
						}
						image{
							height: 100rpx;
							width: 100rpx;
							margin-right: 20rpx;
						}
					}
				}
			}
			.action{
				// position: relative;
				image{
					position: absolute;
					height: 45rpx;
					width: 45rpx;
					top: 20rpx;
					right: 20rpx;
				}
			}
			.modalMain-title{
				width: 100%;
				height: 80rpx;
				display: flex;
				font-size: 12px;
				color: #333333;
				line-height: 80rpx;
				position: relative;
				border-bottom: 1px solid rgba(234,234,234,1);
				padding-left: 60rpx;
				view{
					margin-left: 50rpx;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				image{
					height: 40rpx;
					width: 40rpx;
					margin-right: 20rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 60rpx;
				}
			}
			.modalMain{
				padding: 20rpx 30rpx;
				height: 884rpx;
				border-bottom: 1px solid #EAEAEA;
				.modalMainContent{
					height: 100%;
					overflow: auto;
				}
			}
			.modalBottom{
				width:100%;
				height:80rpx;
				background:rgba(254,255,255,1);
				box-shadow:0px -1px 2px 0px rgba(13,128,247,0.1);
				border-radius:0px 0px 10px 10px;
				line-height: 80rpx;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 0;
				font-size:12px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				z-index: 100;
			}
		}
		.cu-steps {
			// width: 690rpx;
			// margin: 300rpx auto;
			padding: 20rpx 0rpx;
			display: flex;
			flex-direction: column;
		}
		.cu-steps .cu-item{
			display: flex;
			// flex-direction: ;
			margin-bottom: 60rpx;
			.detailTime{
				height: 62rpx;
				width: 62rpx;
				display: flex;
				flex-direction: column;
			}
			.detailInfo{
				width: 468rpx;
				height: 108rpx;
				font-size:12px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				text-align: left;
			}
		}
		.text-blue{
			color:rgba(2,160,254,1) !important;
		}
	}
</style>
