<template>
  <div class="login-container pull-height">
    <div class="login-weaper">
      <div class="login-left animated">
        <img src="../../../public/img/login/2-logo@1x.png" alt style="width:100%;height:50px;" />
        <img
          src="../../../public/img/login/3-@1x.png"
          alt
          style="width:100%;height:85px;margin-top:36px;"
        />
        <div class="desc">
          翼装科技是一家以AI驱动产业数字化的新型科技公司 通过科学技术来服务建筑建材与实体产业 助力相关产业实现互联网化、数字化和智能化
        </div>
      </div>
      <div class="login-border animated fadeInRight">
        <div class="login-main">
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
          <register v-else-if="activeName==='register'"></register>
        </div>
        <div class="login-menu">
          <!-- <a href="#" @click.stop="activeName='user'">账号登录</a>
          <a href="#" @click.stop="activeName='code'">手机号登录</a>
          <a href="#" @click.stop="activeName='third'">第三方登录</a> -->
          <!--            <a href="#"-->
          <!--               @click.stop="activeName='register'">免费注册</a>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import register from "./register";
import { mapGetters } from "vuex";
import { getStore, setStore } from "@/util/store";
import { dateFormat } from "@/util/date";
import { validatenull } from "@/util/validate";
import topColor from "@/page/index/top/top-color";

export default {
  name: "login",
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    register,
    topColor
  },
  data() {
    return {
      time: "",
      activeName: this.$route.meta.activeName,
      thirdPartyForm: {}
    };
  },
  watch: {
    $route: {
      handler() {
        const params = this.$route.query;
        if (validatenull(params.state) && validatenull(params.code)) return;

        this.thirdPartyForm.state = params.state;
        this.thirdPartyForm.code = params.code;
        this.$store
          .dispatch("LoginByThirdParty", this.thirdPartyForm)
          .then(() => {
            this.$store.commit("SET_TOP_MENU_INDEX", 0);
            this.$router.push({ path: this.tagWel.value });
          })
          .catch(() => {});
      },
      immediate: true
    }
  },
  created() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  mounted() {},
  computed: {
    ...mapGetters(["website", "tagWel"])
  },
  props: [],
  methods: {
    getTime() {
      this.time = dateFormat(new Date());
    }
  }
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  margin: 0 auto;
  height: 100%;
}
.login-weaper {
  position: absolute;
  // top: 50%;
  left: 0;
  width: 100%;
  height: 500px;
  margin-top: -200px;
}
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("/img/login/login.png");
  background-size: cover;
  background-position: center center;
}
.login-left {
  width: 16%;
  // height: 330px;
  position: fixed;
  top: 20%;
  left: 20%;
  // border: 1px solid #000;
  .desc {
    width: 261px;
    height: 68px;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 23px;
    margin-top: 22px;
  }
}
.login-logo {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 150px;
  font-size: 24px;
  color: #333;
  margin-left: 120px;
}
.login-info {
  padding-left: 140px;
}
.login-info-title {
  line-height: 90px;
  color: rgb(52, 58, 64);
}
.login-info-item {
  font-size: 14px;
  line-height: 2.5;
  color: rgb(33, 37, 41);
}
.login-border {
  width: 30%;
  // height: 330px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 9px 30px 14px rgba(231, 52, 35, 0.1);
  border-radius: 7px;
  box-sizing: border-box;
  position: fixed;
  top: 20%;
  right: 20%;
}
.login-main {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}
.login-menu {
  width: 100%;
  text-align: center;
  a {
    color: rgb(153, 153, 153);
    font-size: 12px;
    margin: 0px 8px;
  }
}
.login-index {
  margin-top: 40px !important;
  width: 180px;
  height: 48px;
  text-align: center;
  border-radius: 50px !important;
  background: transparent !important;
  color: #333 !important;
  font-size: 16px !important;
  border: 1px solid rgb(152, 22, 244);
}
.login-submit {
  display: block !important;
  margin: 40px auto 10px auto !important;
  width: 200px;
  height: 48px;
  font-size: 14px !important;
  text-align: center;
  border-radius: 50px !important;
  border: 0px;
  box-shadow: rgba(152, 22, 244, 0.19) 0px 5px 10px 2px;
}
.login-form {
  margin: 10px 0;
  i {
    color: #999;
  }
  .el-form-item__content {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      // padding-bottom: 10px;
      text-indent: 5px;
      background: transparent;
      border: none;
      border-radius: 0;
      color: #333;
      border-bottom: 1px solid rgb(235, 237, 242);
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
}
.login-select {
  input {
    color: #333;
    font-size: 18px;
    font-weight: 400;
    border: none;
    text-align: center;
  }
}
</style>

