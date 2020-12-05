<template>
  <basic-container>
    <el-tabs v-model="status" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in targetClass" :key="item.key" :name="item.id">
        <span slot="label">
          {{ item.title }}
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="display:flex;justify-content: space-between;align-item:center;">
        <el-button type="text" icon="el-icon-s-promotion"
          >未完善指标-{{ companyDetail.name }}</el-button
        >
        <div style="color:red;font-size；14px;">备注：金额以万元为单位，数量以个为单位，面积以平方米为单位，时间以年为单位</div>
      </div>
      <el-form
        ref="targetForm"
        :model="targetForm"
        :inline="true"
        v-if="target"
        label-width="200px"
        label-position='right'
        size="mini"
      >
        <el-form-item
          v-for="item in target"
          :key="item"
          :label="item.targetName + ':'"
          v-show="item.status == '0'"
          size="mini"
        >
          <el-input v-model="item.content" size="mini" type="number"  v-if="item.type == '1'">
            <!-- <template slot="append">万元</template> -->
          </el-input>
          <el-input v-model="item.content" size="mini" v-if="item.type == '2'">
          </el-input>
          <el-radio-group v-model="item.content" v-if="item.type == '3'">
            <el-radio
              v-for="data in item.dictBiz"
              :key="data"
              :label="data.dictValue"
            ></el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="item.content" v-if="item.type == '4'">
            <el-checkbox
              :label="items.dictValue"
              v-for="(items, index) in item.dictBiz"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item>
          <el-button el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item> -->
      </el-form>
      <div style="width: 100%; display: flex; justify-content: flex-end">
        <el-pagination
          page-size="15"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handelChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="text" icon="el-icon-s-promotion"
          >已完善指标-{{ companyDetail.name }}</el-button
        >
      </div>
      <el-form
        ref="targetCheckForm"
        :model="targetCheckForm"
        label-width="200px"
        label-position='right'
        size="mini"
        :inline="true"
        v-if="target"
      >
        <el-form-item
          v-for="item in target"
          :key="item"
          :label="item.targetName + ':'"
          v-show="item.status == '1'"
          :rules="[{ type: 'number', message: '必须为数字值' }]"
        >
          <el-input v-model="item.content" size="mini"  type="number"  v-if="item.type == '1'">
            <!-- <template slot="append">万元</template> -->
          </el-input>
          <el-input v-model="item.content" size="mini" v-if="item.type == '2'">
          </el-input>
          <el-radio-group v-model="item.content" v-if="item.type == '3'">
            <el-radio
              v-for="data in item.dictBiz"
              :key="data"
              :label="data.dictValue"
            ></el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="item.content" v-if="item.type == '4'">
            <el-checkbox
              :label="items.dictValue"
              v-for="(items, index) in item.dictBiz"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div style="width: 100%; display: flex; justify-content: space-around">
        <el-button el-button type="primary" @click="submitForm()"
          >提交</el-button
        >
      </div>
    </el-card>
  </basic-container>
</template>

<script>
import {
  // getList,
  // getDetail,
  // add,
  // update,
  // remove,
  getLazyTree,
  // getAllTarget,
  getCompanyDetail,
  getClassIsCheck,
  saveAllClass,
} from "@/api/crm/companytarget";
import { mapGetters } from "vuex";
// import { delete } from 'vue/types/umd';

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        current: 1,
        size: 15,
        total: 0,
      },
      companyId: "", //公司ID
      targetClass: null, //所有指标分类
      total: "",
      companyDetail: "",
      target: null,
      targetForm: {},
      targetCheckForm: {},
      status: "",
      selectionList: [],
      option: {
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        dialogClickModal: false,
        column: [
          {
            label: "公司ID",
            prop: "companyId",
            rules: [
              {
                required: true,
                message: "请输入公司ID",
                trigger: "blur",
              },
            ],
          },
          {
            label: "指标ID",
            prop: "targetId",
            rules: [
              {
                required: true,
                message: "请输入指标ID",
                trigger: "blur",
              },
            ],
          },
          {
            label: "内容",
            prop: "content",
            rules: [
              {
                required: true,
                message: "请输入内容",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      data: [],
    };
  },
  mounted() {
    this.companyId = this.$route.query.companyId;
    this.onLoad();
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.companytarget_add, false),
        viewBtn: this.vaildData(this.permission.companytarget_view, false),
        delBtn: this.vaildData(this.permission.companytarget_delete, false),
        editBtn: this.vaildData(this.permission.companytarget_edit, false),
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
    onLoad() {
      this.loading = false;
      getLazyTree("0").then((res) => {
        this.targetClass = res.data.data;
        this.status = res.data.data[0].id;
        // getAllTarget(this.page.currentPage,this.page.pageSize, this.status).then((res) => {
        //   this.target = res.data.data.records;
        //   this.total = res.data.data.records.length;
        // });
        getClassIsCheck(
          this.page.current,
          this.page.size,
          this.companyId,
          this.status
        ).then((res) => {
          this.target = res.data.data.records;
          this.target.forEach((item) => {
            if (item.type == "4") {
              item.content = item.content.split("|");
            }
          });
          this.total = res.data.data.total;
        });
      });
      getCompanyDetail(this.companyId).then((res) => {
        this.companyDetail = res.data.data;
      });
    },
    handleClick(tab) {
      // getAllTarget("-1", tab.name).then((res) => {
      //   this.target = res.data.data.records;
      //   this.total = res.data.data.records.length;
      // });
      this.status = tab.name;
      getClassIsCheck(
        this.page.current,
        this.page.size,
        this.companyId,
        tab.name
      ).then((res) => {
        this.target = res.data.data.records;
        this.target.forEach((item) => {
          if (item.type == "4") {
            item.content = item.content.split("|");
          }
        });
        this.total = res.data.data.total;
      });
    },
    handelChange(val) {
      // this.page.currentPage = val
      getClassIsCheck(val, this.page.size, this.companyId, this.status).then(
        (res) => {
          this.target = res.data.data.records;
          this.target.forEach((item) => {
            if (item.type == "4") {
              item.content = item.content.split("|");
            }
          });
        }
      );
    },
    submitForm() {
      // var form = this.target
      this.target.forEach((item) => {
        if(item.id == "-1"){
          delete item.id;
        }
        if(item.type == '4'){
          item.content = item.content.join('|')
        }
      });
      var form = this.target.filter((item) => item.content != "" || item.id != '-1');
      saveAllClass(form).then((res) => {
        if (res.data.success) {
          this.$message.success("提交成功！");
          var tab = {
            name: this.status,
          };
          this.handleClick(tab);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-form-item{
//   height: 30px;
//   .el-form-item__label{
//     overflow: hidden !important;
//   }
// }
// .el-form--inline .el-form-item__label{
//    overflow: hidden !important;
// }
.el-input{
  width: 150px;
}
</style>
