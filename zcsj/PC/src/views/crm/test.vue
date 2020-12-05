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
              v-for="(data, index) in choicesList"
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
                  style="
                    display: flex;
                    margin: 5px;
                    width: 100%;
                    flex-wrap: wrap;
                  "
                >
                  <!-- 初始条件 -->
                  <div
                    style="display: flex; margin: 5px"
                    v-for="(item, indexs) in forms[index].inputList"
                    :key="item"
                  >
                    <div style="width: 200px">
                      <el-select
                        v-model="forms[index].targetValue[indexs]"
                        filterable
                        clearable
                        placeholder="请选择指标"
                        @change="targetChange"
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
                    <div style="width: 60px; margin-right: 5px" v-if="isNumber">
                      <el-autocomplete
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
                      <el-input v-model="forms[index].choicesNumber[indexs]">
                        <!-- <template slot="append">万元</template> -->
                      </el-input>
                    </div>

                    <div
                      style="width: 100px; margin: 0px 5px 0 0"
                      v-if="isStrings"
                    >
                      <el-input
                        v-model="forms[index].choicesString[indexs]"
                      ></el-input>
                    </div>
                    <div v-show="false">
                      <el-input
                        v-model="forms[index].specialValue[indexs]"
                      ></el-input>
                    </div>
                  </div>
                  <!-- 并且条件 -->
                  <div
                    class="bing"
                    style="display: flex; margin: 5px"
                    v-for="(item, indexs) in forms[index].inputChildList"
                    :key="indexs"
                    :class="item == '|' ? 'nextLine' : ''"
                  >
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
                      v-if="
                        forms[index].inputChildList.length &&
                        isBing &&
                        item == '|'
                      "
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
                        clearable
                        placeholder="请选择指标"
                        @change="targetChange"
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
                    <div style="width: 60px; margin-right: 5px" v-if="isNumber">
                      <el-autocomplete
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
                      v-if="isStrings"
                    >
                      <el-input
                        v-model="
                          forms[index].choicesString[
                            indexs + forms[index].inputList.length
                          ]
                        "
                      ></el-input>
                    </div>
                    <div v-show="false">
                      <el-input
                        v-model="
                          forms[index].specialValue[
                            indexs + forms[index].inputList.length
                          ]
                        "
                      ></el-input>
                    </div>
                  </div>
                  <!-- 单选条件 -->
                  <div style="margin: 5px 5px 0 0">
                    <el-radio-group
                      v-model="forms[index].radioValue"
                      v-if="radioDic.length"
                    >
                      <el-radio
                        :label="item.id"
                        v-for="item in radioDic"
                        :key="item.id"
                        >{{ item.label }}</el-radio
                      >
                    </el-radio-group>
                  </div>
                  <!-- 多选条件 -->
                  <div style="margin: 5px 5px 0 0">
                    <el-checkbox-group
                      v-model="forms[index].checkboxValue"
                      v-if="checkboxDic.length"
                    >
                      <el-checkbox
                        :label="item.id"
                        v-for="item in checkboxDic"
                        :key="item.id"
                        >{{ item.label }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </div>
                </div>
                <!-- 或者条件 -->
                <div
                  class="bing"
                  style="display: flex; margin: 5px 5px 5px 5px"
                  v-for="(item, indexs) in forms[index].inputHuoList"
                  :key="indexs"
                >
                  <div
                    style="margin: 0px 5px 0 0; color: red"
                    v-if="forms[index].inputHuoList.length && isHuo"
                  >
                    或者
                  </div>
                  <div style="width: 200px">
                    <el-select
                      v-model="
                        forms[index].targetValue[
                          indexs +
                            forms[index].inputList.length +
                            forms[index].inputChildList.length
                        ]
                      "
                      filterable
                      clearable
                      placeholder="请选择指标"
                      @change="targetChange"
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
                  <div style="width: 60px; margin-right: 5px" v-if="isNumber">
                    <el-autocomplete
                      class="inline-input"
                      v-model="
                        forms[index].operatorValue[
                          indexs +
                            forms[index].inputList.length +
                            forms[index].inputChildList.length
                        ]
                      "
                      :fetch-suggestions="querySearch"
                      placeholder=""
                      @select="
                        (index) => {
                          operatorChange_3(index, data);
                        }
                      "
                    ></el-autocomplete>
                  </div>
                  <div
                    style="width: 100px; margin: 0px 5px 0 0"
                    v-show="
                      forms[index].operatorValue[
                        indexs +
                          forms[index].inputList.length +
                          forms[index].inputChildList.length
                      ] == '>' ||
                      forms[index].operatorValue[
                        indexs +
                          forms[index].inputList.length +
                          forms[index].inputChildList.length
                      ] == '<' ||
                      forms[index].operatorValue[
                        indexs +
                          forms[index].inputList.length +
                          forms[index].inputChildList.length
                      ] == '≥' ||
                      forms[index].operatorValue[
                        indexs +
                          forms[index].inputList.length +
                          forms[index].inputChildList.length
                      ] == '≤' ||
                      forms[index].operatorValue[
                        indexs +
                          forms[index].inputList.length +
                          forms[index].inputChildList.length
                      ] == '='
                    "
                  >
                    <el-input v-model="forms[index].choicesNumber[indexs]">
                      <!-- <template slot="append">万元</template> -->
                    </el-input>
                  </div>
                  <div
                    style="width: 100px; margin: 0px 5px 0 0"
                    v-if="isStrings"
                  >
                    <el-input
                      v-model="forms[index].choicesString[indexs]"
                    ></el-input>
                  </div>
                </div>
                <!-- 并且按钮 -->
                <el-button
                  v-if="
                    isNumbers ||
                    isStrings ||
                    radioDic.length ||
                    checkboxDic.length
                  "
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="handelAddChild(index)"
                  >并且</el-button
                >
                <!-- 或者按钮 -->
                <el-button
                  v-if="
                    isNumbers ||
                    isStrings ||
                    radioDic.length ||
                    checkboxDic.length
                  "
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="handelAddHuo(index)"
                  >或者</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getData, getDetail, add, update, remove } from "@/api/policy/policy";
