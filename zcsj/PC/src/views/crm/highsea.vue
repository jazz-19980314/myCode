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
			<el-button type="danger" size="small" icon="el-icon-delete" plain v-if="permission.target_delete" @click="handleDelete">删
				除
			</el-button>
		</template>
      <template slot="menu" slot-scope="{ row }">
        <el-tooltip
          class="item"
          effect="dark"
          content="联系人"
          placement="bottom"
        >
          <el-button
            type="warning"
            icon="el-icon-user"
            circle
            size="small"
            @click="addUser(row)"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="认领"
          placement="bottom"
        >
          <el-button
            type="primary"
            size="small"
            @click="claimCompany(row)"
          >认领</el-button>
        </el-tooltip>
      </template>
      <template slot="menuRight">
        <el-button type="success" size="small" @click="claimRecords">认领记录</el-button>
      </template>
      <!-- 自定义公司列 -->
      <template slot="name" slot-scope="{ row }">
        <span style="color: #409eff" @click="editCompony(row)">{{
          row.name
        }}</span>
      </template>
      <!-- 公司指标数据 -->
      <template slot="rates" slot-scope="{ row }">
        <span style="color: #409eff" @click="editCompanyTarget(row)">{{
          row.rates
        }}</span>
      </template>
    </avue-crud>
    <!-- 添加公司对话框 -->
    <el-dialog
      :title="componyTitle"
      :visible.sync="addCompany"
      width="45%"
      @close="handleCompanyClose"
      @open="handelReset"
      :append-to-body="true"
      :center="true"
      :close-on-click-modal="false"
    >
      <avue-form
        ref="componyForm"
        :option="formOption"
        v-model="companyForm"
        @submit="handleSubmit"
      >
        <template slot="menuForm">
          <el-button @click="handleEmpty">取消</el-button>
        </template>
      </avue-form>
    </el-dialog>
    <!-- 联系人 -->
    <el-dialog
      :title="addUserTitle"
      :visible.sync="addUserDialog"
      width="70%"
      :append-to-body="true"
      :center="true"
      :close-on-click-modal="false"
      @open="beforeContracts"
    >
      <avue-crud
        :option="addUserOption"
        v-model="userForm"
        :table-loading="loading"
        :data="userData"
        @row-update="rowUpdateUser"
        @row-save="rowSaveUser"
        @row-del="rowDelUser"
        ref="addUser"
      >
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
    <!-- 认领 -->
    <el-dialog
      title="认领"
      :visible.sync="claimDialog"
      width="45%"
      :append-to-body="true"
      :center="true"
      :close-on-click-modal="false"
    >
      <avue-form
        ref="claimForm"
        :option="claimOption"
        v-model="claimForm"
        @submit="handleClaim"
      >
        <template slot="menuForm">
          <el-button @click="claimEmpty">取消</el-button>
        </template>
      </avue-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  // getList,
  getDetail,
  add,
  update,
  remove,
  getSource,
  saveCompony,
  updataCompony,
  getRegionDetail,
  companyGrade
} from "@/api/crm/company";
import { getLazyTree } from "@/api/base/region";
import { getMenuTree } from "@/api/crm/business";
import {getSeaList,claimCompony} from "@/api/crm/highsea";
import {
  getContactsList,
  // getContactsDetail,
  addContacts,
  updateContacts,
  removeContacts,
} from "@/api/crm/company";
import { mapGetters } from "vuex";
// import { delete } from 'vue/types/umd';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确电话号码"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确邮箱"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      userForm: {},
      query: {},
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
      companyId:'', //公司id
      grade:null,  //公司级别
      selectionList: [],
      companyForm: null,
      addCompany: false, //添加公司
      componyTitle: "添加公司",
      addUserTitle: "",
      addUserDialog: false, //联系人
      claimDialog:false,
      claimForm:null,
      treeData: [], //地区树
      option: {
        height: "auto",
        calcHeight: 30,
        align: "center",
        menuAlign: "center",
        tip: false,
        addBtn: false,
        viewBtn: false,
        editBtn: false,
        delBtn: false,
        searchBtn: true,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        selection: true,
        dialogClickModal: false,
        menuWidth: 200,
        index: true,
        column: [
          {
            label: "公司名称",
            prop: "name",
            slot: true,
            width: 250,
            rules: [
              {
                required: true,
                message: "请输入公司名称",
                trigger: "blur",
              },
            ],
            search: true,
            fixed:true
          },
          {
            label: "公司级别",
            prop: "grade",
            type: "tree",
            search: true,
            dicData: [],
            dataType:"string",
            props:{
              label:"dictValue",
              value:"dictKey"
            },
            rules: [
              {
                required: true,
                message: "请选择公司级别",
                trigger: "blur",
              },
            ],
          },
          // {
          //   label: "VIP级别",
          //   prop: "vipgrade",
          //   type: "tree",
          //   search: true,
          //   dicData: DIC2,
          //   rules: [
          //     {
          //       required: true,
          //       message: "请选择公司级别",
          //       trigger: "blur",
          //     },
          //   ],
          // },
          {
            label: "资质标签",
            prop: "qualities",
            sortable: true,
            width: 100,
            rules: [
              {
                required: true,
                message: "请输入资质标签",
                trigger: "blur",
              },
            ],
          },
          {
            label: "指标率",
            prop: "rates",
            sortable: true,
            width: 100,
            slot:true,
            rules: [
              {
                required: true,
                message: "请输入指标率",
                trigger: "blur",
              },
            ],
          },
          {
            label: "符合数",
            sortable: true,
            prop: "virtual",
             width: 100,
            rules: [
              {
                required: true,
                message: "请输入虚拟符合数",
                trigger: "blur",
              },
            ],
          },
          {
            label: "注册时间",
            prop: "establishedTime",
            sortable: true,
            type:"date",
            width: 100,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请输入注册时间",
                trigger: "blur",
              },
            ],
            search: true,
          },
          {
            label: "约见记录",
            prop: "appoinmentTime",
            sortable: true,
            type:'date',
            width: 100,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请输入约见记录",
                trigger: "blur",
              },
            ],
          },
          {
            label: "沟通记录",
            prop: "communicateTime",
            type:'date',
            width: 100,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            sortable: true,
            rules: [
              {
                required: true,
                message: "请输入沟通记录",
                trigger: "blur",
              },
            ],
          },
          // {
          //   label: "次数",
          //   prop: "total"
          // },
          // {
          //   label: "认领次数",
          //   prop: "times"
          // },
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
        column: [
          {
            label: "公司名称",
            prop: "name",
            rules: [
              {
                required: true,
                message: "请输入公司名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "所属行业",
            prop: "business",
            type: "tree",
            dicData: [],
            props: {
              label: "title",
            },
            rules: [
              {
                required: true,
                message: "请选择所属行业",
                trigger: "blur",
              },
            ],
          },
          {
            label: "成立时间",
            prop: "establishedTime",
            type: "date",
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
          },
          {
            label: "注册地区",
            placeholder:'',
            prop: "regionCode",
            type: "cascader",
            props: {
              label: "title",
            },
            dicData: [],
            lazy: true,
            // lazyLoad(node, resolve) {
            //   if (node.value) {
            //     const parentCode = node.value;
            //     getLazyTree(parentCode).then((res) => {
            //       resolve(res.data.data);
            //     });
            //   }
            // },
            lazyLoad(node, resolve) {
              let stop_level = 3;
              let level = node.level;
              // let data = node.data || {}
              // let code = data.code;
              let parentCode = node.value;
              let list = [];
              let callback = () => {
                resolve((list || []).map(ele => {
                  return Object.assign(ele, {
                    leaf: level >= stop_level
                  })
                }));
              }
              if (level == 0) {
                getLazyTree(parentCode).then(res => {
                  list = res.data.data;
                  callback()
                })
              }
              if (level == 1) {
                getLazyTree(parentCode).then(res => {
                  list = res.data.data;
                  callback()
                })
              } else if (level == 2) {
                getLazyTree(parentCode).then(res => {
                  list = res.data.data;
                  callback()
                })
              }else if (level == 3) {
                getLazyTree(parentCode).then(res => {
                  list = res.data.data;
                  callback()
                })
              }
              },
            // checkStrictly: true,
            rules: [
              {
                required: true,
                message: "请选择注册地区",
                trigger: "blur",
              },
            ],
          },
          {
            label: "详细地址",
            prop: "address",
            rules: [
              {
                required: true,
                message: "请输入公司详细地址",
                trigger: "blur",
              },
            ],
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
            rules: [
              {
                required: true,
                message: "请输入联系人",
                trigger: "blur",
              },
            ],
            display: true,
          },
          {
            label: "联系人手机号",
            prop: "contacts_phone",
            rules: [{ required: true,validator: validatePass, trigger: "blur"}],
            display: true,
          },
          {
            label: "邮箱",
            prop: "contacts_email",
            rules: [{ required: true,validator: validatePass3, trigger: "blur" }],
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
            rules: [
              {
                required: true,
                message: "请输入客户法人",
                trigger: "blur",
              },
            ],
          },
          {
            label: "工商联系电话",
            prop: "phone",
            rules: [{ required: true,validator: validatePass2, trigger: "blur" }],
          },
          {
            label: "客户级别",
            prop: "grade",
            type: "tree",
            dicData: [],
            props:{
              label:"dictValue",
              value:"dictKey"
            },
            rules: [
              {
                required: true,
                message: "请选择客户级别",
                trigger: "blur",
              },
            ],
          },
          {
            label: "状态",
            prop: "status",
            type: "radio",
            value: 1,
            dicData: [
              {
                label: "启用",
                value: 1,
              },
              {
                label: "停用",
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
            label: "销售代表",
            prop: "salesManagerName",
            dispaly: false,
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
        column: [
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
            label: "公司名",
            prop: "companyName",
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: "联系方式",
            prop: "phone",
            rules: [
              { validator: validatePass, trigger: "blur", required: true },
            ],
          },
          {
            label: "微信",
            prop: "wechat",
          },
          {
            label: "邮箱",
            prop: "email",
            rules: [
              { validator: validatePass3, trigger: "blur", required: true },
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
            label: "状态",
            prop: "status",
            type: "radio",
            value:1,
            // slot:true,
            dicData: [
              {
                label: "启用",
                value: 1,
              },
              {
                label: "禁用",
                value: 0,
              },
            ],
            rules: [
              {
                required: true,
                message: "请选择禁用状态",
                trigger: "blur",
              },
            ],
            // addDisplay: false,
            // editDisplay: false,
          },
          {
            label: "审核状态",
            prop: "auditState",
            type: "radio",
            value: 1,
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
            value: 1,
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
            value: 0,
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
            value: 0,
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
            value: 0,
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
            value: 0,
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
            span: 24,
          },
        ],
      },
      //认领
      claimOption:{
        emptyBtn: false,
        submitText: "确定",
        column: [
           {
            label: "公司名称",
            prop: "name",
            disabled:true,
          },
           {
            label: "指标数",
            prop: "rates",
            disabled:true,
          },
          {
            label: "符合数",
            prop: "virtual",
            disabled:true,
          },
          {
            label: "更改等级",
            prop: "grade",
            type: "tree",
            dicData: [],
            props: {
              label: "dictValue",
              value: "dictKey",
            },
            rules: [
              {
                required: true,
                message: "请选择公司级别",
                trigger: "blur",
              },
            ],
          },
        ],
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.highsea_add, false),
        viewBtn: this.vaildData(this.permission.highsea_view, false),
        delBtn: this.vaildData(this.permission.highsea_delete, false),
        editBtn: this.vaildData(this.permission.highsea_edit, false),
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
    //公司
    initData() {
      getLazyTree(this.parentCode).then((res) => {
        const column = this.findObject(this.formOption.column, "regionCode");
        const data = res.data.data;
        column.dicData = data;
      });
      getMenuTree().then((res) => {
        const column = this.findObject(this.formOption.column, "business");
        const data = res.data.data;
        column.dicData = data;
      });
      getSource().then((res) => {
        const column = this.findObject(this.formOption.column, "source");
        const data = res.data.data[0].children;
        column.dicData = data;
      });
    },
    handelReset() {
      this.initData();
    },
    handleCompanyClose() {
      this.$refs.componyForm.resetForm();
    },
    handleSubmit(form, done) {
      if(this.componyTitle == "添加公司"){
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
      }else{
        form.regionCode = form.$regionCode.split(',')[form.$regionCode.split(',').length - 1];
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
    editCompony(row) {
      this.addCompany = true;
      this.componyTitle = "编辑公司";
      this.companyForm = row;
      getRegionDetail(row.regionCode).then((res) => {
        this.findObject(this.formOption.column, "regionCode").placeholder = 
        res.data.data.provinceName+"/"+ res.data.data.cityName + '/' + res.data.data.districtName+"/"+ res.data.data.townName;
        // var code =  res.data.data.ancestors.split(",")
        // code.shift()
        // code.push(res.data.data.code)
        // row.regionCode = code
        // this.companyForm = row;
        // console.log(this.companyForm)
      });
      this.findObject(
        this.formOption.column,
        "salesManagerName"
      ).display = true;
      this.findObject(this.formOption.column, "contacts_name").display = false;
      this.findObject(this.formOption.column, "contacts_email").display = false;
      this.findObject(this.formOption.column, "contacts_phone").display = false;
    },
    //指标率
    editCompanyTarget(row){
      this.$router.push({
        path:'/crm/companytarget',
        query:{
          companyId:row.id
        }
      })
    },
    // 联系人
    addUser(row) {
      this.addUserDialog = true;
      this.addUserTitle = row.name + "-联系人管理";
      this.companyId = row.id
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
      row.companyId = this.companyId
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
    rowDelUser(row,index, done, loading) {
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
    toYueDetail() {
      this.$router.push("/crm/appoinment");
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
    //认领
    claimCompany(row){
      this.claimDialog = true;
      this.claimForm = row;
    },
    handleClaim(form,done){
       claimCompony(this.claimForm).then(res=>{
        if(res.data.success){
          this.$message.success("认领成功！")
          done()
          this.claimDialog = false;
          this.refreshChange()
        }
      })
    },
    claimEmpty(){
      this.claimDialog = false;
    },
    //认领记录
    claimRecords(){
      this.$router.push("/crm/claim");
    },
    onLoad(page, params = {}) {
      this.loading = false;
      getSeaList(
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
      companyGrade("company_level").then(res=>{
        const column1 = this.findObject(this.option.column, "grade");
        const column2 = this.findObject(this.formOption.column, "grade");
        const column3 = this.findObject(this.claimOption.column, "grade");
        const data = res.data.data;
        column1.dicData = data;
        column2.dicData = data;
        column3.dicData = data;
        this.grade = res.data.data
      })
    },
  },
};
</script>

<style>
</style>
