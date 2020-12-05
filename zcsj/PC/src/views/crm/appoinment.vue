<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page.sync="page"
      :permission="permissionList"
      :before-open="beforeOpen"
      v-model="form"
      ref="crud"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @row-del="rowDel"
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
          v-if="permission.appoinment_delete"
          @click="handleDelete"
          >删 除</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/crm/appoinment";
import { getLazyTree } from "@/api/base/region";
import { getSource, companyProjects } from "@/api/crm/company";
import { mapGetters } from "vuex";
const DIC = [
  {
    label: "决策人",
    value: "2",
  },
  {
    label: "联系人",
    value: "3",
  },
  {
    label: "经办人",
    value: "4",
  },
  {
    label: "中间人",
    value: "5",
  },
];
const DIC4 = [
  {
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
const DIC5 = [
  {
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
const DIC6 = [
  {
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
const DIC7 = [
  {
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
    return {
      form: {},
      query: {},
      loading: true,
      parentCode: "00",
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      appliedProject: false,
      appliedprojectsTitle: "", //客户申请项目目的
      option: {
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        searchBtn: true,
        border: true,
        index: true,
        viewBtn: true,
        addBtn: false,
        selection: true,
        align: "left",
        dialogClickModal: false,
        labelWidth: 180,
        column: [
          {
            label: "公司",
            prop: "companyName",
            rules: [
              {
                required: true,
                message: "请输入公司",
                trigger: "blur",
              },
            ],
            editDisabled: true,
            search: true,
          },
          {
            label: "销售代表",
            prop: "salesManagerName",
            rules: [
              {
                required: true,
                message: "请输入销售代表",
                trigger: "blur",
              },
            ],
            search: true,
          },
          {
            label: "预约时间",
            prop: "appointmentTime",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [
              {
                required: true,
                message: "点击选择时间",
                trigger: "blur",
              },
            ],
            
          },
          {
            label: "创建时间",
            prop: "createTime",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "客户经理",
            prop: "salesManager",
            rules: [
              {
                required: true,
                message: "联想输入",
                trigger: "blur",
              },
            ],
          },
          {
            label: "意向项目",
            prop: "intention",
            type: "checkbox",
            span: 24,
            props: {
              label: "dictValue",
              value: "dictValue",
            },
            rules: [
              {
                required: true,
                message: "联想输入",
                trigger: "blur",
              },
            ],
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
            rules: [
              {
                required: true,
                message: "请选择客户来源",
                trigger: "blur",
              },
            ],
          },
          {
            label: "角色",
            prop: "role",
            type: "tree",
            dicData: DIC,
            rules: [
              {
                required: true,
                message: "-请选择-",
                trigger: "blur",
              },
            ],
          },
          {
            label: "姓名",
            prop: "name",
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "手机号",
            prop: "phone",
            rules: [
              {
                required: true,
                message: "请输入手机号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "微信号",
            prop: "wechat",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: "1",
              },
              {
                label: "否",
                value: "0",
              },
            ],
            rules: [
              {
                required: true,
                message: "请输入微信号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "职位",
            prop: "position",
            rules: [
              {
                required: true,
                message: "请输入职位",
                trigger: "blur",
              },
            ],
          },
          {
            label: "公司地址",
            prop: "companyAddress",
            rules: [
              {
                required: true,
                message: "请选择注册地区",
                trigger: "blur",
              },
            ],
          },
          {
            label: "公司地址定位",
            prop: "addressLocalization",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: "0",
              },
              {
                label: "否",
                value: "1",
              },
            ],
            rules: [
              {
                required: true,
                message: "请输入公司地址定位",
                trigger: "blur",
              },
            ],
          },
          {
            label: "公司成立时间",
            prop: "establishedTime",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [
              {
                required: true,
                message: "请输入公司成立时间",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户预计项目启动时间",
            prop: "projectStartime",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            rules: [
              {
                required: true,
                message: "请输入客户预计项目启动时间",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户申请项目目的",
            prop: "appliedProjects",
            span: 24,
            type: "checkbox",
            dicData: DIC4,
            mock: {
              type: "dic",
            },
            rules: [
              {
                required: true,
                message: "请输入客户申请目的",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户存在的问题",
            prop: "existenceQuestion",
            span: 24,
            type: "checkbox",
            dicData: DIC5,
            mock: {
              type: "dic",
            },
            rules: [
              {
                required: true,
                message: "请输入客户存在的问题",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户启动时间目的",
            prop: "projectPurpose",
            type: "checkbox",
            dicData: DIC6,
            mock: {
              type: "dic",
            },
            rules: [
              {
                required: true,
                message: "请输入客户存在的目的",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户是否跟第三方接触",
            prop: "partyContact",
            type: "radio",
            dicData: [
              {
                label: "是",
                value: "0",
              },
              {
                label: "否",
                value: "1",
              },
            ],
            rules: [
              {
                required: true,
                message: "请输入客户是否跟第三方接触",
                trigger: "blur",
              },
            ],
          },
          {
            label: "客户最看重什么",
            prop: "customersMost",
            span: 24,
            type: "checkbox",
            dicData: DIC7,
            mock: {
              type: "dic",
            },
            rules: [
              {
                required: true,
                message: "请输入客户最看重什么",
                trigger: "blur",
              },
            ],
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
      data: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.appoinment_add, false),
        viewBtn: this.vaildData(this.permission.appoinment_view, false),
        delBtn: this.vaildData(this.permission.appoinment_delete, false),
        editBtn: this.vaildData(this.permission.appoinment_edit, false),
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
    initData() {
      getLazyTree(this.parentCode).then(() => {
        // const column = this.findObject(this.option.column, "region");
        // const data = res.data.data;
        // column.dicData = data;
      });
      getSource().then((res) => {
        const column = this.findObject(this.option.column, "source");
        const data = res.data.data[0].children;
        column.dicData = data;
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
      row.appliedProjects = row.appliedProjects.join("|");
      row.customersMost = row.customersMost.join("|");
      row.existenceQuestion = row.existenceQuestion.join("|");
      row.projectPurpose = row.projectPurpose.join("|");
      row.intention = row.intention.join("|");
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
      if (["edit", "add"].includes(type)) {
        this.initData();
      }
      if (["edit", "view"].includes(type)) {
        companyProjects(this.form.id).then((res) => {
          const column = this.findObject(this.option.column, "intention");
          const data = res.data.data.dicts;
          column.dicData = data;
        });
        getDetail(this.form.id).then((res) => {
          res.data.data.appliedProjects = res.data.data.appliedProjects.split(
            "|"
          );
          res.data.data.customersMost = res.data.data.customersMost.split("|");
          res.data.data.existenceQuestion = res.data.data.existenceQuestion.split(
            "|"
          );
          res.data.data.projectPurpose = res.data.data.projectPurpose.split(
            "|"
          );
          res.data.data.intention = res.data.data.intention.split("|");
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
      this.initData();
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
    },
  },
};
</script>

<style>
</style>
