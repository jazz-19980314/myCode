<template>
  <basic-container>
    <avue-crud :option="option"
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
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.contacts_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="{row}" slot="menu">
            <span  @click="handelDisabled(row)" style="color:#e6a23c;margin-left:10px;font-size:12px;"><i class="el-icon-circle-close" style="margin-right:5px;"></i>禁用</span>
        </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/crm/contacts";
  import {mapGetters} from "vuex";
  export default {
    data() {
      var validatePass = (rule, value, callback)=>{
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确手机号'));
      } else {
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback)=>{
    //   if (!(/^1[3456789]\d{9}$/.test(value))) {
    //     callback(new Error('请输入正确电话号码'));
    //   } else {
    //     callback();
    //   }
    // };
    var validatePass3 = (rule, value, callback)=>{
      var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确邮箱'));
      } else {
        callback();
      }
    };
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
        height: "auto",
        calcHeight: 30,
        selection: true,
        addBtn:false,
        border: true,
        menuWidth: 200,
        column: [
          // {
          //   label: "编号",
          //   prop: "companyId",
          //   addDisplay: false,
          //   editDisplay: false,
          // },
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
            search:true
          },
          {
            label: "公司名",
            prop: "companyName",
            addDisplay: false,
            editDisplay: false,
            search:true
          },
          {
            label: "联系方式",
            prop: "phone",
            rules: [{ validator: validatePass, trigger: 'blur' , required: true,}],
            search:true
          },
          {
            label: "微信",
            prop: "wechat",
          },
          {
            label: "邮箱",
            prop: "email",
            rules: [{ validator: validatePass3, trigger: 'blur' , required: true,}],
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
            hide: true
          },
          {
            label: "添加时间",
            prop: "createTime",
            rules: [
              {
                required: true,
                message: "请选择添加时间",
                trigger: "blur",
              },
            ],
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: "禁用状态",
            prop: "is_policymaker",
            type: "radio",
            dicData: [
              {
                label: "正常",
                value: 0,
              },
              {
                label: "异常",
                value: 1,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择禁用状态",
                trigger: "blur",
              },
            ],
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: "审核状态",
            prop: "auditState",
            type: "radio",
            value:1,
            dicData: [
              {
                label: "通过",
                value: 1,
              },
              {
                label: "不通过",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择审核状态",
                trigger: "blur",
              },
            ],
          },
          {
            label: "加入状态",
            prop: "joinState",
            type: "radio",
            value:1,
            dicData: [
              {
                label: "通过",
                value: 1,
              },
              {
                label: "拒绝",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择加入状态",
                trigger: "blur",
              },
            ],
          },
          {
            label: "法人",
            prop: "egalPerson",
            type: "radio",
            value:0,
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择",
                trigger: "blur",
              },
            ],
          },
          {
            label: "决策人",
            prop: "isPolicymaker",
            type: "radio",
            value:0,
            hide: true,
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择",
                trigger: "blur",
              },
            ],
          },
          {
            label: "是否接受模板消息",
            prop: "isRecipient",
            type: "radio",
            hide: true,
            value:0,
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择",
                trigger: "blur",
              },
            ],
          },
          {
            label: "联系人",
            prop: "isLinkman",
            type: "radio",
            hide: true,
            value:0,
            dicData: [
              {
                label: "是",
                value: 1,
              },
              {
                label: "否",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择",
                trigger: "blur",
              },
            ],
          },
          {
            label: "个人特点",
            prop: "trait",
            hide: true,
            type: "textarea",
            span: 24
          },
        ],
      },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.contacts_add, false),
          viewBtn: this.vaildData(this.permission.contacts_view, false),
          delBtn: this.vaildData(this.permission.contacts_delete, false),
          editBtn: this.vaildData(this.permission.contacts_edit, false)
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
      //禁用
      handelDisabled(){
        this.$message.success("禁用成功")
      },
      rowSave(row, done, loading) {
        console.log(row)
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
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
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
        console.log(params)
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
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
