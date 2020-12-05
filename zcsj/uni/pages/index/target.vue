<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-blue':''" v-for="(item,index) in targetClass" :key="index" @click="tabSelect"
			 :data-id="item.id" :data-index="index">
				{{item.title}}
			</view>
		</scroll-view>
		<view class="text-red padding">备注：金额以万元为单位，数量以个为单位，面积以平方米为单位，时间以年为单位</view>
		<view class="">
			<view class="padding text-blue">
				未完善指标--{{companyDetail.name}}
			</view>
			<view class="">
				<form catchsubmit="formSubmit">
					<view class="cu-form-group justify-around" :class="(item.type == '3' || item.type== '4')?'isCheck':''" v-for="(item,index1) in target" :key="index1" v-show="item.status == '0'">
						<view class="title">{{item.targetName}}:</view>
						<input :name="item.content" v-model="item.content" type="number" v-if="item.type == '1'" ></input>
						<input :name="item.content" v-model="item.content" v-if="item.type == '2'"></input>
						<radio-group class="flex align-center" v-model="item.content" v-if="item.type == '3'" @change="(e)=>{handelChange(index1,e)}">
							<view class="margin-left-sm" v-for="data in item.dictBiz" :key="data">
								<label>
									<text>{{data.dictValue}}</text>
									<radio style="transform: scale(0.653);" :value="data.dictValue" :checked="item.content == data.dictValue?true:false"
									 class=""></radio>
								</label>
							</view>
						</radio-group>
						<checkbox-group class="flex align-center" v-model="item.content" v-if="item.type == '4'" @change="(e)=>{handelChange(index1,e)}">
							<view class="margin-left-sm" v-for="data in item.dictBiz" :key="data">
								<label>
									<text>{{data.dictValue}}</text>
									<checkbox style="transform: scale(0.653);" :value="data.dictValue" class="" :checked="item.content.indexOf(data.dictValue) == '-1'?false:true"></checkbox>
								</label>
							</view>
						</checkbox-group>
					</view>
				</form>
			</view>
			<view class="">
				<view class="text-blue padding">
					已完善指标--{{companyDetail.name}}
				</view>
				<form catchsubmit="formSubmit" bindsubmit="formSubmit">
					<view class="cu-form-group justify-around" v-for="(item,index1) in target" :key="index1" v-show="item.status == '1'">
						<view class="title">{{item.targetName}}:</view>
						<input :name="item.content" v-model="item.content" type="number" v-if="item.type == '1'"></input>
						<input :name="item.content" v-model="item.content" v-if="item.type == '2'"></input>
						<radio-group class="flex align-center" v-model="item.content" v-if="item.type == '3'" @change="(e)=>{handelChange(index1,e)}">
							<view class="margin-left-sm" v-for="(data,index) in item.dictBiz" :key="data">
								<label>
									<text>{{data.dictValue}}</text>
									<radio style="transform: scale(0.653);" :value="data.dictValue" :checked="item.content == data.dictValue?true:false"
									 class=""></radio>
								</label>
							</view>
						</radio-group>
						<checkbox-group class="flex align-center" v-model="item.content" v-if="item.type == '4'" @change="(e)=>{handelChange(index1,e)}">
							<view class="margin-left-sm" v-for="(data,index) in item.dictBiz" :key="data">
								<label>
									<text>{{data.dictValue}}</text>
									<checkbox style="transform: scale(0.653);" :value="data.dictValue" :checked="item.content.indexOf(data.dictValue) == '-1'?false:true"
									 class=""></checkbox>
								</label>
							</view>
						</checkbox-group>
					</view>
					<view class="" style="width: 100%;">
						<button @click="handelSubmit" class="bg-gradual-blue round text-center" style="width: 50%;margin: 30rpx auto;line-height: 80rpx;">提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: {
					current: 1,
					size: -1,
					companyId: "",
					targetClassId: ''
				},
				companyId: "", //公司ID
				targetClass: null, //所有指标分类
				total: "",
				companyDetail: "",
				target: [],
				targetForm: {},
				targetCheckForm: {},
				status: "",
				TabCur: 0,
				scrollLeft: 0,
				selectionList: [],
			};
		},
		onLoad(options) {
			// console.log(options.id)
			this.page.companyId = options.id
			this.getTarget()
		},
		methods: {
			handelSubmit() {
				this.target.forEach((item) => {
				  if(item.id == "-1"){
				    delete item.id;
				  }
				  if(item.type == '4'){
				    item.content = item.content.join('|')
				  }
				});
				var form = this.target.filter((item) => item.content != "" || item.id != '-1');
			    this.$http.saveAllTarget(form).then(res=>{
					if(res.data.code == '200'){
						uni.showToast({
							icon:"success",
							title:"提交成功！"
						})
						this.getTarget();
					}
				})
			  },
			handelChange(index,e) {
				this.target[index].content = e.detail.value
			},
			handelChange2(index,e) {
				this.target[index].content = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.index;
				this.page.targetClassId = e.currentTarget.dataset.id;
				this.getTargetClass(this.page);
				this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60;
			},
			getTargetClass(page) {
				this.$http.companyTargetByClass(page).then((res) => {
					this.target = res.data.data.records;
					this.target.forEach((item) => {
						if (item.type == "4") {
							item.content = item.content.split("|");
						}
					});
				});
			},
			getTarget() {
				this.$http.companyTarget("0").then((res) => {
					this.targetClass = res.data.data;
					this.page.targetClassId = res.data.data[0].id;
					this.getTargetClass(this.page)
				});
				this.$http.getCompanyDetail(this.page.companyId).then((res) => {
					this.companyDetail = res.data.data;
				});
			},
		}
	}
</script>

<style lang="scss">
.isCheck{
	display: block !important;
	padding: 5px 10px;
	border-top: 1px solid #eee;
	
}
</style>
