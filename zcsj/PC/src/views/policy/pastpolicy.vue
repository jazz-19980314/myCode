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
          v-if="permission.claim_delete"
          @click="handleDelete"
          >删 除
        </el-button>
      </template>
      <template slot="criteriaListForm">
        <div>
          <el-form ref="forms" :model="forms">
            <el-form-item
              v-for="(data, index) in forms"
              :key="index"
              v-model="form[index]"
              class="el_from_item"
            >
              <div style="width: 100%; margin-bottom: 5px">
                <div
                  style="
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                  "
                >
                  <el-button circle type="primary" size="mini">{{
                    index + 1
                  }}</el-button>
                  <div style="display: flex">
                    <el-button
                      type="success"
                      circle=""
                      icon="el-icon-circle-plus-outline"
                      @click="handelAdd(index)"
                    ></el-button>
                    <el-button
                      @click="handelDelete(index)"
                      type="danger"
                      icon="el-icon-delete"
                      circle
                    ></el-button>
                  </div>
                </div>
                <div
                  class="bigContent clearfix"
                  style="margin: 5px; width: 100%"
                >
                  <!-- 初始条件 -->
                  <div
                    style="display: flex; margin: 5px"
                    v-for="(item, indexs) in forms[index].inputList"
                    :key="item"
                  >
                    <div style="width: 200px">
                      <el-select
                        @focus="setDataIndex(index)"
                        v-model="forms[index].targetValue[indexs]"
                        filterable
                        placeholder="请选择指标"
                        @change="
                          (data) => {
                            targetChange(data, index);
                          }
                        "
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div style="width: 10px"></div>
                    <div
                      style="width: 60px; margin-right: 5px"
                      v-if="forms[index].targetType[indexs] == '1'"
                    >
                      <el-autocomplete
                        @focus="setDataIndex(index)"
                        class="inline-input"
                        v-model="forms[index].operatorValue[indexs]"
                        :fetch-suggestions="querySearch"
                        placeholder=""
                        @select="
                          (data) => {
                            operatorChange_1(data, index);
                          }
                        "
                      ></el-autocomplete>
                    </div>
                    <div
                      style="width: 100px; margin: 0px 5px 0 0"
                      v-show="
                        forms[index].operatorValue[indexs] == '>' ||
                        forms[index].operatorValue[indexs] == '<' ||
                        forms[index].operatorValue[indexs] == '≥' ||
                        forms[index].operatorValue[indexs] == '≤' ||
                        forms[index].operatorValue[indexs] == '='
                      "
                    >
                      <el-input
                        @focus="setDataIndex(index)"
                        v-model="forms[index].choicesNumber[indexs]"
                      >
                        <!-- <template slot="append">万元</template> -->
                      </el-input>
                    </div>

                    <div
                      style="width: 100px; margin: 0px 5px 0 0"
                      v-if="forms[index].targetType[indexs] == '2'"
                    >
                      <el-input
                        @focus="setDataIndex(index)"
                        v-model="forms[index].choicesString[indexs]"
                      ></el-input>
                    </div>
                    <!-- 单选条件 -->
                    <div
                      style="margin: 5px 5px 0 0"
                      v-if="forms[index].targetType[indexs] == '3'"
                    >
                      <el-radio-group v-model="forms[index].radioValue[indexs]">
                        <el-radio
                          :label="item.label"
                          v-for="item in forms[index].radioDic[indexs]"
                          :key="item.value"
                          >{{ item.label }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                    <!-- 多选条件 -->
                    <div
                      style="margin: 5px 5px 0 0"
                      v-if="forms[index].targetType[indexs] == '4'"
                    >
                      <el-checkbox-group
                        v-model="forms[index].checkboxValue[indexs]"
                      >
                        <el-checkbox
                          :label="item.label"
                          v-for="item in forms[index].checkboxDic[indexs]"
                          :key="item.value"
                          >{{ item.label }}</el-checkbox
                        >
                      </el-checkbox-group>
                    </div>
                  </div>
                  <!-- 并且条件 -->
                  <!-- <br v-if="isHuo"> -->
                  <div
                    class="bing"
                    style="display: flex; margin: 5px"
                    v-for="(item, indexs) in forms[index].inputChildList"
                    :key="indexs"
                    :class="item == '|' ? 'nextLine' : ''"
                  >
                    <!-- <div style="width" v-if="item == '|'"></div> -->
                    <div
                      style="margin: 0px 10px 0 0; color: red"
                      v-if="
                        forms[index].inputChildList.length &&
                        isBing &&
                        item == '&'
                      "
                    >
                      并且
                    </div>
                    <div
                      style="margin: 0px 10px 0 0; color: green"
                      v-if="forms[index].inputChildList.length && item == '|'"
                    >
                      或者
                    </div>
                    <div style="width: 200px">
                      <el-select
                        v-model="
                          forms[index].targetValue[
                            indexs + forms[index].inputList.length
                          ]
                        "
                        filterable
                        placeholder="请选择指标"
                        @focus="setDataIndex(index)"
                        @change="
                          (data) => {
                            targetChange(data, index);
                          }
                        "
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div style="width: 10px"></div>
                    <div
                      style="width: 60px; margin-right: 5px"
                      v-if="
                        forms[index].targetType[
                          indexs + forms[index].inputList.length
                        ] == '1'
                      "
                    >
                      <el-autocomplete
                        @focus="setDataIndex(index)"
                        class="inline-input"
                        v-model="
                          forms[index].operatorValue[
                            indexs + forms[index].inputList.length
                          ]
                        "
                        :fetch-suggestions="querySearch"
                        placeholder=""
                        @select="
                          (data) => {
                            operatorChange_2(data, index);
                          }
                        "
                      ></el-autocomplete>
                    </div>
                    <div
                      style="width: 100px; margin: 0px 5px 0 0"
                      v-show="
                        forms[index].operatorValue[
                          indexs + forms[index].inputList.length
                        ] == '>' ||
                        forms[index].operatorValue[
                          indexs + forms[index].inputList.length
                        ] == '<' ||
                        forms[index].operatorValue[
                          indexs + forms[index].inputList.length
                        ] == '≥' ||
                        forms[index].operatorValue[
                          indexs + forms[index].inputList.length
                        ] == '≤' ||
                        forms[index].operatorValue[
                          indexs + forms[index].inputList.length
                        ] == '='
                      "
                    >
                      <el-input
                        @focus="setDataIndex(index)"
                        v-model="
                          forms[index].choicesNumber[
                            indexs + forms[index].inputList.length
                          ]
                        "
                      >
                        <!-- <template slot="append">万元</template> -->
                      </el-input>
                    </div>
                    <div
                      style="width: 100px; margin: 0px 5px 0 0"
                      v-if="
                        forms[index].targetType[
                          indexs + forms[index].inputList.length
                        ] == '2'
                      "
                    >
                      <el-input
                        @focus="setDataIndex(index)"
                        v-model="
                          forms[index].choicesString[
                            indexs + forms[index].inputList.length
                          ]
                        "
                      ></el-input>
                    </div>
                    <!-- 单选条件 -->
                    <div
                      style="margin: 5px 5px 0 0"
                      v-if="
                        forms[index].targetType[
                          indexs + forms[index].inputList.length
                        ] == '3'
                      "
                    >
                      <el-radio-group
                        v-model="
                          forms[index].radioValue[
                            indexs + forms[index].inputList.length
                          ]
                        "
                      >
                        <el-radio
                          :label="item.label"
                          v-for="item in forms[index].radioDic[0]"
                          :key="item.value"
                          >{{ item.label }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                    <!-- 多选条件 -->
                    <div
                      style="margin: 5px 5px 0 0"
                      v-if="
                        forms[index].targetType[
                          indexs + forms[index].inputList.length
                        ] == '4'
                      "
                    >
                      <el-checkbox-group
                        v-model="
                          forms[index].checkboxValue[
                            indexs + forms[index].inputList.length
                          ]
                        "
                      >
                        <el-checkbox
                          :label="item.label"
                          v-for="item in forms[index].checkboxDic[0]"
                          :key="item.value"
                          >{{ item.label }}</el-checkbox
                        >
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 5px">
                  <!-- 并且按钮 -->
                  <el-button
                    type="text"
                    icon="el-icon-circle-plus-outline"
                    @click="handelAddChild(index)"
                    >并且</el-button
                  >
                  <!-- 或者按钮 -->
                  <el-button
                    type="text"
                    icon="el-icon-circle-plus-outline"
                    @click="handelAddHuo(index)"
                    >或者</el-button
                  >
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template slot="acceptedTime" slot-scope="{ row }">
        {{ row.acceptedTime.substring(0, 10) }}
      </template>
      <!-- 虚拟符合数 -->
      <template slot="virtualNum" slot-scope="{ row }">
        <span
          style="color: #409eff; cursor: pointer"
          @click="openVirtualDialog(row)"
          >{{ row.virtualNum }}</span
        >
      </template>
    </avue-crud>
    <!-- 虚拟符合数 -->
    <el-dialog
      :title="virtualTitle"
      :visible.sync="virtualDialog"
      width="60%"
      :append-to-body="true"
      :center="true"
      :close-on-click-modal="false"
    >
      <el-tag
        class=""
        v-for="item in companyList"
        :key="item.id"
        @click="toCompany(item.id)"
      >
        {{ item.name }}
      </el-tag>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getData,
  getDetail,
  add,
  update,
  remove,
  getByPolicyId,
} from "@/api/policy/policy";
import { getList } from "@/api/crm/target";
import { getRegionDetail, companyProjects } from "@/api/crm/company";
import { getLazyTree } from "@/api/base/region";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      forms: [
        {
          targetValue: [""], //指标率
          targetType: [], //指标类型
          operatorValue: [""],
          radioValue: [],
          checkboxValue: [],
          radioDic: [[]], //单选数据
          checkboxDic: [[]], //多选数据
          choicesNumber: [""],
          choicesString: [],
          inputList: [1],
          inputChildList: [], //并且
          inputHuoList: [], //或者
          specialValue: [""],
          valuess: [], //条件值
        },
      ],
      virtualDialog: false, //虚拟符合数
      virtualTitle: "",
      targetValue: [""], //指标率
      operatorValue: [""], //条件
      inputList: [1],
      inputChildList: [], //并且
      inputHuoList: [], //或者
      isBing: false,
      isHuo: false,
      choicesList: [1],
      isAlive: true,
      isNumber: false,
      isNumbers: false, //出现数值输入框
      isStrings: false, //字符输入框
      isRadio: false, //出现单选
      isCheckBox: false, //出现多选
      radioDic: [], //单选数据
      radioValue: [],
      checkboxDic: [], //多选数据
      checkboxValue: [[]],
      choicesNumber: [""], //数字条件
      choicesString: "", //字符型条件
      temp: [],
      dataIndex: 0,
      companyList: null,
      option: {
        height: "auto",
        calcHeight: 30,
        tip: false,
        //excelBtn:true,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        fit: true,
        selection: true,
        dialogClickModal: false,
        dialogFullscreen: true,
        editBtn: false,
        delBtn: false,
        addBtn: false,
        menuWidth: 100,
        column: [
          {
            label: "年份",
            prop: "year",
            search: true,
            span: 5,
          },
          {
            label: "政策名称",
            prop: "name",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入政策名称",
                trigger: "blur",
              },
            ],
            span: 7,
          },
          {
            label: "申报时间",
            prop: "acceptedTime",
            width: 90,
            type: "date",
            slot: true,
            // format: "yyyy-MM-dd",
            // valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: false,
                message: "请输入申报时间",
                trigger: "blur",
              },
            ],
            span: 6,
          },
          {
            label: "政策等级",
            prop: "grade",
            rules: [
              {
                required: false,
                message: "请输入政策等级",
                trigger: "blur",
              },
            ],
            span: 6,
          },
          {
            label: "奖补资金",
            prop: "preferential",
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入奖补资金",
                trigger: "blur",
              },
            ],
          },
          
          {
            label: "政策条件",
            prop: "requested",
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入政策政策条件",
                trigger: "blur",
              },
            ],
            width: 400,
            align: "center",
          },

          {
            label: "政策类型",
            prop: "type",
            type: "select",
            dicData: [],
            props: {
              label: "dictValue",
              value: "dictValue",
            },
            rules: [
              {
                required: false,
                message: "请输入政策类型",
                trigger: "blur",
              },
            ],
          },
          {
            label: "归档部门",
            prop: "archDept",
            rules: [
              {
                required: false,
                message: "请输入归档部门",
                trigger: "blur",
              },
            ],
          },
          {
            label: "归档联系方式",
            prop: "archContact",
            width: 100,
            rules: [
              {
                required: false,
                message: "请输入归档联系方式",
                trigger: "blur",
              },
            ],
          },
          {
            label: "第三方机构",
            prop: "organization",
            width: 90,
            rules: [
              {
                required: false,
                message: "请输入第三方机构",
                trigger: "blur",
              },
            ],
          },
          {
            label: "注册地区",
            placeholder: "",
            prop: "area",
            // span: 24,
            type: "cascader",
            props: {
              label: "title",
            },
            hide: true,
            dicData: [],
            lazy: true,
            checkStrictly: true,
            lazyLoad(node, resolve) {
              if (node.value) {
                const parentCode = node.value;
                getLazyTree(parentCode).then((res) => {
                  resolve(res.data.data);
                });
              }
            },
            rules: [
              {
                required: true,
                message: "请选择地区",
                trigger: "blur",
              },
            ],
          },
          {
            label: "备注",
            prop: "remark",
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入备注",
                trigger: "blur",
              },
            ],
          },
          {
            label: "所需材料",
            prop: "needMaterials",
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入所需材料",
                trigger: "blur",
              },
            ],
          },
          {
            label: "必要条件",
            prop: "criteriaList",
            type: "select",
            span: 24,
            filterable: true,
            dicData: [],
            hide: true,
            viewDisplay: false,
            props: {
              label: "name",
              value: "id",
            },
            rules: [
              {
                required: false,
                message: "请选择条件",
                trigger: "blur",
              },
            ],
            formslot: true,
          },
        ],
      },
      data: [],
      parentCode: "00",
      options: [],
      options_2: [], //数值型
      areaList: [], //地区数据
      isLengthChange: false,
      operator: [
        {
          label: "+",
          value: "+",
        },
        {
          label: "-",
          value: "-",
        },
        {
          label: "*",
          value: "*",
        },
        {
          label: "/",
          value: "/",
        },
        {
          label: ">",
          value: ">",
        },
        {
          label: "<",
          value: "<",
        },
        {
          label: "≤",
          value: "≤",
        },
        {
          label: "≥",
          value: "≥",
        },
        {
          label: "=",
          value: "=",
        },
      ],
    };
  },
  watch: {
    dataList() {
      this.isLengthChange = true;
    },
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.policy_add, false),
        viewBtn: this.vaildData(this.permission.policy_view, false),
        delBtn: this.vaildData(this.permission.policy_delete, false),
        editBtn: this.vaildData(this.permission.policy_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
    dataList() {
      return (
        this.forms[this.dataIndex].inputList &&
        this.forms[this.dataIndex].inputChildList
      );
    },
  },
  methods: {
    //虚拟符合数
    openVirtualDialog(row) {
      this.virtualDialog = true;
      this.virtualTitle = row.name;
      getByPolicyId(row.id).then((res) => {
        this.companyList = res.data.data;
      });
    },
    toCompany(id) {
      this.$router.push({
        path: "/crm/company",
        query: {
          id: id,
        },
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.operator;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    targetChange(data, index) {
      this.isAlive = true;
      var target = this.options.filter((item) => item.id == data);
      if (this.isLengthChange) {
        this.forms[index].targetType.push(target[0].type);
        this.forms[index].checkboxValue.push([]);
        this.forms[index].radioValue.push("");
        this.forms[index].choicesString.push("");
        this.isLengthChange = false;
      } else {
        this.forms[index].targetType[
          this.forms[index].inputList.length +
            this.forms[index].inputChildList.length -
            1
        ] = target[0].type;
      }
      this.operator.forEach((item) => {
        item.disabled = false;
      });
      if (target.length) {
        if (target[0].type == "1") {
          this.isNumber = true;
          this.options = this.options.filter((item) => item.type == "1");
        } else {
          this.isNumber = false;
        }
        if (target[0].type == "2") {
          //   this.isNumber = false;
          this.isStrings = true;
        } else {
          this.isStrings = false;
        }
        if (target[0].type == "3") {
          this.options = this.options.filter((item) => item.type != "3");
          // this.isNumber = false;
          var dic = target[0].choices.map((item) => {
            return {
              label: item.dictValue,
              value: item.id,
            };
          });
          this.forms[index].radioDic.push(dic);
          // this.radioDic = target[0].choices;
          this.isRadio = true;
        } else {
          this.radioDic = [];
          this.isRadio = false;
        }
        if (target[0].type == "4") {
          this.options = this.options.filter((item) => item.type != "4");
          // this.isNumber = false;
          var dic1 = target[0].choices.map((item) => {
            return {
              label: item.dictValue,
              value: item.id,
            };
          });
          this.forms[index].checkboxDic.push(dic1);
          // this.checkboxDic = target[0].choices;
          this.isCheckBox = true;
        } else {
          this.checkboxDic = [];
          this.isCheckBox = false;
        }
      }
    },
    //选择条件
    operatorChange(data, list, index) {
      if (data != "") {
        if (
          data == "+" ||
          data == "-" ||
          data == "*" ||
          data == "/" ||
          data == "||"
        ) {
          // this.options = this.options.filter((item) => item.type == "1");
          if (this.isAlive) {
            list.push("");
            this.targetValue.push("");
            this.operatorValue.push("");
            this.forms[index].valuess.push("");
            this.isAlive = false;
            this.isNumbers = false;
            // this.isBing = false;
            // this.isHuo = false;
            // this.operator.forEach(item=>{
            //   item.disabled = true;
            // })
          }
        } else {
          //  if(this.inputList.length > 1){
          //     this.inputList.pop();
          //  }
          this.isAlive = true;
          this.isNumbers = true;
        }
      }
    },
    //普通条件
    operatorChange_1(data, index) {
      this.operatorChange(data.value, this.forms[index].inputList, index);
    },
    //并且条件运算
    operatorChange_2(data, index) {
      // this.options = this.options_2;
      this.operatorChange(data.value, this.forms[index].inputChildList, index);
    },
    //或者条件运算
    operatorChange_3(data, index) {
      // this.options = this.options_2;
      this.operatorChange(
        data.value,
        this.forms[index - 1].inputHuoList,
        index - 1
      );
    },
    //删除条件
    handelDelete(index) {
      this.options = this.options_2;
      if (this.forms.length > 1) {
        this.forms.splice(index, 1);
      } else {
        this.inputList = [1];
        this.targetValue[0] = "";
        this.operatorValue[0] = "";
        this.isNumbers = false;
        this.isStrings = false;
        this.inputChildList = [];
        this.inputHuoList = [];
        this.checkboxDic = [];
        this.radioDic = [];
        this.forms = [
          {
            targetValue: [""], //指标
            targetType: [], //指标类型
            operatorValue: [""], // 运算符的值
            radioValue: [], //单选框值
            checkboxValue: [], //多选的值
            choicesNumber: [""], //数字框的值
            choicesString: [], //字符型的值
            inputChildList: [], //条件运算的值
            inputList: [1],
            // inputHuoList: [], //或者
            radioDic: [], //单选数据
            checkboxDic: [], //多选数据
            valuess: [],
            // specialValue: [""],
          },
        ];
      }
    },
    //新增条件
    handelAdd(index) {
      this.options = this.options_2;
      this.choicesList.push(index + 1);
      var form = {
        targetValue: [""], //指标率
        targetType: [],
        operatorValue: [""],
        radioValue: [],
        checkboxValue: [],
        radioDic: [], //单选数据
        checkboxDic: [], //多选数据
        choicesNumber: [""],
        choicesString: [],
        inputList: [1],
        inputChildList: [], //并且
        inputHuoList: [], //或者
        valuess: [],
        specialValue: [""],
      };
      this.forms.push(form);
    },
    //设置下标值
    setDataIndex(index) {
      this.dataIndex = index;
    },
    //新增并且条件
    handelAddChild(index) {
      // this.options = this.options_2;
      this.forms[index].inputChildList.push("&");
      this.isBing = true;
      this.targetValue.push("");
      this.operatorValue.push("");
    },
    //新增或者条件
    handelAddHuo(index) {
      // this.options = this.options_2;
      this.forms[index].inputChildList.push("|");
      this.isHuo = true;
      this.targetValue.push("");
      this.operatorValue.push("");
    },
    initData() {
      getLazyTree(this.parentCode).then((res) => {
        const column = this.findObject(this.option.column, "area");
        const data = res.data.data;
        this.areaList = res.data.data;
        column.dicData = data;
      });
      getList(1, -1).then((res) => {
        const column = this.findObject(this.option.column, "criteriaList");
        const data = res.data.data.records;
        data.forEach((item) => {
          item.label = item.name;
          item.value = item.id;
        });
        column.dicData = data;
        this.options = data;
        this.options_2 = data;
        this.forms.forEach((item) => {
          if (item.targetType[0] == "1") {
            this.options = this.options.filter((data) => data.type == "1");
          }
        });
      });
      companyProjects().then((res) => {
        const column = this.findObject(this.option.column, "type");
        const data = res.data.data.dicts;
        // console.log(column);
        column.dicData = data;
      });
    },
    rowSave(row, done, loading) {
      // let regNumber=/\d/;
      if (row.$area.indexOf(",") == "-1") {
        row.area = row.$area.split("|");
      } else {
        row.area = row.$area.split(",");
      }
      if (row.area.length > 1) {
        row.area = row.area[row.area.length - 1];
      } else {
        var area = this.areaList.filter((item) => item.title == row.area[0]);
        row.area = area[0].value;
      }
      // console.log(this.forms)
      if (this.forms[0].targetValue[0]) {
        this.forms.forEach((item) => {
          for (let i = 0; i < item.targetValue.length; i++) {
            item.valuess[i] =
              item.targetValue[i] +
              item.operatorValue[i] +
              item.choicesNumber[i] +
              (item.choicesString[i] == "" ? "" : "=" + item.choicesString[i]) +
              (item.radioValue[i] == "" ? "" : "=" + item.radioValue[i]) +
              (item.checkboxValue[i].length == "0"
                ? ""
                : "=," + item.checkboxValue[i].join(",")) +
              item.inputChildList[i - item.inputList.length + 1];
          }
          for (let j = 0; j < item.valuess.length; j++) {
            item.valuess[j] = item.valuess[j].replace(/undefined/g, "");
          }
          for (let k = 0; k < item.valuess.length; k++) {
            item.valuess[k] = item.valuess[k].replace(/null/g, "");
          }
          item.value = item.valuess.join("");
        });
      }
      row.criteriaList = this.forms.map((item, index) => {
        return {
          value: item.value,
          jsonValue: JSON.stringify(this.forms[index]),
        };
      });
      loading();
      if (row.criteriaList[0].value) {
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
      } else {
        this.$message.error("至少选择一个条件！");
        loading();
      }
    },
    rowUpdate(row, index, done, loading) {
      let regNumber = /\d/;
      if (row.$area.indexOf(",") == "-1") {
        row.area = row.$area.split("|");
      } else {
        row.area = row.$area.split(",");
      }
      if (row.area.length > 1) {
        row.area = row.area[row.area.length - 1];
      }
      if (row.area.length == 1 && !regNumber.test(row.area[0])) {
        var area = this.areaList.filter((item) => item.title == row.area[0]);
        row.area = area[0].value;
      }
      if (row.area.length == 1 && regNumber.test(row.area[0])) {
        row.area = row.area[0];
      }
      if (this.forms[0].targetValue[0]) {
        this.forms.forEach((item) => {
          for (let i = 0; i < item.targetValue.length; i++) {
            item.valuess[i] =
              item.targetValue[i] +
              item.operatorValue[i] +
              item.choicesNumber[i] +
              (item.choicesString[i] == "" ? "" : "=" + item.choicesString[i]) +
              (item.radioValue[i] == "" ? "" : "=" + item.radioValue[i]) +
              (item.checkboxValue[i].length == "0"
                ? ""
                : "=," + item.checkboxValue[i].join(",")) +
              item.inputChildList[i - item.inputList.length + 1];
          }
          for (let j = 0; j < item.valuess.length; j++) {
            item.valuess[j] = item.valuess[j].replace(/undefined/g, "");
          }
          for (let k = 0; k < item.valuess.length; k++) {
            item.valuess[k] = item.valuess[k].replace(/null/g, "");
          }
          item.value = item.valuess.join("");
        });
      }
      row.criteriaList = this.forms.map((item, index) => {
        return {
          value: item.value,
          jsonValue: JSON.stringify(this.forms[index]),
          id: item.id,
        };
      });
      if (row.criteriaList[0].value) {
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
      } else {
        this.$message.error("至少选择一个条件！");
        loading();
      }
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
        this.isBing = true;
        getDetail(this.form.id).then((res) => {
          this.form = res.data.data;
          var data = res.data.data.criteriaList;
          this.forms = data.map((item) => {
            return JSON.parse(item.jsonValue);
          });
          this.forms.forEach((item, index) => {
            item.id = data[index].id;
          });
          getRegionDetail(res.data.data.area).then((res) => {
            this.findObject(this.option.column, "area").placeholder =
              res.data.data.provinceName +
              (res.data.data.cityName == ""
                ? ""
                : "/" + res.data.data.cityName) +
              (res.data.data.districtName == ""
                ? ""
                : "/" + res.data.data.districtName) +
              (res.data.data.townName == ""
                ? ""
                : "/" + res.data.data.townName);
          });
        });
      }
      if (["add"].includes(type)) {
        this.findObject(this.option.column, "area").placeholder = "";
        this.forms = [
          {
            targetValue: [""], //指标
            targetType: [], //指标类型
            operatorValue: [""], // 运算符的值
            radioValue: [], //单选框值
            checkboxValue: [], //多选的值
            choicesNumber: [""], //数字框的值
            choicesString: [], //字符型的值
            inputChildList: [], //条件运算的值
            inputList: [1],
            // inputHuoList: [], //或者
            radioDic: [], //单选数据
            checkboxDic: [], //多选数据
            valuess: [],
            // specialValue: [""],
          },
        ];
        this.isNumbers = false;
        this.isStrings = false;
      }
      this.initData();
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      console.log(params);
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
      this.query.status = 0,
      getData(
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

<style lang='scss' scoped>
.avue-form .operator {
  width: 30px !important;
}
.el-button.is-circle {
  width: 40px;
  height: 40px;
}
.nextLine {
  clear: both;
}
.bigContent div {
  // display: flex;
  // flex-wrap: wrap;
  float: left;
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
::v-deep {
  .el-table td {
    vertical-align: top !important;
  }
}
</style>
