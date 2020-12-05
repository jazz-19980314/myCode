<template>
	<basic-container>
		<avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" :permission="permissionList"
:before-open="beforeOpen" v-model="form" ref="crud" @row-update="rowUpdate" @row-save="rowSave" @row-del="rowDel"
@search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange" @current-change="currentChange"
@size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad" @tree-load="treeLoad">
			<template slot="menuLeft">
				<el-button type="danger" size="small" icon="el-icon-delete" plain v-if="permission.target_delete" @click="handleDelete">删
					除
				</el-button>
			</template>
			<template slot-scope="{row}" slot="choices">
				<el-tag style="margin:5px;" v-for="(item) in row.choices" :key="item.id">{{item.dictValue}}</el-tag>
			</template>
		</avue-crud>
	</basic-container>
</template>

<script>
	import {
		getList,
		getDetail,
		add,
		update,
		remove,
		getMenuTree,
	} from "@/api/crm/target";
	import {
		mapGetters
	} from "vuex";
	const DIC1 = [{
			label: "数值型",
			value: '1'
		},
		{
			label: "字符串",
			value: '2'
		},
		{
			label: "单选",
			value: '3'
		}, {
			label: "多选",
			value: '4'
		}
	]
	export default {
		data() {
			return {
				form: {},
				query: {},
				loading: true,
				parentId: '0',
				page: {
					pageSize: 10,
					currentPage: 1,
					total: 0
				},
				selectionList: [],
				isyear:false,
				option: {
					height: 'auto',
					calcHeight: 30,
					tip: false,
					searchShow: true,
					searchMenuSpan: 6,
					border: true,
					index: true,
					viewBtn: true,
					selection: true,
					tree: true,
					dialogClickModal: false,
					column: [{
							label: "指标名称",
							prop: "name",
							rules: [{
								required: true,
								message: "请输入指标名称",
								trigger: "blur"
							}],
							search: true,
							blur: (value) => {
								var reg = /^(19|20)[0-9]{2}/
								var column = this.findObject(this.option.column,"year")
								if(reg.test(value.value)){
									var str = value.value.substr(0,4)
									this.form.year = str
									this.isyear = true
									column.disabled = false
								}else{
									this.isyear = false
									this.form.year = ''
									column.disabled = true
								}
							}
						},
						{
							label: "分类名称",
							prop: "className",
							addDisplay: false,
							editDisplay: false,
							viewDisplay: false,
							search: true
						},
						{
							label: "分类",
							prop: "classId",
							type: "tree",
							dicData: [],
							props: {
								label: "title",
							},
							rules: [{
								required: true,
								message: "请输入分类",
								trigger: "blur"
							}],
							hide: true
						},
						{
							label: "类型",
							prop: "type",
							dicData: DIC1,
							rules: [{
								required: true,
								message: "请选择输入类型",
								trigger: "blur"
							}],
							addDisplay: false,
							editDisplay: false,
							viewDisplay: false,
						},
						{
							label: "年份",
							prop: "year",
							type: 'year',
							format: 'yyyy',
							valueFormat: 'yyyy',
							search: true,
							disabled:false,
							blur:(value)=>{
								if(this.isyear){
									var str = this.form.name.substr(0,4)
									if(value.value != str){
										this.$message.error("所选年份需与指标年份保持一致！")
										this.form.year = str
									}
								}
								
							}
						},
						{
							label: "选择条件",
							prop: "choices",
							slot: true,
							addDisplay: false,
							editDisplay: false,
							viewDisplay: false
						},
					],
					group: [{
						icon: 'el-icon-discount',
						label: '类型选择',
						prop: 'group3',
						column: [{
								label: '类型',
								prop: 'type',
								type: 'radio',
								rules: [{
									required: true,
									message: '请选择是类型',
									trigger: 'blur'
								}],
								dicData: DIC1
							},
							{
								label: '数值',
								prop: 'choices',
								type: 'array',
								tip: '指标数值',
								rules: [{
									required: true,
									message: '指标数值不能为空',
									trigger: 'blur'
								}],
								display: false
							},
							{
								label: '字符串',
								prop: 'choices',
								type: 'array',
								tip: '指标',
								rules: [{
									required: true,
									message: '指标值不能为空',
									trigger: 'blur'
								}],
								display: false
							},
							{
								label: '单选条件',
								prop: 'choices',
								tip: '请选择或者输入单选的条件',
								type: "array",
								dataType: 'string',
								span: 24,
								rules: [{
									required: true,
									message: '不能为空',
									trigger: 'blur'
								}],
								display: false,
								viewDisplay: false,
							},
							{
								label: '多选条件',
								prop: 'choices',
								tip: '请选择或者输入多选的条件',
								type: "array",
								dataType: 'string',
								span: 24,
								rules: [{
									required: true,
									message: '不能为空',
									trigger: 'blur'
								}],
								display: false,
								viewDisplay: false,
							}
						]
					}, ]
				},
				data: [],
				choices: []
			};
		},
		watch: {
			'form.type'() {
				// let column1 =this.option.group[0].column[1]
				// let column2 =this.option.group[0].column[2]
				let column3 = this.option.group[0].column[3]
				let column4 = this.option.group[0].column[4]
				// if(this.form.type == '0'){
				//   column1.display = true
				// }else{
				//   column1.display = false
				// }
				// if(this.form.type == '1'){
				//   column2.display = true
				// }else{
				//   column2.display = false
				// }
				if (this.form.type == '3') {
					column3.display = true
				} else {
					column3.display = false
				}
				if (this.form.type == '4') {
					column4.display = true
				} else {
					column4.display = false
				}
			},
		},
		computed: {
			...mapGetters(["permission"]),
			permissionList() {
				return {
					addBtn: this.vaildData(this.permission.target_add, false),
					viewBtn: this.vaildData(this.permission.target_view, false),
					delBtn: this.vaildData(this.permission.target_delete, false),
					editBtn: this.vaildData(this.permission.target_edit, false)
				};
			},
			ids() {
				let ids = [];
				this.selectionList.forEach(ele => {
					ids.push(ele.id);
				});
				return ids.join(",");
			}
		},
		methods: {
			initData() {
				getMenuTree().then((res) => {
					const column = this.findObject(this.option.column, "classId");
					const data = res.data.data;
					column.dicData = data;
				});
			},
			rowSave(row, done, loading) {
				if (row.choices.length != '0') {
					const choices = row.choices.split(",").map(item => {
						return {
							dictValue: item
						}
					})
					row.choices = choices
				}
				add(row).then(() => {
					this.onLoad(this.page);
					this.$message({
						type: "success",
						message: "操作成功!"
					});
					done();
				}, error => {
					loading();
					window.console.log(error);
				});
			},
			rowUpdate(row, index, done, loading) {
				if (row.choices.length != '0') {
					const choices = row.choices.split(",").map(item => {
						return {
							dictValue: item,
							id: ''
						}
					})
					choices.forEach(item => {
						const ttt = this.choices.filter(data => data.dictValue == item.dictValue)
						if (ttt.length) {
							item.id = ttt[0].id
						}
					})
					row.choices = choices
				}
				if (row.type == '1' || row.type == '2') {
					row.choices = []
				}
				update(row).then(() => {
					this.onLoad(this.page);
					this.$message({
						type: "success",
						message: "操作成功!"
					});
					done();
				}, error => {
					loading();
					console.log(error);
				});
			},
			rowDel(row) {
				this.$confirm("确定将选择数据删除?", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						return remove(row.id);
					})
					.then(() => {
						this.onLoad(this.page);
						this.$message({
							type: "success",
							message: "操作成功!"
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
						type: "warning"
					})
					.then(() => {
						return remove(this.ids);
					})
					.then(() => {
						this.onLoad(this.page);
						this.$message({
							type: "success",
							message: "操作成功!"
						});
						this.$refs.crud.toggleSelection();
					});
			},
			beforeOpen(done, type) {
				if (["add", "edit"].includes(type)) {
					this.initData();
				}
				if (["edit", "view"].includes(type)) {
					getDetail(this.form.id).then(res => {
						const form = res.data.data;
						this.choices = form.choices.map(item => {
							return {
								dictValue: item.dictValue,
								id: item.id
							}
						})
						form.choices = form.choices.map(item => {
							return item.dictValue
						}).join(',')
						this.form = form
					});
				}
				done();
			},
			searchReset() {
				this.query = {};
				this.onLoad(this.page);
			},
			searchChange(params, done) {
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
				this.onLoad(this.page, this.query);
			},
			onLoad(page, params = {}) {
				this.loading = true;
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
		}
	};
</script>

<style>
</style>
