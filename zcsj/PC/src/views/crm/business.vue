<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      ref="crud"
      v-model="form"
      :permission="permissionList"
      :before-open="beforeOpen"
      :before-close="beforeClose"
      @row-del="rowDel"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
      @tree-load="treeLoad"
    ></avue-crud>
  </basic-container>
</template>

<script>
import {
  getDetail,
  add,
  update,
  remove,
  getMenuTree,
  getLazyTree,
} from "@/api/crm/business";
import { mapGetters } from "vuex";
// import { delete } from 'vue/types/umd';

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
      parentId: 0,
      selectionList: [],
      option: {
        lazy: true,
        tip: false,
        simplePage: true,
        searchShow: true,
        searchMenuSpan: 6,
        dialogWidth: "60%",
        tree: true,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        menuWidth: 300,
        dialogClickModal: false,
        column: [
          {
            label: "名称",
            prop: "title",
            rules: [
              {
                required: true,
                message: "请输入名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "上级菜单",
            hide: true,
            prop: "parentId",
            type: "tree",
            dicData: [],
            props: {
              label: "title",
            },
            rules: [
              {
                required: true,
                message: "请选择上级菜单",
                trigger: "click",
              },
            ],
          },
          {
            label: "编号",
            prop: "id",
            addDisplay: false,
            editDisplay: false,
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
        addBtn: this.vaildData(this.permission.business_add, false),
        viewBtn: this.vaildData(this.permission.business_view, false),
        delBtn: this.vaildData(this.permission.business_delete, false),
        editBtn: this.vaildData(this.permission.business_edit, false),
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
      getMenuTree().then((res) => {
        const column = this.findObject(this.option.column, "parentId");
        const data = res.data.data;
        let parentIdDIC = {
          id: "0",
          title: "顶级分类",
          parentId: "0",
          key:'0',
          hasChildren:"false",
          value:"0"
        };
        data.unshift(parentIdDIC);
        column.dicData = data;
      });
    },
    rowSave(row, done, loading) {
      row.name = row.title;
      if (!row.parentId) {
        row.parentId = "0";
      }
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
      row.name = row.title;
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
      if (["add", "edit"].includes(type)) {
        this.initData();
      }
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
    onLoad(page, params = {}) {
      this.loading = true;
      getLazyTree(this.parentId, Object.assign(params, this.query)).then(
        (res) => {
          this.data = res.data.data;
          this.loading = false;
          this.selectionClear();
        }
      );
    },
    treeLoad(tree, treeNode, resolve) {
      const parentId = tree.id;
      getLazyTree(parentId).then((res) => {
        resolve(res.data.data);
      });
    },
  },
};
</script>

<style>
</style>
