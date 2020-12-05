<template>
	<basic-container>
		<avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" :permission="permissionList"
		 :search.sync="search" :before-open="beforeOpen" v-model="form" ref="crud" @row-update="rowUpdate" @row-save="rowSave"
		 @row-del="rowDel" @search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange"
		 @current-change="currentChange" @size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad">
			<template slot="menu" slot-scope="{ row }">
				<el-tooltip class="item" effect="dark" content="新建沟通" placement="bottom">
					<el-button type="primary" icon="el-icon-chat-dot-square" circle size="small" @click="addRecord(row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="新增约见" placement="bottom">
					<el-button type="primary" icon="el-icon-hot-water" @click="addAppointment(row)" circle size="small"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="联系人" placement="bottom">
					<el-button type="warning" icon="el-icon-user" circle size="small" @click="addUser(row)"></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="合同模板" placement="bottom">
					<el-button type="success" icon="el-icon-tickets" circle size="small"></el-button>
				</el-tooltip>
			</template>
			<template slot="menuRight">
				<el-button type="success" size="small" @click="handleAddCompany">添加公司</el-button>
				<!-- <el-button type="success" size="small">添加渠道</el-button> -->
			</template>
			<!-- 自定义公司列 -->
			<template slot="name" slot-scope="{ row }">
				<span style="color: #409eff; cursor: pointer" @click="editCompony(row)">{{ row.name }}</span>
			</template>
			<!-- 资质标签 -->
			<template slot="qualities" slot-scope="{ row }">
				<span style="color: #409eff; cursor: pointer" @click="editSalesManager(row)">{{ row.qualities }}</span>
			</template>
			<!-- 荣誉数 -->
			<template slot="projectNum" slot-scope="{ row }">
				<span style="color: #409eff; cursor: pointer" @click="editProjectNum(row)">{{ row.projectNum }}</span>
			</template>
			<!-- 公司指标数据 -->
			<template slot="rates" slot-scope="{ row }">
				<span style="color: #409eff; cursor: pointer" @click="editCompanyTarget(row)">{{ row.rates }}</span>
			</template>
			<!-- 意向项目 -->
			<template slot="purpose" slot-scope="{ row }">
				<span style="color: #409eff; cursor: pointer" @click="editProject(row)">{{ row.purpose }}</span>
			</template>
			<!-- 虚拟符合数 -->
			<template slot="virtualNum" slot-scope="{ row }">
				<span style="color: #409eff; cursor: pointer; width: 30px" @click="openVirtualDialog(row)">{{ row.virtualNum }}</span>
			</template>
			<!-- 沟通记录 -->
			<template slot="communicateTime" slot-scope="{ row }">
				<!-- <el-button type="success" icon="el-icon-document" circle size="small"></el-button> -->
				<span style="color: #409eff; cursor: pointer" @click="editConRecord(row)">{{ row.communicateTime.substring(0, 10) }}</span>
			</template>
			<template slot="searchMenu">
				<el-button size="small" type="primary" :icon="moreShow?'el-icon-upload2':'el-icon-download'" @click="showMore">{{moreShow?'折叠':'展开'}}</el-button>
			</template>
			<!-- 自定义搜索 -->
			<template slot-scope="{disabled,size}" slot="lastCommunicateTimeSearch">
				<el-date-picker v-model="search.lastCommunicateTime" type="daterange" align="right" unlink-panels range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="lastpickerOptions" format="yyyy-MM-dd"
				 value-format="yyyy-MM-dd" :default-value="[defalutDate]">
				</el-date-picker>
			</template>
			<template slot-scope="{disabled,size}" slot="nextCommunicateTimeSearch">
				<el-date-picker v-model="search.nextCommunicateTime" type="daterange" align="right" unlink-panels range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="nextpickerOptions" format="yyyy-MM-dd"
				 value-format="yyyy-MM-dd">
				</el-date-picker>
			</template>
		</avue-crud>
		<!-- 添加公司对话框 -->
		<el-dialog :title="componyTitle" :visible.sync="addCompany" width="45%" @close="handleCompanyClose" @open="handelReset"
		 :append-to-body="true" :center="true" :close-on-click-modal="false">
			<avue-form ref="componyForm" :option="formOption" v-model="companyForm" @submit="handleSubmit">
				<template slot="menuForm">
					<el-button @click="handleEmpty">取消</el-button>
				</template>
				<!-- <template slot="gradeType" slot-scope="{ item }">
          <span style="float: left">{{ item.dictValue }}</span>
          <span style="float: right">描述</span>
        </template> -->
			</avue-form>
		</el-dialog>
		<!-- 资质标签 -->
		<el-dialog :title="salesManagerTitle" :visible.sync="addSalesManager" width="55%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false">
			<div style="margin: 20px 0px 20px 50px">
				已选标签：
				<div>
					<el-tag v-for="tag in qualificationss" :key="tag" closable @close="handleDeleteTag(tag)">
						{{ tag.label }}
					</el-tag>
				</div>
			</div>
			<avue-form :option="salesManagerOption" v-model="qualifiForm" ref="salesManager">
			</avue-form>
			<div style="margin: 0px 0px 20px 50px">
				请选择：
				<div style="margin-top: 20px">
					<el-checkbox-group v-model="checkList" @change="qualificationChange">
						<el-checkbox v-for="(item, index) in pleaseCheck" :key="index" :label="item">{{ item.label }}</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
			<div style="width: 100%; margin: 0px 300px 50px">
				<el-button type="primary" @click="salesManagerSubmit">确定</el-button>
				<el-button type="danger" @click="salesManagerEmpty">取消</el-button>
			</div>
		</el-dialog>
		<!-- 意向项目 -->
		<el-dialog :title="wantProjectTitle" :visible.sync="wantProject" width="50%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false">
			<!-- <avue-form
        :option="wantProjectOption"
        v-model="ProjecForm"
        @submit="wantProjectSubmit"
        ref="wantProject"
      >
        <template slot="menuForm">
          <el-button @click="wantProjectEmpty">取消</el-button>
        </template>
        <template slot-scope="{row}"></template>
      </avue-form> -->
			<el-checkbox-group v-model="ProjecForm" v-if="dict.length">
				<el-checkbox :label="items.dictValue" v-for="(items, index) in dict" :key="index"></el-checkbox>
			</el-checkbox-group>
			<div class="content">
				<el-button type="primary" @click="wantProjectSubmit">提交</el-button>
				<el-button type="danger" @click="wantProjectEmpty">取消</el-button>
			</div>
		</el-dialog>
		<!-- 沟通记录 -->
		<el-dialog :title="conRecordTitle" :visible.sync="conRecord" width="60%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false">
			<avue-crud :option="recordOption" v-model="communicateForm" :data="communicateData" ref="conRecord"></avue-crud>
		</el-dialog>
		<!-- 新建沟通 -->
		<el-dialog :title="addRecordTitle" :visible.sync="addRecordDialog" width="50%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false">
			<avue-form :option="addRecordOption" v-model="addRecordForm" ref="addRecordForm" @submit="addRecordSubmit">
				<template slot="menuForm">
					<el-button @click="addRecordEmpty">取消</el-button>
				</template>
			</avue-form>
		</el-dialog>
		<!-- 联系人 -->
		<el-dialog :title="addUserTitle" :visible.sync="addUserDialog" width="70%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false" @open="beforeContracts">
			<avue-crud :option="addUserOption" v-model="userForm" :table-loading="loading" :data="userData" @row-update="rowUpdateUser"
			 @row-save="rowSaveUser" @row-del="rowDelUser" ref="addUser">
				<!-- <template slot="status" slot-scope="{row}">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(row)"
          ></el-switch>
          {{row.status}}
        </template> -->
			</avue-crud>
		</el-dialog>
		<!-- 新增约见 -->
		<el-dialog :title="addAppointTitle" :visible.sync="addAppointDialog" width="50%" :append-to-body="true" :center="true"
		 @open="handelReset" :close-on-click-modal="false">
			<avue-form :option="addAppointOption" v-model="addAppoinform" @submit="addAppointSubmit" ref="addAppointment">
				<template slot="menuForm">
					<el-button @click="addRecordEmpty">取消</el-button>
				</template>
			</avue-form>
		</el-dialog>
		<!-- 虚拟符合数 -->
		<el-dialog :title="virtualTitle" :visible.sync="virtualDialog" width="60%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false">
			<el-tag v-for="item in policyList" :key="item.id" @click="toPolicyExcel(item.id)">{{ item.name }}</el-tag>
		</el-dialog>
		<!-- 已获荣誉 -->
		<el-dialog :title="projectNumTitle" :visible.sync="projectNumDialog" width="60%" :append-to-body="true" :center="true"
		 :close-on-click-modal="false">
			<el-tag v-for="item in projectList" :key="item.id" :type="item.policyId ? 'success' : 'info'" @click="toProjectNum(item.name)">{{ item.name }}</el-tag>
		</el-dialog>
	</basic-container>
