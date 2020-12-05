<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page.sync="page"
      :search.sync="search"
      :permission="permissionList"
      :before-open="beforeOpen"
      v-model="form"
      ref="crud"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @row-del="rowDel"
      @row-click="rowClick"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          v-if="permission.companyproject_delete"
          @click="handleDelete"
          >删 除
        </el-button>
        <el-button
          type="success"
          size="small"
          plain
          icon="el-icon-upload2"
          @click="handleImport"
          >导入
        </el-button>
      </template>
    </avue-crud>
    <el-dialog
      title="项目数据导入"
      append-to-body
      :visible.sync="excelBox"
      @open="excelOpen"
      width="555px"
    >
      <avue-form
        :option="excelOption"
        v-model="excelForm"
        :upload-after="uploadAfter"
      >
        <template slot="excelTemplate">
          <el-button type="primary" @click="handleTemplate">
            点击下载<i class="el-icon-download el-icon--right"></i>
          </el-button>
        </template>
      </avue-form>
    </el-dialog>
    <!-- 公司表 -->
    <el-dialog
      :title="projectName"
      append-to-body
      :visible.sync="company"
      width="70%"
      center
    >
     <avue-crud :data="companyData" :option="companyOption" :search.sync="search1"  @search-change="searchChange1"
      @search-reset="searchReset1"  @refresh-change="refreshChange1">
      <template slot="menuLeft">
        <el-button
          type="warning"
          size="small"
          plain
          icon="el-icon-download"
          @click="handleExport"
          >导出
        </el-button>
      </template></avue-crud>
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
  getListByName
} from "@/api/policy/companyproject";
import { mapGetters } from "vuex";
import { getToken } from "@/util/auth";

export default {
  data() {
    return {
      form: {},
      query: {},
      search: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      query1: {},
      search1: {},
      selectionList: [],
      excelBox: false,
      company:false,
      excelForm: {},
      excelOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "模板上传",
            prop: "excelFile",
            type: "upload",
            drag: true,
            loadText: "模板上传中，请稍等",
            span: 24,
            propsHttp: {
              res: "data",
            },
            tip: "请上传 .xls,.xlsx 标准格式文件",
            action: "/api/policy/companyproject/import-companyProject",
          },
          {
            label: "数据覆盖",
            prop: "isCovered",
            type: "switch",
            align: "center",
            width: 80,
            dicData: [
              {
                label: "否",
                value: 0,
              },
              {
                label: "是",
                value: 1,
              },
            ],
            value: 0,
            slot: true,
            rules: [
              {
                required: true,
                message: "请选择是否覆盖",
                trigger: "blur",
              },
            ],
          },
          {
            label: "模板下载",
            prop: "excelTemplate",
            formslot: true,
            span: 24,
          },
        ],
      },
      option: {
        height: "auto",
        calcHeight: 30,
        tip: false,
        menu:false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        dialogClickModal: false,
        column: [
          {
            label: "项目名称",
            prop: "name",
            rules: [
              {
                required: true,
                message: "请输入项目名称",
                trigger: "blur",
              },
            ],
            search: true,
          },
          {
            label: "公司名称",
            prop: "companyName",
            hide:true,
            rules: [
              {
                required: true,
                message: "请输入公司名称",
                trigger: "blur",
              },
            ],
            search: true,
          },
          {
            label: "创建时间",
            type:"date",
            prop: "createTime",
          },
           {
            label: "更新时间",
            type:"date",
            prop: "updateTime",
          },
        ],
      },
      companyOption: {
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: false,
        menu:false,
        addBtn:false,
        dialogClickModal: false,
        column: [
          {
            label: "公司名称",
            prop: "companyName",
            rules: [
              {
                required: true,
                message: "请输入公司名称",
                trigger: "blur",
              },
            ],
            search: true,
          },
          {
            label: "项目、荣誉名称",
            type:"date",
            prop: "remark",
          },
          {
            label: "奖补金额",
            prop: "capital",
          },
        ],
      },
      data: [],
      companyData:[],
      projectName:''
    };
  },
  watch: {
    "excelForm.isCovered"() {
      if (this.excelForm.isCovered !== "") {
        const column = this.findObject(this.excelOption.column, "excelFile");
        column.action = `/api/policy/companyproject/import-companyProject?isCovered=${this.excelForm.isCovered}`;
      }
    },
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.companyproject_add, false),
        viewBtn: this.vaildData(this.permission.companyproject_view, false),
        delBtn: this.vaildData(this.permission.companyproject_delete, false),
        editBtn: this.vaildData(this.permission.companyproject_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    rowClick(row){
      this.companyData = [];
      this.projectName = row.name;
      this.company = true;
      getListByName(1,-1,{name:row.name}).then(res=>{
        this.companyData = res.data.data.records
      })
    },
    getCompany(query){
      this.companyData = [];
      getListByName(1,-1,query).then(res=>{
        this.companyData = res.data.data.records
      })
    },
    // 导入数据
    excelOpen() {
      this.excelForm.excelFile = []
    },
    handleImport() {
      this.excelBox = true;
    },
    uploadAfter(res, done, loading, column) {
      console.log(column);
      this.excelForm.excelFile = []
      this.excelBox = false;
      this.refreshChange();
      done();
    },
    handleTemplate() {
      window.open(
        `/api/policy/companyproject/export-template?${
          this.website.tokenHeader
        }=${getToken()}`
      );
    },
    handleExport() {
      this.$confirm("是否导出数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(this.search1)
        window.open(
          `/api/policy/companyproject/export-companyProject?${
            this.website.tokenHeader
          }=${getToken()}&name=${this.projectName}&companyName=${
            this.search1.companyName
          }`
        );
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
        getDetail(this.form.id).then((res) => {
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
      this.$router.push({ query: {} });
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    searchReset1() {
      this.query1 = {};
      this.getCompany({name:this.projectName})
    },
    refreshChange1(){
       this.getCompany({name:this.projectName})
    },
    searchChange1(params, done) {
      params.name = this.projectName
      this.getCompany(params)
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
      this.$router.push({ query: {} });
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      if (this.$route.query.policyName) {
        // var params = {
        //   id: this.$route.query.id,
        // };
        getList(page.currentPage, page.pageSize, {
          name: this.$route.query.policyName,
        }).then((res) => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }else{
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
    },
  },
};
</script>

<style>
</style>
