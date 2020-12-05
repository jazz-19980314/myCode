<template>
	<view class="padding bg-white text-left">
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>公司名称</view>
		<input class="input_s" placeholder="请输入公司名称" name="input" v-model="form.name"></input>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>所属行业</view>
		<picker class="address-picker" mode="multiSelector" :range="[province, city, area]" range-key="label" :value="value"
		 @change="changeHandler" @cancel="close" @columnchange="columnchange">
			<view class="input_p flex justify-between">
				<text class="" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{bussies||'请选择所属行业'}}</text>
				<text class="cuIcon-triangledownfill text-xxl text-bold"></text>
			</view>
		</picker>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>成立时间</view>
		<picker class="input_p" mode="date" :value="date" @change="DateChange">
			<view class="picker flex justify-between">
				<text>{{date}}</text>
				<text class="cuIcon-triangledownfill text-xxl text-bold"></text>
			</view>
		</picker>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>注册地区</view>
		<pickers @address="address" @close="close" :defaultAddress="defaultAddress">
			<view class="input_p flex justify-between">
				<text style="">{{res||'请选择注册地区'}}</text>
				<text class="cuIcon-triangledownfill text-xxl text-bold"></text>
			</view>
		</pickers>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>详细地址</view>
		<input class="input_s" placeholder="请输入详细地址" name="input" v-model="form.address"></input>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>联系人</view>
		<input class="input_s" placeholder="请输入联系人" name="input" type="text" v-model="form.contacts.name"></input>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>联系人电话</view>
		<input class="input_s" placeholder="请输入联系人电话" name="input" v-model="form.contacts.phone"></input>
		<view class="text-black text-bold">邮箱</view>
		<input class="input_s" placeholder="请输入邮箱" name="input" v-model="form.contacts.email"></input>
		<view class="text-black text-bold">工商联系电话</view>
		<input class="input_s" placeholder="请输入工商联系电话" name="input" type="number" v-model="form.phone"></input>
		<view class="text-black text-bold">公司法人</view>
		<input class="input_s" placeholder="请输入公司法人" name="input" v-model="form.legalPerson"></input>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>客户级别</view>
		<picker class="input_p" @change="levelChange" :value="index" :range="companyLevel" range-key="dictValue">
			<view class="picker flex justify-between">
				<text>{{index>-1?companyLevel[index].dictValue:'请选择公司级别'}}</text>
				<text class="cuIcon-triangledownfill text-xxl text-bold"></text>
			</view>
		</picker>
		<view class="text-black text-bold"><text class="text-red text-bold text-xl">*</text>客户来源</view>
		<picker class="input_p" @change="sourceChange" :value="index" :range="companySourse" range-key="dictValue">
			<view class="picker flex justify-between">
				<text>{{index1>-1?companySourse[index1].dictValue:'请选择客户来源'}}</text>
				<text class="cuIcon-triangledownfill text-xxl text-bold"></text>
			</view>
		</picker>
		<button class="cu-btn bg-gradual-blue" style="width: 100%;" @click="addCompany">确定录入</button>
	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import bpickers from "@/components/ming-picker/bussise-picker.vue"
	export default {
		data() {
			return {
				index1: 0,
				index: 0,
				index2: [0, 0, 0],
				date: '',
				//默认选中
				defaultAddress: [],
				defaultbussies: [],
				//选中后的显示值
				res: "",
				bussies: "",
				companyLevel: [],
				companySourse: [],
				bussiesTree: [],
				province: [],
				city: [],
				area: [],
				form: {
					name: '', //公司名称
					address: "", //公司地址
					business: "", //所属行业
					contacts: {
						name: "",  //联系人姓名
						phone: "",  //联系方式
						email: ""   //邮箱
					},
					establishedTime: "",  //成立时间
					grade: "1",    //公司等级
					legalPerson: "",   //注册地区
					phone: "",   //工商联系电话
					regionCode: "",  //注册地区
					salesManagerName: "",  //销售代表
					scope: "",   //
					source: "1", //客户来源
					status: 1
				}
			}
		},
		components: {
			pickers,
			bpickers
			// 15755275737
		},
		computed: {
			phone() {
				return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.contacts.phone)
			},
			phones(){
				return /(^(\d{3,4}-)?\d{7,8})$|([1][3,4,5,6,7,8,9][0-9]{9})/.test(this.form.phone)
			},
			email() {
				return /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.form.contacts.email)
			}
		},
		onLoad() {
			this.getCompanyLevel();
			this.getSource();
			this.getTree();
		},
		methods: {
			levelChange(e) {
				this.grade = Number(e.detail.value);
				this.index = e.detail.value;
			},
			sourceChange(e) {
				this.form.source = Number(e.detail.value);
				this.index1 = e.detail.value;
			},
			getCompanyLevel() {
				this.$http.companyLevel().then(res => {
					this.companyLevel = res.data.data;
				})
			},
			getSource() {
				this.$http.companySourse().then(res => {
					this.companySourse = res.data.data[0].children
				})
			},
			getTree() {
				this.$http.menuTree().then(res => {
					this.bussiesTree = res.data.data;
					this.province = this.bussiesTree.map(item => {
						return {
							label: item.title,
							value: item.value
						}
					})
					this.city = this.bussiesTree[0].children.map(item => {
						return {
							label: item.title,
							value: item.value
						}
					})
					this.area = this.bussiesTree[0].children[0].children.map(item => {
						return {
							label: item.title,
							value: item.value
						}
					})
				})
			},
			DateChange(e) {
				this.form.establishedTime = e.detail.value+"T16:00:00.000Z";
				this.date = e.detail.value
			},
			address(e) {
				this.form.regionCode = e.value[2].value;
				this.res = e.value[0].label + "-" + e.value[1].label + "-" + e.value[2].label;
			},
			changeHandler(e) {
				var code = this.getAddress(...this.index2);
				this.form.business = code[code.length - 1].value;
				this.bussies = code[0].label + "-" + code[1].label + "-" + code[2].label;
			},
			close() {
				console.log("点击了取消")
			},
			getAddress(p, c, a) {
				const {
					province,
					city = [],
					area = []
				} = this;
				return [province[p], city[c] || '', area[a] || ''];
			},
			columnchange(e) {
				const {
					column,
					value: index
				} = e.detail;
				if (column === 0) {
					// 省份变了
					this.city = this.bussiesTree[index].children.map(it => {
						return {
							label: it.title,
							value: it.value
						}
					});
					this.area = this.bussiesTree[index].children[0].children.map(it => {
						return {
							label: it.title,
							value: it.value
						}
					});
					this.index2 = [index, 0, 0];
				} else if (column === 1) {
					// 城市变了
					const currentProvince = this.index2[0];
					this.area = this.bussiesTree[currentProvince].children[index].children.map(it => {
						return {
							label: it.title,
							value: it.value
						}
					});
					this.index2 = [currentProvince, index, 0];
				} else {
					const value = this.index2;
					value[2] = index;
					this.index2 = value;
				}
			},
			//添加公司
			addCompany() {
				if (this.form.name == '' || this.form.business == '' || this.form.address == '' || this.form.contacts.name == '' ||
					this.form.contacts.phone == '' ||this.form.regionCode == '' || this.form.grade == '' || this.form.source == '' || this.form.establishedTime == '') {
					uni.showToast({
						icon: "none",
						title: '请完善页面信息'
					})
				} else {
					if (!this.phone) {
						uni.showToast({
							icon: "none",
							title: '请填写正确联系方式'
						})
						return
					}
					if(this.form.contacts.email){
						if (!this.email) {
							uni.showToast({
								icon: "none",
								title: '请填写正确邮箱'
							})
							return
						}
					}
					if(this.form.phone){
						if (!this.phones) {
							uni.showToast({
								icon: "none",
								title: '请填写正确工商联系电话'
							})
							return
						}
					}
					// console.log(this.form)
					this.$http.addCompany(this.form).then(res=>{
						if(res.data.code == "200"){
							uni.showToast({
								icon: "success",
								title: '添加成功'
							})
							uni.switchTab({
								url:"/pages/index/list"
							})
						}else{
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	.input_s {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 20rpx;
		background: #F7F9FB;
		border-radius: 5px;
		margin: 30rpx 0;
		border: 1px solid #E2E8EE;
	}

	.input_p {
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 20rpx;
		background: #F7F9FB;
		border-radius: 5px;
		margin: 30rpx 0;
		border: 1px solid #E2E8EE;
	}
</style>
