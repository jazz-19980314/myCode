<template>
  <el-badge :value="page.total+noticeTotal" class="item">
    <el-popover placement="bottom" width="350" trigger="click">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label="邮件(1)"
                   name="first"></el-tab-pane> -->
        <el-tab-pane
          :label="'消息(' + page.total + ')'"
          name="second"
        ></el-tab-pane>
        <el-tab-pane
          :label="'通知公告(' + noticeTotal + ')'"
          name="third"
        ></el-tab-pane>
      </el-tabs>
      <el-scrollbar style="height: 300px">
        <avue-notice
          :data="data"
          :option="option"
          @page-change="pageChange"
          @click="handelRead"
        ></avue-notice>
      </el-scrollbar>
      <div slot="reference">
        <el-badge is-dot>
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>
      <el-dialog
        title="通知"
        :visible.sync="dialogVisible"
        width="30%"
        :append-to-body="true"
        :center="true"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <span>{{ content ? content.title : "暂无" }}</span>
        <div>{{ content ? content.content : "" }}</div>
        <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelSure"
          >确 定</el-button
        >
      </span> -->
      </el-dialog>
    </el-popover>
  </el-badge>
</template>

<script>
// let list = [
//   {
//     img: "/img/bg/vip1.png",
//     title: "史蒂夫·乔布斯 关注了你",
//     subtitle: "05-08 15:08",
//     tag: "已经开始",
//     status: 0,
//   }
// ];
import { getList, update, getNoticeList } from "@/api/crm/message";
// import {getList, remove, update, add, getNotice} from "@/api/desk/notice";
export default {
  name: "top-notice",
  data() {
    return {
      activeName: "second",
      page: {
        pageSize: 5,
        currentPage: 1,
        total: 0,
      },
      dialogVisible: false,
      option: {
        props: {
          img: "img",
          title: "title",
          subtitle: "subtitle",
          tag: "tag",
          status: "status",
        },
      },
      data: [],
      isLoading: true,
      content: null,
      noticeTotal: null,
    };
  },
  created() {},
  mounted() {
    this.onLoad(this.page);
    this.getNotice(this.page);
  },
  methods: {
    pageChange(page, done) {
      this.page.currentPage = page;
      if (this.isLoading) {
        this.onLoad(this.page);
      } else {
        this.$message.error("暂无更多消息！");
      }
      done();
    },
    handelRead(data) {
      this.dialogVisible = true;
      this.content = data;
      var time2 = new Date();
      var row = {
        id: data.id,
        readTime: time2,
        isRead: 1,
      };
      if (data.status == 0) {
        update(row).then((res) => {
          if (res.data.success) {
            this.$message.success("消息已读");
            this.data = [];
            this.onLoad({
              pageSize: 5,
              currentPage: 1,
            });
          }
        });
      }
    },
    handleClick(tab) {
      this.data = [];
      if (tab.name == "third") {
        getNoticeList(this.page.currentPage, this.page.pageSize).then((res) => {
          let data = res.data.data.records;
          let list = [...this.data, ...data];
          this.data = list.map((item) => {
            return {
              img: "/img/bg/vip4.png",
              title: item.title,
              subtitle: item.createTime,
              status: item.status,
              content: item.content,
              tag: item.category == "6" ? "事务通知" : "转发通知",
            };
          });
        });
      } else {
        this.data = [];
        this.onLoad(this.page);
      }
    },
    onLoad(page) {
      getList(page.currentPage, page.pageSize, { isRead: 0 }).then((res) => {
        let data = res.data.data.records;
        let list = [...this.data, ...data];
        this.data = list.map((item) => {
          return {
            img: "/img/bg/vip4.png",
            title: item.content,
            subtitle: item.sendTime,
            status: item.isRead,
            tag: item.isRead == "0" ? "未读" : "已读",
            readTime: item.readTime,
            id: item.id,
          };
        });
        this.page.total = res.data.data.total;
        if (data.length < page.pageSize) {
          this.isLoading = false;
        }
      });
    },
    getNotice(page) {
      getNoticeList(page.currentPage, page.pageSize).then((res) => {
        this.noticeTotal = res.data.data.total;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