</template>

<script>
	import {
		getList,
		getDetail,
		add,
		update,
		remove,
		getSource,
		saveCompony,
		updataCompony,
		getRegionDetail,
		companyGrade,
		companyProjects,
		getContactsList,
		addContacts,
		updateContacts,
		removeContacts,
		submitProjects,
		addCommunicate,
		addAppointment,
		getCommunicateList,
		getQualification,
		searchQualification,
		saveAllQualification,
		getVirtualNum,
		getCompanyproject,
		getisExist,
	} from "@/api/crm/company";
	import {
		getLazyTree
	} from "@/api/base/region";
	import {
		getMenuTree
	} from "@/api/crm/business";
	import {
		mapGetters
	} from "vuex";
	// import { delete } from 'vue/types/umd';
	const DIC4 = [{
			label: "决策人",
			value: 2,
		},
		{
			label: "联系人",
			value: 3,
		},
		{
			label: "经办人",
			value: 4,
		},
		{
			label: "中间人",
			value: 5,
		},
	];
	const DIC8 = [{
			label: "减税",
			value: "减税",
		},
		{
			label: "奖励 ",
			value: "奖励",
		},
		{
			label: "上市",
			value: "上市",
		},
		{
			label: "政府要求",
			value: "政府要求",
		},
		{
			label: "同行竞争",
			value: "同行竞争",
		},
		{
			label: "品牌宣传",
			value: "品牌宣传",
		},
		{
			label: "投标",
			value: "投标",
		},
	];
	const DIC9 = [{
			label: "没有专利",
			value: "没有专利",
		},
		{
			label: "没有主要负责人",
			value: "没有主要负责人",
		},
		{
			label: "老板意识不强",
			value: "老板意识不强",
		},
		{
			label: "销售收入比较少",
			value: "销售收入比较少",
		},
		{
			label: "财务没有得分",
			value: "财务没有得分",
		},
		{
			label: "研发费用不够",
			value: "研发费用不够",
		},
		{
			label: "技术太低端",
			value: "技术太低端",
		},
		{
			label: "第三方申报失败",
			value: "第三方申报失败",
		},
		{
			label: "自行申报失败",
			value: "自行申报失败",
		},
		{
			label: "价格问题",
			value: "价格问题",
		},
	];
	const DIC10 = [{
			label: "企业规划",
			value: "企业规划",
		},
		{
			label: "同行申报",
			value: "同行申报",
		},
		{
			label: "企业有问题",
			value: "企业有问题",
		},
		{
			label: "申报时间",
			value: "申报时间",
		},
	];
	const DIC11 = [{
			label: "价格",
			value: "价格",
		},
		{
			label: "专业",
			value: "专业",
		},
		{
			label: "政府关系",
			value: "政府关系",
		},
		{
			label: "省事",
			value: "省事",
		},
	];
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
					callback(new Error("请输入正确手机号"));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				var reg = /(^(\d{3,4}-)?\d{7,8})$|([1][3,4,5,6,7,8,9][0-9]{9})/;
				if ("" != value && !reg.test(value)) {
					callback(new Error("请输入正确电话号码"));
				} else {
					callback();
				}
			};
			var validatePass3 = (rule, value, callback) => {
				var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
				if ("" != value && !reg.test(value)) {
					callback(new Error("请输入正确邮箱"));
				} else {
					callback();
				}
			};
			var shortcuts = [{
				text: '最近一周',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
				}
			}, {
				text: '最近一个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
				}
			}, {
				text: '最近三个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
				}
			}];
			var lastcuts = [{
				text: '最近一周',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
				}
			}, {
				text: '最近一个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
				}
			}, {
				text: '最近三个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
				}
			}];
			return {
				form: {},
				userForm: {},
				search: {},
				query: {},
				addRecordForm: {},
				loading: true,
				parentCode: "00",
				page: {
					pageSize: 10,
					currentPage: 1,
					total: 0,
				},
				pageContacts: {
					pageSize: -1,
					currentPage: 1,
				},
				companyId: "", //公司id
				selectionList: [],
				companyForm: null,
				addCompany: false, //添加公司
				componyTitle: "添加公司",
				salesManagerTitle: "",
				qualifiForm: {},
				qualificationss: [],
				pleaseCheck: [], //请选择
				checkList: [], //选中列表
				dataRange: [],
				tempss: [], //已选择标签
				addSalesManager: false, //资质标签
				wantProject: false,
				ProjecForm: [],
				dictId: "",
				dict: [],
				projectId: "",
				wantProjectTitle: "", //意向项目
				conRecord: false,
				conRecordTitle: "", //沟通记录
				addRecordDialog: false,
				communicateData: [],
				communicateForm: {},
				addRecordTitle: "", // 新建沟通
				addUserTitle: "",
				addAppointTitle: "", //新增约见
				addAppointDialog: false,
				virtualDialog: false, //虚拟符合数
				virtualTitle: "",
				projectNumTitle: "", //已获荣誉
				projectNumDialog: false,
				projectList: null,
				policyList: null,
				addAppoinform: {},
				addUserDialog: false, //联系人
				treeData: [], //地区树
				//当前时间前一个月
				lastDate:"",
				nextpickerOptions: { //日期配置
					disabledDate(time) {
						return time.getTime() < Date.now();
					},
					shortcuts: shortcuts
				},
				lastpickerOptions: { //日期配置
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: lastcuts
				},
				option: {
					height: "auto",
					calcHeight: 30,
					align: "center",
					menuAlign: "center",
					tip: true,
					stripe: true,
					addBtn: false,
					viewBtn: false,
					editBtn: false,
					delBtn: false,
					searchMenuSpan: 6,
					border: true,
					// selection: true,
					dialogClickModal: false,
					menuWidth: 200,
					searchIcon: true,
					index: true,
					column: [{
							label: "公司名称",
							prop: "name",
							slot: true,
							width: 250,
							rules: [{
								required: true,
								message: "请输入公司名称",
								trigger: "blur",
							}, ],
							search: true,
							fixed: true,
						},
						{
							label: "公司级别",
							prop: "grade",
							type: "tree",
							search: true,
							dicData: [],
							dataType: "string",
							props: {
								label: "dictValue",
								value: "dictKey",
							},
							rules: [{
								required: true,
								message: "请选择公司级别",
								trigger: "blur",
							}, ],
							width: 50,
						},
						{
							label: "荣誉数",
							prop: "projectNum",
							sortable: true,
							span: 24,
							slot: true,
							rules: [{
								required: true,
								message: "请输入荣誉数",
								trigger: "blur",
							}, ],
							width: 80,
						},
						{
							label: "资质标签",
							prop: "qualities",
							sortable: true,
							width: 100,
							span: 24,
							slot: true,
							hide: true,
							rules: [{
								required: true,
								message: "请输入资质标签",
								trigger: "blur",
							}, ],
						},
						{
							label: "指标率",
							prop: "rates",
							sortable: true,
							width: 100,
							slot: true,
							rules: [{
								required: true,
								message: "请输入指标率",
								trigger: "blur",
							}, ],
						},
						{
							label: "意向项目",
							prop: "purpose",
							width: 100,
							sortable: true,
							slot: true,
							rules: [{
								required: true,
								message: "请输入意向项目",
								trigger: "blur",
							}, ],
						},
						{
							label: "虚拟符合数",
							sortable: true,
							width: 100,
							prop: "virtualNum",
							rules: [{
								required: true,
								message: "请输入虚拟符合数",
								trigger: "blur",
							}, ],
							slot: true,
						},
						{
							label: "沟通记录",
							prop: "communicateTime",
							width: 100,
							type: "dateTime",
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
							sortable: true,
							slot: true,
							rules: [{
								required: true,
								message: "请输入沟通记录",
								trigger: "blur",
							}, ],
						},
						{
							label: "约见记录",
							prop: "appoinmentTime",
							type: "date",
							width: 100,
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
							sortable: true,
							searchSpan: 8,
							searchRange: true,
							search: false,
							rules: [{
								required: true,
								message: "请输入约见记录",
								trigger: "blur",
							}, ],
						},
						{
							label: "导出合同模板",
							prop: "contemplate",
							hide: true,
						},
						{
							label: "销售代表",
							prop: "salesManagerName",
							rules: [{
								required: true,
								message: "请输入销售代表",
								trigger: "blur",
							}, ],
						},
						{
							label: "合同",
							prop: "contract",
							sortable: true,
							rules: [{
								required: true,
								message: "请输入合同",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户来源",
							prop: "source",
							type: "tree",
							hide: true,
							dicUrl: "/api/crm/company/source",
							props: {
								label: "dictValue",
								value: "dictKey",
							},
							search: false
						},
						{
							label: "所属行业",
							prop: "business",
							type: "tree",
							hide: true,
							checkStrictly: true,
							search: false,
							dicUrl: "/api/crm/business/tree",
							props: {
								label: "title",
							},
						},
						{
							label: "注册地区",
							prop: "regionCode",
							type: "tree",
							props: {
								label: "title",
							},
							dicUrl: "/api/blade-system/region/lazy-tree",
							dicQuery: {
								parentCode: this.parentCode
							},
							hide: true,
							checkStrictly: true,
							search: false,
							searchSpan: 6
						},
						{
							label: "成立时间",
							prop: "registerTime",
							type: "monthrange",
							width: 100,
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
							sortable: true,
							searchSpan: 8,
							searchRange: true,
							search: false,
							rules: [{
								required: true,
								message: "请输入成立时间",
								trigger: "blur",
							}, ],
							pickerOptions: {
								disabledDate(time) {
									return time.getTime() > Date.now();
								},
								shortcuts: [{
									text: '最近一个月',
									onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setMonth(start.getMonth() - 1);
										picker.$emit('pick', [start, end]);
									}
								},  {
									text: '最近六个月',
									onClick(picker) {
										const end = new Date();
										const start = new Date();
										start.setMonth(start.getMonth() - 6);
										picker.$emit('pick', [start, end]);
									}
								},{
									text: '今年至今',
									onClick(picker) {
										const end = new Date();
										const start = new Date(new Date().getFullYear(), 0);
										picker.$emit('pick', [start, end]);
									}
								},]
							},
						},
						{
							label: "最后沟通时间",
							prop: "lastCommunicateTime",
							type: "date",
							hide: true,
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
							sortable: true,
							searchSpan: 8,
							searchRange: true,
							search: false,
							searchslot: true,
						},
						{
							label: "下次沟通时间",
							prop: "nextCommunicateTime",
							type: "date",
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
							hide: true,
							sortable: true,
							searchSpan: 8,
							searchRange: true,
							search: false,
							searchslot: true
						},
					],
				},
				data: [],
				userData: [],
				//添加公司
				formOption: {
					span: 24,
					emptyBtn: false,
					submitText: "确定",
					card: true,
					column: [{
							label: "公司名称",
							prop: "name",
							rules: [{
								required: true,
								message: "请输入公司名称",
								trigger: "blur",
							}, ],
							blur: ({
								value
							}) => {
								getisExist({
									name: value
								}).then((res) => {
									if (res.data.data) {
										this.$message.success("该公司已存在请勿重复添加！");
									}
								});
							},
						},
						{
							label: "所属行业",
							prop: "business",
							type: "tree",
							dicData: [],
							props: {
								label: "title",
							},
							rules: [{
								required: true,
								message: "请选择所属行业",
								trigger: "blur",
							}, ],
						},
						{
							label: "成立时间",
							prop: "establishedTime",
							type: "date",
							rules: [{
								required: true,
								message: "请输入成立时间",
								trigger: "blur",
							}, ],
							pickerOptions: {
								disabledDate(time) {
									return time.getTime() > Date.now();
								},
							},
						},
						{
							label: "注册地区",
							placeholder: "",
							prop: "regionCode",
							type: "cascader",
							props: {
								label: "title",
							},
							dicData: [],
							lazy: true,
							lazyLoad(node, resolve) {
								// console.log(node.value);
								if (node.value) {
									const parentCode = node.value;
									getLazyTree(parentCode).then((res) => {
										resolve(res.data.data);
									});
								}
							},
							// checkStrictly: true,
							rules: [{
								required: true,
								message: "请选择注册地区",
								trigger: "blur",
							}, ],
						},
						{
							label: "详细地址",
							prop: "address",
							rules: [{
								required: true,
								message: "请输入公司详细地址",
								trigger: "blur",
							}, ],
						},
						{
							label: "经营范围",
							prop: "scope",
							type: "textarea",
							span: 24,
						},
						{
							label: "联系人",
							prop: "contacts_name",
							rules: [{
								required: true,
								message: "请输入联系人",
								trigger: "blur",
							}, ],
							display: true,
						},
						{
							label: "联系人手机号",
							prop: "contacts_phone",
							rules: [{
								required: true,
								validator: validatePass,
								trigger: "blur",
							}, ],
							display: true,
						},
						{
							label: "邮箱",
							prop: "contacts_email",
							rules: [{
								required: false,
								validator: validatePass3,
								trigger: "blur",
							}, ],
							display: true,
						},
						{
							label: "",
							prop: "contacts",
							display: false,
						},
						{
							label: "客户法人",
							prop: "legalPerson",
							rules: [{
								required: true,
								message: "请输入客户法人",
								trigger: "blur",
							}, ],
						},
						{
							label: "工商联系电话",
							prop: "phone",
							rules: [{
								required: false,
								validator: validatePass2,
								trigger: "blur",
							}, ],
						},
						{
							label: "销售代表",
							prop: "salesManagerName",
							dispaly: false,
						},
						{
							label: "客户级别",
							prop: "grade",
							type: "tree",
							search: true,
							dicData: [],
							// typeslot: true,
							dataType: "string",
							props: {
								label: "dictValue",
								value: "dictKey",
							},
							rules: [{
								required: true,
								message: "请选择客户级别",
								trigger: "blur",
							}, ],
						},
						{
							label: "状态",
							prop: "status",
							type: "radio",
							value: 1,
							dicData: [{
									label: "启用",
									value: 1,
								},
								{
									label: "停用",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户来源",
							prop: "source",
							type: "tree",
							dicData: [],
							props: {
								label: "dictValue",
								value: "dictKey",
							},
							rules: [{
								required: true,
								message: "请选择客户来源",
								trigger: "blur",
							}, ],
						},
					],
				},
				//资质标签
				salesManagerOption: {
					emptyBtn: false,
					submitBtn: false,
					card: true,
					column: [{
							label: "开始日期",
							type: "year",
							// prop: "daterange",
							span: 12,
							prop: "startTime",
							format: "yyyy",
							valueFormat: "yyyy",
							change: (date) => {
								this.dataRange[0] = date.value;
							},
						},
						{
							label: "结束日期",
							type: "year",
							span: 12,
							// prop: "daterange",
							prop: "endTime",
							format: "yyyy",
							valueFormat: "yyyy",
							change: (date) => {
								this.dataRange[1] = date.value;
							},
						},
						{
							label: "资质标签",
							prop: "qualification",
							change: (data) => {
								if (this.dataRange.length == "0") {
									this.dataRange[0] = "";
									this.dataRange[1] = "";
								}
								if (data.value != "") {
									searchQualification(
										this.dataRange[0],
										this.dataRange[1],
										data.value
									).then((res) => {
										res.data.data.forEach((item) => {
											item.label =
												item.qualify + "-" + item.parentName + "-" + item.name;
										});
										this.pleaseCheck = res.data.data;
										this.qualificationss.forEach((item) => {
											this.pleaseCheck = this.pleaseCheck.filter(
												(data) => data.id != item.qualificationId
											);
											// res.data.data.forEach(data=>{
											//   if(data.id != item.qualificationId){
											//     this.pleaseCheck.push(data);
											//   }
											// })
										});
									});
								}
							},
						},
					],
				},
				// 意向项目
				wantProjectOption: {
					emptyBtn: false,
					submitText: "确定",
					card: true,
					labelWidth: 0,
					column: [{
						label: "",
						prop: "content",
						span: 24,
						type: "checkbox",
						dicData: [],
						props: {
							label: "dictValue",
							value: "dictKey",
						},
					}, ],
				},
				//沟通记录
				recordOption: {
					menu: false,
					addBtn: false,
					searchBtn: false,
					refreshBtn: false,
					columnBtn: false,
					column: [{
							label: "公司",
							prop: "companyName",
							rules: [{
								required: true,
								message: "请输入公司",
								trigger: "blur",
							}, ],
							editDisabled: true,
						},
						{
							label: "创建者",
							prop: "salesManagerName",
							rules: [{
								required: true,
								message: "创建者",
								trigger: "blur",
							}, ],
							editDisabled: true,
						},
						{
							label: "下次沟通时间",
							prop: "communitionTime",
							rules: [{
								required: true,
								message: "请输入下次沟通时间",
								trigger: "blur",
							}, ],
							pickerOptions: {
								disabledDate(time) {
									return time.getTime() < Date.now();
								},
							},
						},
						{
							label: "创建时间",
							prop: "createTime",
							rules: [{
								required: true,
								message: "创建时间",
								trigger: "blur",
							}, ],
							editDisabled: true,
						},

						{
							label: "沟通内容",
							prop: "communicationContent",
							rules: [{
								required: true,
								message: "请输入沟通内容",
								trigger: "blur",
							}, ],
						},
						{
							label: "备注",
							prop: "remark",
							rules: [{
								required: true,
								message: "请输入备注",
								trigger: "blur",
							}, ],
						},
					],
				},
				//新建沟通
				addRecordOption: {
					emptyBtn: false,
					submitText: "确定",
					column: [{
							label: "下次沟通时间",
							prop: "communitionTime",
							type: "datetime",
							format: "yyyy-MM-dd",
							valueFormat: "yyyy-MM-dd",
							labelWidth: "150",
							span: 24,
							rules: [{
								required: true,
								message: "请选择下次沟通时间",
								trigger: "blur",
							}, ],
							pickerOptions: {
								disabledDate(time) {
									return time.getTime() < Date.now();
								},
							},
						},
						{
							label: "沟通内容",
							prop: "communicationContent",
							labelWidth: 150,
							align: "center",
							span: 24,
						},
						{
							label: "备注",
							prop: "remark",
							labelWidth: 150,
							type: "textarea",
							span: 24,
						},
					],
				},
				//联系人管理
				addUserOption: {
					height: "auto",
					calcHeight: 30,
					searchBtn: false,
					refreshBtn: false,
					columnBtn: false,
					viewBtn: false,
					border: true,
					menuWidth: 200,
					index: true,
					column: [{
							label: "姓名",
							prop: "name",
							rules: [{
								required: true,
								message: "请输入姓名",
								trigger: "blur",
							}, ],
						},
						{
							label: "公司名",
							prop: "companyName",
							addDisplay: false,
							editDisplay: false,
						},
						{
							label: "联系方式",
							prop: "phone",
							rules: [{
								validator: validatePass,
								trigger: "blur",
								required: true,
							}, ],
						},
						{
							label: "微信",
							prop: "wechat",
						},
						{
							label: "邮箱",
							prop: "email",
							rules: [{
								validator: validatePass3,
								trigger: "blur",
								required: false,
							}, ],
						},
						{
							label: "职位",
							prop: "position",
							rules: [{
								required: true,
								message: "请输入职位",
								trigger: "blur",
							}, ],
						},
						{
							label: "QQ",
							prop: "qq",
							hide: true,
						},
						{
							label: "传真",
							hide: true,
							prop: "fax",
						},
						{
							label: "openId",
							prop: "openId",
							hide: true,
						},
						{
							label: "添加时间",
							prop: "createTime",
							rules: [{
								required: true,
								message: "请选择添加时间",
								trigger: "blur",
							}, ],
							addDisplay: false,
							editDisplay: false,
						},
						{
							label: "状态",
							prop: "status",
							type: "radio",
							value: 1,
							// slot:true,
							dicData: [{
									label: "启用",
									value: 1,
								},
								{
									label: "禁用",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择禁用状态",
								trigger: "blur",
							}, ],
							// addDisplay: false,
							// editDisplay: false,
						},
						{
							label: "审核状态",
							prop: "auditState",
							type: "radio",
							value: 1,
							dicData: [{
									label: "通过",
									value: 1,
								},
								{
									label: "不通过",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择审核状态",
								trigger: "blur",
							}, ],
						},
						{
							label: "加入状态",
							prop: "joinState",
							type: "radio",
							value: 1,
							dicData: [{
									label: "通过",
									value: 1,
								},
								{
									label: "拒绝",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择加入状态",
								trigger: "blur",
							}, ],
						},
						{
							label: "法人",
							prop: "egalPerson",
							type: "radio",
							value: 0,
							dicData: [{
									label: "是",
									value: 1,
								},
								{
									label: "否",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择",
								trigger: "blur",
							}, ],
						},
						{
							label: "决策人",
							prop: "isPolicymaker",
							type: "radio",
							value: 0,
							hide: true,
							dicData: [{
									label: "是",
									value: 1,
								},
								{
									label: "否",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择",
								trigger: "blur",
							}, ],
						},
						{
							label: "是否接受模板消息",
							prop: "isRecipient",
							type: "radio",
							hide: true,
							value: 0,
							dicData: [{
									label: "是",
									value: 1,
								},
								{
									label: "否",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择",
								trigger: "blur",
							}, ],
						},
						{
							label: "联系人",
							prop: "isLinkman",
							type: "radio",
							hide: true,
							value: 0,
							dicData: [{
									label: "是",
									value: 1,
								},
								{
									label: "否",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请选择",
								trigger: "blur",
							}, ],
						},
						{
							label: "个人特点",
							prop: "trait",
							hide: true,
							type: "textarea",
							span: 24,
						},
					],
				},
				//新增约见
				addAppointOption: {
					emptyBtn: false,
					submitText: "确定",
					column: [{
							label: "预约时间",
							prop: "appointmentTime",
							type: "datetime",
							format: "yyyy-MM-dd hh:mm:ss",
							valueFormat: "yyyy-MM-dd hh:mm:ss",
							rules: [{
								required: true,
								message: "点击选择时间",
								trigger: "blur",
							}, ],
							pickerOptions: {
								disabledDate(time) {
									return time.getTime() < Date.now();
								},
							},
						},
						// {
						//   label: "客户经理",
						//   prop: "salesManager",
						//   rules: [
						//     {
						//       required: true,
						//       message: "联想输入",
						//       trigger: "blur",
						//     },
						//   ],
						// },
						{
							label: "意向项目",
							prop: "intention",
							type: "checkbox",
							span: 24,
							props: {
								label: "dictValue",
								value: "dictValue",
							},
							rules: [{
								required: true,
								message: "联想输入",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户来源",
							prop: "source",
							type: "tree",
							dicData: [],
							props: {
								label: "dictValue",
								value: "dictKey",
							},
							rules: [{
								required: true,
								message: "请选择客户来源",
								trigger: "blur",
							}, ],
						},
						{
							label: "角色",
							prop: "role",
							type: "tree",
							dicData: DIC4,
							rules: [{
								required: true,
								message: "-请选择-",
								trigger: "blur",
							}, ],
						},
						{
							label: "姓名",
							prop: "name",
							rules: [{
								required: true,
								message: "请输入姓名",
								trigger: "blur",
							}, ],
						},
						{
							label: "手机号",
							prop: "phone",
							rules: [{
								validator: validatePass,
								required: true,
								trigger: "blur",
							}, ],
						},
						{
							label: "微信号",
							prop: "wechat",
							type: "radio",
							dicData: [{
									label: "是",
									value: 1,
								},
								{
									label: "否",
									value: 0,
								},
							],
							rules: [{
								required: true,
								message: "请输入微信号",
								trigger: "blur",
							}, ],
						},
						{
							label: "职位",
							prop: "position",
							rules: [{
								required: true,
								message: "请输入职位",
								trigger: "blur",
							}, ],
						},
						{
							label: "公司地址",
							placeholder: "",
							prop: "companyAddress",
							rules: [{
								required: true,
								message: "请选择注册地区",
								trigger: "blur",
							}, ],
						},
						{
							label: "公司地址定位",
							prop: "addressLocalization",
							type: "radio",
							dicData: [{
									label: "是",
									value: "0",
								},
								{
									label: "否",
									value: "1",
								},
							],
							rules: [{
								required: true,
								message: "请输入公司地址定位",
								trigger: "blur",
							}, ],
						},
						{
							label: "公司成立时间",
							prop: "establishedTime",
							type: "date",
							format: "yyyy-MM-dd hh:mm:ss",
							valueFormat: "yyyy-MM-dd hh:mm:ss",
							rules: [{
								required: true,
								message: "请输入公司成立时间",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户预计项目启动时间",
							prop: "projectStartime",
							type: "date",
							format: "yyyy-MM-dd hh:mm:ss",
							valueFormat: "yyyy-MM-dd hh:mm:ss",
							rules: [{
								required: true,
								message: "请输入客户预计项目启动时间",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户申请项目目的",
							prop: "appliedProjects",
							span: 24,
							type: "checkbox",
							dicData: DIC8,
							mock: {
								type: "dic",
							},
							rules: [{
								required: true,
								message: "请输入客户申请目的",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户存在的问题",
							prop: "existenceQuestion",
							span: 24,
							type: "checkbox",
							dicData: DIC9,
							// multiple: true,
							// filterable: true,
							// allowCreate: true,
							rules: [{
								required: true,
								message: "请输入客户存在的问题",
								trigger: "blur",
							}, ],
							// change: ({ value,column }) => {
							//   console.log(value,column)
							// },
						},
						{
							label: "客户启动时间目的",
							prop: "projectPurpose",
							type: "checkbox",
							dicData: DIC10,
							mock: {
								type: "dic",
							},
							rules: [{
								required: true,
								message: "请输入客户存在的目的",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户是否跟第三方接触",
							prop: "partyContact",
							type: "radio",
							dicData: [{
									label: "是",
									value: "0",
								},
								{
									label: "否",
									value: "1",
								},
							],
							rules: [{
								required: true,
								message: "请输入客户是否跟第三方接触",
								trigger: "blur",
							}, ],
						},
						{
							label: "客户最看重什么",
							prop: "customersMost",
							span: 24,
							type: "checkbox",
							dicData: DIC11,
							mock: {
								type: "dic",
							},
							rules: [{
								required: true,
								message: "请输入客户最看重什么",
								trigger: "blur",
							}, ],
						},
						{
							label: "区域负责人姓名",
							prop: "headname",
						},
						{
							label: "公司产品开票品名",
							prop: "invoiceName",
						},
						{
							label: "区域负责人介绍",
							prop: "headIntroduce",
							type: "textarea",
							span: 24,
						},
						{
							label: "区域成功案例",
							prop: "successfulCase",
							type: "textarea",
							span: 24,
						},
						{
							label: "当地政府奖励",
							prop: "governmentAwards",
							type: "textarea",
							span: 24,
						},
						{
							label: "客户信息",
							prop: "customerInformation",
							type: "textarea",
							span: 24,
						},
					],
				},
				moreShow: false
			};
		},
		mounted() {
			// throw new Error("测试")
		},
		computed: {
			...mapGetters(["permission"]),
			permissionList() {
				return {
					addBtn: this.vaildData(this.permission.company_add, false),
					viewBtn: this.vaildData(this.permission.company_view, false),
					delBtn: this.vaildData(this.permission.company_delete, false),
					editBtn: this.vaildData(this.permission.company_edit, false),
				};
			},
			ids() {
				let ids = [];
				this.selectionList.forEach((ele) => {
					ids.push(ele.id);
				});
				return ids.join(",");
			},
			defalutDate(){
				var times = new Date()
				return times.getTime() - 3600 * 1000 * 24 * 30
			}
		},
		methods: {
			//初始化字典
			initData() {
				getLazyTree(this.parentCode).then((res) => {
					const column = this.findObject(this.formOption.column, "regionCode");
					const column1 = this.findObject(
						this.addAppointOption.column,
						"companyAddress"
					);
					const data = res.data.data;
					column1.dicData = data;
					column.dicData = data;
				});
				getMenuTree().then((res) => {
					const column = this.findObject(this.formOption.column, "business");
					const data = res.data.data;
					column.dicData = data;
				});
				getSource().then((res) => {
					const column = this.findObject(this.formOption.column, "source");
					const column1 = this.findObject(this.addAppointOption.column, "source");
					const data = res.data.data[0].children;
					column.dicData = data;
					column1.dicData = data;
				});
			},
			//对话框打开之前初始化字典
			//高级搜索
			showMore() {
				this.moreShow = !this.moreShow
				this.findObject(this.option.column, "business").search = !this.findObject(this.option.column, "business").search;
				// this.findObject(this.option.column, "appoinmentTime").search=true;
				this.findObject(this.option.column, "registerTime").search = !this.findObject(this.option.column,
					"registerTime").search;
				this.findObject(this.option.column, "regionCode").search = !this.findObject(this.option.column, "regionCode").search;
				this.findObject(this.option.column, "nextCommunicateTime").search = !this.findObject(this.option.column,
					"nextCommunicateTime").search;
				this.findObject(this.option.column, "lastCommunicateTime").search = !this.findObject(this.option.column,
					"lastCommunicateTime").search;
			},
			handelReset() {
				this.initData();
			},
			handleCompanyClose() {
				this.$refs.componyForm.resetForm();
			},
			//新增公司
			handleSubmit(form, done) {
				if (this.componyTitle == "添加公司") {
					form.contacts = {
						name: form.contacts_name,
						phone: form.contacts_phone,
						email: form.contacts_email,
					};
					delete form.contacts_email;
					delete form.contacts_name;
					delete form.contacts_phone;
					form.regionCode = form.regionCode[form.regionCode.length - 1];
					saveCompony(form).then(
						() => {
							this.onLoad(this.page);
							this.$message({
								type: "success",
								message: "操作成功!",
							});
							this.addCompany = false;
							done();
						},
						(error) => {
							window.console.log(error);
							done();
						}
					);
				} else {
					form.regionCode = form.$regionCode.split(",")[
						form.$regionCode.split(",").length - 1
					];
					updataCompony(form).then(
						() => {
							this.onLoad(this.page);
							this.$message({
								type: "success",
								message: "操作成功!",
							});
							this.addCompany = false;
							done();
						},
						(error) => {
							window.console.log(error);
							done();
						}
					);
				}
			},
			handleEmpty() {
				this.addCompany = false;
			},
			handleAddCompany() {
				this.addCompany = true;
				this.componyTitle = "添加公司";
				this.findObject(
					this.formOption.column,
					"salesManagerName"
				).display = false;
				this.findObject(this.formOption.column, "contacts_name").display = true;
				this.findObject(this.formOption.column, "contacts_email").display = true;
				this.findObject(this.formOption.column, "contacts_phone").display = true;
				this.findObject(this.formOption.column, "regionCode").placeholder =
					"请选择注册地区";
			},
			//编辑公司
			editCompony(row) {
				this.addCompany = true;
				this.componyTitle = "编辑公司";
				this.companyForm = row;
				getRegionDetail(row.regionCode).then((res) => {
					this.findObject(this.formOption.column, "regionCode").placeholder =
						res.data.data.provinceName +
						"/" +
						res.data.data.cityName +
						"/" +
						res.data.data.districtName;
				});
				this.findObject(
					this.formOption.column,
					"salesManagerName"
				).display = true;
				this.findObject(this.formOption.column, "contacts_name").display = false;
				this.findObject(this.formOption.column, "contacts_email").display = false;
				this.findObject(this.formOption.column, "contacts_phone").display = false;
			},
			//资质标签
			salesManagerSubmit() {
				var temp = this.qualificationss.map((item) => {
					return {
						companyId: this.companyId,
						qualificationId: item.companyId ? item.qualificationId : item.value,
						id: item.companyId ? item.id : "",
					};
				});
				var data = {
					id: this.companyId,
					qualifications: temp,
				};
				saveAllQualification(data).then((res) => {
					if (res.data.success) {
						this.$message.success("操作成功！");
					}
				});
				this.refreshChange();
				this.addSalesManager = false;
			},
			salesManagerEmpty() {
				this.addSalesManager = false;
			},
			//删除资质标签
			handleDeleteTag(tag) {
				this.qualificationss.splice(this.qualificationss.indexOf(tag), 1);
			},
			editSalesManager(row) {
				this.addSalesManager = true;
				this.qualifiForm = {};
				this.pleaseCheck = [];
				this.companyId = row.id;
				this.qualificationss = [];
				this.tempss = [];
				this.salesManagerTitle = row.name + "-编辑企业资质标签";
				getQualification(row.id, -1).then((res) => {
					res.data.data.records.forEach((item) => {
						item.label = item.qualificationName;
					});
					this.qualificationss = res.data.data.records;
					this.tempss = res.data.data.records;
				});
			},
			qualificationChange(data) {
				this.qualificationss = [...this.tempss, ...data];
				this.qualificationss = this.qualificationss.filter((item, index, arr) => {
					return arr.indexOf(item, 0) === index;
				});
				// console.log(this.qualificationss)
			},
			//指标率
			editCompanyTarget(row) {
				this.$router.push({
					path: "/crm/companytarget",
					query: {
						companyId: row.id,
					},
				});
			},
			//意向项目
			wantProjectSubmit() {
				var row = {
					companyId: this.companyId,
					content: this.ProjecForm.join("|"),
					dictId: this.dictId,
					id: this.projectId == "-1" ? "" : this.projectId,
				};
				submitProjects(row).then((res) => {
					if (res.data.success) {
						this.$message.success("提交成功！");
						this.refreshChange();
					}
				});
				this.wantProject = false;
			},
			wantProjectEmpty() {
				this.wantProject = false;
				this.ProjecForm = [];
			},
			editProject(row) {
				this.wantProject = true;
				this.wantProjectTitle = row.name;
				this.companyId = row.id;
				this.ProjecForm = [];
				companyProjects(row.id).then((res) => {
					this.dict = res.data.data.dicts;
					this.dictId = res.data.data.dictId;
					this.projectId = res.data.data.id;
					if (res.data.data.content != "") {
						this.ProjecForm = res.data.data.content.split("|");
					}
				});
			},
			// 沟通记录
			editConRecord(row) {
				this.conRecord = true;
				this.conRecordTitle = row.name + "-沟通记录";
				this.companyId = row.id;
				var page = {
					currentPage: 1,
					pageSize: -1,
				};
				var params = {
					companyId: row.id,
				};
				getCommunicateList(page.currentPage, page.pageSize, params).then(
					(res) => {
						const data = res.data.data;
						this.communicateData = data.records;
					}
				);
				// console.log(row);
			},
			// 添加沟通记录
			addRecordSubmit(form, done) {
				this.addRecordDialog = false;
				form.companyId = this.companyId;
				addCommunicate(form).then((res) => {
					if (res.data.success) {
						this.$refs.addRecordForm.resetForm();
						this.$message.success("新建沟通成功！");
						done();
					}
				});
			},
			addRecordEmpty() {
				this.addRecordDialog = false;
			},
			addRecord(row) {
				this.addRecordDialog = true;
				this.addRecordTitle = row.name + "-新建沟通";
				this.companyId = row.id;
			},
			// 联系人
			addUser(row) {
				this.addUserDialog = true;
				this.addUserTitle = row.name + "-联系人管理";
				this.companyId = row.id;
				var page = {
					currentPage: 1,
					pageSize: -1,
				};
				var params = {
					companyId: row.id,
				};
				getContactsList(page.currentPage, page.pageSize, params).then((res) => {
					const data = res.data.data;
					this.userData = data.records;
				});
			},
			//添加联系人
			rowSaveUser(row, done, loading) {
				row.companyId = this.companyId;
				addContacts(row).then(
					() => {
						var page = {
							currentPage: 1,
							pageSize: -1,
						};
						var params = {
							companyId: this.companyId,
						};
						getContactsList(page.currentPage, page.pageSize, params).then(
							(res) => {
								const data = res.data.data;
								this.userData = data.records;
							}
						);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
						done();
					},
					(error) => {
						loading();
						window.console.log(error);
					}
				);
			},
			rowUpdateUser(row, index, done, loading) {
				updateContacts(row).then(
					() => {
						var page = {
							currentPage: 1,
							pageSize: -1,
						};
						var params = {
							companyId: row.companyId,
						};
						getContactsList(page.currentPage, page.pageSize, params).then(
							(res) => {
								const data = res.data.data;
								this.userData = data.records;
							}
						);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
						done();
					},
					(error) => {
						loading();
						window.console.log(error);
					}
				);
			},
			rowDelUser(row, index, done, loading) {
				removeContacts(row.id).then(
					() => {
						var page = {
							currentPage: 1,
							pageSize: -1,
						};
						var params = {
							companyId: row.companyId,
						};
						getContactsList(page.currentPage, page.pageSize, params).then(
							(res) => {
								const data = res.data.data;
								this.userData = data.records;
							}
						);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
						done();
					},
					(error) => {
						loading();
						window.console.log(error);
					}
				);
			},
			//约见详情
			addAppointment(row) {
				this.addAppointDialog = true;
				this.addAppointTitle = "预约-" + row.name;
				// this.addAppoinform = row;
				this.companyId = row.id;
				companyProjects(row.id).then((res) => {
					const column = this.findObject(
						this.addAppointOption.column,
						"intention"
					);
					const data = res.data.data.dicts;
					column.dicData = data;
				});
			},
			//新增约见
			addAppointSubmit(form, done) {
				// form.region = form.region[form.region.length - 1];
				form.appliedProjects = form.appliedProjects.join("|");
				form.customersMost = form.customersMost.join("|");
				form.existenceQuestion = form.existenceQuestion.join("|");
				form.projectPurpose = form.projectPurpose.join("|");
				form.intention = form.intention.join("|");
				form.companyId = this.companyId;
				addAppointment(form).then((res) => {
					if (res.data.success) {
						this.$message.success("预约成功！");
					}
				});
				done();
				this.onLoad(this.page);
				this.addAppointDialog = false;
			},
			//虚拟符合数
			openVirtualDialog(row) {
				this.virtualDialog = true;
				this.virtualTitle = row.name;
				getVirtualNum(row.id).then((res) => {
					// console.log(res.data);
					this.policyList = res.data.data;
				});
			},
			toPolicyExcel(id) {
				this.$router.push({
					path: "/excel",
					query: {
						policyId: id,
					},
				});
			},
			//荣誉数
			editProjectNum(row) {
				this.projectNumDialog = true;
				this.projectNumTitle = row.name;
				getCompanyproject(row.id, -1).then((res) => {
					// console.log(res.data);
					this.projectList = res.data.data.records;
				});
			},
			toProjectNum(policyName) {
				this.$router.push({
					path: "/policy/companyproject",
					query: {
						policyName: policyName,
					},
				});
			},
			rowSave(row, done, loading) {
				add(row).then(
					() => {
						this.onLoad(this.page);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
						done();
					},
					(error) => {
						loading();
						window.console.log(error);
					}
				);
			},
			rowUpdate(row, index, done, loading) {
				update(row).then(
					() => {
						this.onLoad(this.page);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
						done();
					},
					(error) => {
						loading();
						console.log(error);
					}
				);
			},
			rowDel(row) {
				this.$confirm("确定将选择数据删除?", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					})
					.then(() => {
						return remove(row.id);
					})
					.then(() => {
						this.onLoad(this.page);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
					});
			},
			handleDelete() {
				if (this.selectionList.length === 0) {
					this.$message.warning("请选择至少一条数据");
					return;
				}
				this.$confirm("确定将选择数据删除?", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					})
					.then(() => {
						return remove(this.ids);
					})
					.then(() => {
						this.onLoad(this.page);
						this.$message({
							type: "success",
							message: "操作成功!",
						});
						this.$refs.crud.toggleSelection();
					});
			},
			beforeOpen(done, type) {
				if (["edit", "view"].includes(type)) {
					getDetail({
						id: this.form.id,
					}).then((res) => {
						this.form = res.data.data;
					});
				}
				done();
			},
			searchReset() {
				this.query = {};
				this.onLoad(this.page);
			},
			searchChange(params, done) {
				if(params.registerTime){
					params.registerTime = params.registerTime.join(",")
				}
				if(params.lastCommunicateTime){
					params.lastCommunicateTime = params.lastCommunicateTime.join(",")
				}
				if(params.nextCommunicateTime){
					params.nextCommunicateTime = params.nextCommunicateTime.join(",")
				}
				// console.log(params)
				this.$router.push({
					query: {},
				});
				this.query = params;
				this.page.currentPage = 1;
				this.onLoad(this.page, params);
				done();
			},
			selectionChange(list) {
				this.selectionList = list;
			},
			selectionClear() {
				this.selectionList = [];
				this.$refs.crud.toggleSelection();
			},
			currentChange(currentPage) {
				this.page.currentPage = currentPage;
			},
			sizeChange(pageSize) {
				this.page.pageSize = pageSize;
			},
			refreshChange() {
				this.$router.push({
					query: {},
				});
				this.onLoad(this.page, this.query);
			},
			onLoad(page, params = {}) {
				this.loading = true;
				if (this.$route.query.id) {
					// var params = {
					//   id: this.$route.query.id,
					// };
					getList(page.currentPage, page.pageSize, {
						id: this.$route.query.id,
					}).then((res) => {
						const data = res.data.data;
						this.page.total = data.total;
						this.data = data.records;
						this.loading = false;
						this.selectionClear();
					});
				} else {
					getList(
						page.currentPage,
						page.pageSize,
						Object.assign(params, this.query)
					).then((res) => {
						const data = res.data.data;
						this.page.total = data.total;
						this.data = data.records;
						this.loading = false;
						this.selectionClear();
					});
				}
				// this.loading = false;
				companyGrade("company_level").then((res) => {
					const column1 = this.findObject(this.option.column, "grade");
					const column2 = this.findObject(this.formOption.column, "grade");
					const data = res.data.data;
					column1.dicData = data;
					column2.dicData = data;
					this.grade = res.data.data;
				});
			},
		},
	};
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin: 20px 0;
	}

	.el-tag {
		margin: 10px;
	}

	.el-table__body-wrapper::-webkit-scrollbar {
		width: 7px;
		height: 18px;
		background-color: transparent;
	}

	.el-table__body-wrapper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		height: 18.5px;
		background: rgba(144, 146, 152, 0.3);
	}

	.el-table__body-wrapper::-webkit-scrollbar-track {
		border-radius: 10px;
		background: #fff;
	}
</style>
