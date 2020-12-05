<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        v-model="form"
        @on-load="getPage"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        :before-open="beforeOpen"
        @row-save="handleSave"
        @row-del="handleDel"
        @sort-change="sortChange"
        @search-change="searchChange"
        :upload-after="handleImageSuccess"
      >
       <template slot="contentForm" slot-scope="scope">
          <BaseEditor v-model="scope.row.content"/>
        </template>
        <!-- <template slot="picUrls" slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.picUrls[0]"
            :preview-src-list="scope.row.picUrls"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template> -->
        <!-- <template slot="picUrlsForm" slot-scope="scope">
          <div>
            <el-image
              v-if="scope.row.picUrls"
              style="width: 150px; height: 150px;border-radius:5px;"
              :src="scope.row.picUrls[0]"
              :preview-src-list="scope.row.picUrls"
            ></el-image>
            <el-upload
              action="/admin/file/uploads"
              :headers="headers"
              :class="{hide:hideUpload}"
              list-type="picture-card"
              :on-change="handelImageChange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleImageSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <p>最多只能上传一张图片</p>
            <MaterialList v-model="scope.row.picUrls" type="image" :num=1></MaterialList>
            <p>主图默认第一张</p>
          </div>
        </template> -->
        <template slot="videoUrls" slot-scope="scope">
          <video
            v-if="scope.row.videoUrls[0]"
            preload="none"
            :src="scope.row.videoUrls[0]"
            style="height: 100px"
            class="avatar video-avatar"
            controls="controls"
          ></video>
        </template>
        <!-- <template slot="videoUrlsForm" slot-scope="scope">
          <div class="album albumvideo">
            <div>
              <div class="pic_img">
                <div class="pic_img_box">
                  <video
                    v-if="scope.row.videoUrls"
                    :src="scope.row.videoUrls[0]"
                    style="height: 150px;width:150px;border-radius:5px;"
                    class="avatar video-avatar"
                    controls="controls"
                  ></video>
                  <el-upload
                    action="/admin/file/uploads"
                    :headers="headers"
                    :on-change="handelVideoChange"
                    :class="{hide:hideVideoUpload}"
                    list-type="picture-card"
                    :on-preview="handleVideoCardPreview"
                    :on-remove="handleVideoRemove"
                    :on-success="handleVideoSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVideoVisible">
                    <video
                      style="width:100%"
                      :src="dialogVideoUrl"
                      class="avatar video-avatar"
                      controls="controls"
                    >您的浏览器不支持视频播放</video>
                  </el-dialog>
                </div>
              </div>
            </div>
            <p class="Upload_pictures">
              <span></span>
              <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
            </p>
          </div>
        </template> -->
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { getPage, getObj, addObj, putObj, delObj } from "@/api/mall/homepage";
import { tableOption } from "@/const/crud/mall/homepage";
import { mapGetters } from "vuex";
import MaterialList from "@/components/material/list.vue";
import BaseEditor from '@/components/editor/BaseEditor.vue'
import WxVideoPlayer from "@/components/wx-video-play/main.vue";
import store from "@/store";
export default {
  name: "homepage",
  components: {
    MaterialList,
    WxVideoPlayer,
    BaseEditor
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      form: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
        ascs: [], //升序字段
        descs: [] //降序字段
      },
      paramsSearch: {},
      tableLoading: false,
      tableOption: tableOption,
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      dialogVideoVisible: false,
      dialogVideoUrl: "",
      uploadSuc: true,
      hideUpload: false,
      limitCount:1,
      hideVideoUpload:false,
    };
  },
  created() {},
  mounted: function() {},
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.permissions["mall:homepage:add"] ? true : false,
        delBtn: this.permissions["mall:homepage:del"] ? true : false,
        editBtn: this.permissions["mall:homepage:edit"] ? true : false,
        viewBtn: this.permissions["mall:homepage:get"] ? true : false
      };
    }
  },
  methods: {
    searchChange(params, done) {
      params = this.filterForm(params);
      this.paramsSearch = params;
      this.page.currentPage = 1;
      this.getPage(this.page, params);
      done();
    },
    sortChange(val) {
      let prop = val.prop
        ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase()
        : "";
      if (val.order == "ascending") {
        this.page.descs = [];
        this.page.ascs = prop;
      } else if (val.order == "descending") {
        this.page.ascs = [];
        this.page.descs = prop;
      } else {
        this.page.ascs = [];
        this.page.descs = [];
      }
      this.getPage(this.page);
    },
    getPage(page, params) {
      this.tableLoading = true;
      getPage(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            descs: this.page.descs,
            ascs: this.page.ascs
          },
          params,
          this.paramsSearch
        )
      )
        .then(response => {
          this.tableData = response.data.data.records;
          this.tableData.forEach(item=>{
            item.linkUrls = item.linkUrls.join('')
          })
          this.page.total = response.data.data.total;
          this.page.currentPage = page.currentPage;
          this.page.pageSize = page.pageSize;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前删除数据的行数
     *
     **/
    handleDel: function(row, index) {
      let _this = this;
      this.$confirm("是否确认删除此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.id);
        })
        .then(data => {
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.getPage(this.page);
        })
        .catch(function(err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    beforeOpen(done,type){
      this.hideVideoUpload = false
      this.hideUpload = false
      if(type == "edit"){
        this.form.type = this.form.type.split('')
        // this.form.linkUrls = this.form.linkUrls.join('')
        this.form.picUrls = this.form.picUrls.join('')
        this.form.videoUrls = this.form.videoUrls.join('')
      }
       done()
    },
    handleUpdate: function(row, index, done, loading) {
      var tempLink = [];
      tempLink.push(row.linkUrls);
      row.linkUrls = tempLink;
      row.type = row.type[0];
      putObj(row)
        .then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done, loading) {
      // console.log(row)
    //  if(row.linkUrls.length>0){
        let tempLink=[]
        tempLink.push(row.linkUrls);
        row.linkUrls = tempLink;
    //  }
      row.type = row.type[0];
      delete row.id;
      delete row.tenantId;
      addObj(row)
        .then(response => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          done();
          this.getPage(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    /**
     * 刷新回调
     */
    refreshChange(page) {
      this.getPage(this.page);
    },
    // 图片上传
    handelImageChange(file, fileList){
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleImageSuccess(res,done) {
      this.$set(res,"url",res.link)
      this.$delete(res, "link")
      console.log(res)
      done()
    },
    //视频上传
    handelVideoChange(file, fileList){
      this.hideVideoUpload = fileList.length >= this.limitCount;
    },
    handleVideoRemove(file, fileList) {
      console.log(file, fileList);
      this.hideVideoUpload = fileList.length >= this.limitCount;
    },
    handleVideoCardPreview(file) {
      this.dialogVideoUrl = file.url;
      this.dialogVideoVisible = true;
    },
    // eslint-disable-next-line vue/no-dupe-keys
    handleVideoSuccess(file) {
      this.dialogVideoUrl = file.link;
    }
  }
};
</script>

<style lang="scss">
.hide .el-upload--picture-card {
    display: none;
}
// .avatar-uploader {
//   width: 150px;
//   height: 150px;
//   line-height: 150px;
//   background-color: #fbfdff;
//   border: 1px dashed #c0ccda;
//   border-radius: 6px;
//   text-align: center;
//   font-size: 30px;
//   cursor: pointer;
// }
</style>