import { getList } from "@/api/crm/target";
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
          operatorValue: [""],
          radioValue: [],
          checkboxValue: [],
          choicesNumber: [""],
          choicesString: [""],
          inputList: [1],
          inputChildList: [], //并且
          inputHuoList: [], //或者
          specialValue: [""],
          value: [], //条件值
        },
      ],
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
      radioDic: [], //单选数据
      radioValue: [],
      checkboxDic: [], //多选数据
      checkboxValue: [],
      choicesNumber: [""], //数字条件
      choicesString: "", //字符型条件
      temp: [],
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
        dialogFullscreen: true,
        column: [
          {
            label: "政策名称",
            prop: "name",
            rules: [
              {
                required: false,
                message: "请输入政策名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "政策优惠",
            prop: "preferential",
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入政策优惠",
                trigger: "blur",
              },
            ],
          },
          {
            label: "政策要求",
            prop: "requested",
            type: "textarea",
            rules: [
              {
                required: false,
                message: "请输入政策政策要求",
                trigger: "blur",
              },
            ],
          },
          {
            label: "申报时间",
            prop: "acceptedTime",
            type: "date",
            rules: [
              {
                required: false,
                message: "请输入申报时间",
                trigger: "blur",
              },
            ],
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
          },
          {
            label: "政策类型",
            prop: "type",
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
            span: 24,
            type: "cascader",
            props: {
              label: "title",
            },
            dicData: [],
            lazy: true,
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
                required: false,
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
            clearable: true,
            dicData: [],
            hide: true,
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
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.test_add, false),
        viewBtn: this.vaildData(this.permission.test_view, false),
        delBtn: this.vaildData(this.permission.test_delete, false),
        editBtn: this.vaildData(this.permission.test_edit, false),
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
    querySearch(queryString, cb) {
      var restaurants = this.operator;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      //  调用 callback 返回建议列表的数据
      cb(results);
    },
    /**
     * @description:
     * @param {*} queryString
     * @return {*}
     */
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    targetChange(data) {
      this.isAlive = true;
      var target = this.options.filter((item) => item.id == data);
      this.operator.forEach((item) => {
        item.disabled = false;
      });
      if (target.length) {
        if (target[0].type == "1") {
          this.isNumber = true;
        } else {
          this.isNumber = false;
        }
        if (target[0].type == "2") {
          this.isNumber = false;
          this.isStrings = true;
        } else {
          // this.isStrings = false;
        }
        if (target[0].type == "3") {
          this.options = this.options.filter((item) => item.type == "1");
          // this.isNumber = false;
          target[0].choices.forEach((item) => {
            item.label = item.dictValue;
            item.value = item.id;
          });
          this.radioDic = target[0].choices;
        } else {
          // this.radioDic = [];
        }
        if (target[0].type == "4") {
          this.options = this.options.filter((item) => item.type == "1");
          // this.isNumber = false;
          target[0].choices.forEach((item) => {
            item.label = item.dictValue;
            item.value = item.id;
          });
          this.checkboxDic = target[0].choices;
        } else {
          // this.checkboxDic = [];
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
            // console.log(list);
            list.push("");
            this.targetValue.push("");
            this.operatorValue.push("");
            this.forms[index].value.push("");
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
      if (this.choicesList.length > 1) {
        this.choicesList.splice(index, 1);
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
            targetValue: [""], //指标率
            operatorValue: [""],
            radioValue: [],
            checkboxValue: [],
            choicesNumber: [""],
            choicesString: [],
            inputList: [1],
            inputChildList: [], //并且
            inputHuoList: [], //或者
            value: [],
            specialValue: [""],
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
        operatorValue: [""],
        radioValue: [],
        checkboxValue: [],
        choicesNumber: [""],
        choicesString: [""],
        inputList: [1],
        inputChildList: [], //并且
        inputHuoList: [], //或者
        value: [],
        specialValue: [""],
      };
      this.forms.push(form);
    },
    //新增并且条件
    handelAddChild(index) {
      this.forms[index].inputChildList.push("&");
      this.isBing = true;
      this.targetValue.push("");
      this.operatorValue.push("");
      // for(let i=0;i<this.forms[index].targetValue.length;i++){
      //    this.forms[index].specialValue[i] = "";
      // }
      // if(this.forms[index].inputChildList.length == '1'){
      //    this.forms[index].specialValue[this.forms[index].inputList.length-1] = "&";
      // }
      // if(this.forms[index].inputChildList.length == '2'){
      //   this.forms[index].specialValue[this.forms[index].inputList.length-1] = "&";
      //   this.forms[index].specialValue[this.forms[index].inputList.length] = "&";
      // }
    },
    //新增或者条件
    handelAddHuo(index) {
      this.forms[index].inputChildList.push("|");
      this.isHuo = true;
      this.targetValue.push("");
      this.operatorValue.push("");
      // this.forms[index].specialValue[this.inputList.length] = "|";
    },
    initData() {
      getLazyTree(this.parentCode).then((res) => {
        const column = this.findObject(this.option.column, "area");
        const data = res.data.data;
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
      });
    },
    rowSave(row, done, loading) {
      console.log(row);
      this.forms.forEach((item) => {
        for (let i = 0; i < item.targetValue.length; i++) {
          item.value[i] =
            item.targetValue[i] +
            item.operatorValue[i] +
            item.choicesNumber[i] +
            item.inputChildList[i - item.inputList.length + 1];
        }
        for (let j = 0; j < item.value.length; j++) {
          item.value[j] = item.value[j].replace(/undefined/g, "");
        }
        item.value = item.value.join("");
      });
      // this.forms.forEach((item) => {
      //   if (item.inputChildList.length) {
      //     item.value.splice(
      //       item.inputList.length,
      //       0,
      //       item.inputChildList[0]
      //     );
      //   }
      // });
      // console.log(this.temp);
      // var test = this.temp.join("");
      // console.log(test);
      console.log(this.forms);
      loading();
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
      if (["add"].includes(type)) {
        this.forms = [
          {
            targetValue: [""], //指标率
            operatorValue: [""],
            radioValue: [],
            checkboxValue: [],
            choicesNumber: [""],
            choicesString: [],
            inputList: [1],
            inputChildList: [], //并且
            inputHuoList: [], //或者
            value: [],
            specialValue: [""],
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
  display: block;
  // margin-left:200px;
  width: 100%;
}
</style>
