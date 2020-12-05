<template>
  <div style="width:258px;margin:42px auto;">
    <div class="pctitle">
      欢迎使用<span style="color:#E73423;">商城管理系统</span>
    </div>
    <div class="pcdesc">翼装科技—专注提供建材电商一站式解决方案</div>
    <el-form
      class="login-form"
      status-icon
      :rules="loginRules"
      ref="loginForm"
      :model="loginForm"
      label-width="0"
    >
      <el-form-item prop="username">
        <el-input
          size="small"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.username"
          placeholder="请输入账号"
        >
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="small"
          @keyup.enter.native="handleLogin"
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
        >
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
          <i slot="prefix" class="icon-mima"></i>
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
        <el-row :span="24">
          <el-col :span="16">
            <el-input size="small"
                      @keyup.enter.native="handleLogin"
                      :maxlength="code.len"
                      v-model="loginForm.code"
                      placeholder="请输入验证码">
              <i slot="prefix"
                 class="icon-yanzhengma"></i>
            </el-input>
          </el-col>
          <el-col :span="8">
            <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
              <img :src="code.src"
                   class="login-code-img"
                   @click="refreshCode"
                   v-else/>
            </div>
          </el-col>
        </el-row>

      </el-form-item>-->
      <el-checkbox v-model="checked">记住账号</el-checkbox>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click.native.prevent="handleLogin"
          class="login-submit"
        >登录</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row style="margin-bottom: 20px">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>【公众号+小程序商城版】演示账号</span>
          </div>
          <div class="text item">
            账号：test；密码：123456
          </div>
          <div class="el-timeline-item__timestamp is-bottom">
            test账号属于一个租户，能看到【公众号+小程序商城版】所有功能
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>【公众号版】演示账号</span>
          </div>
          <div class="text item">
            账号：test2；密码：123456
          </div>
          <div class="el-timeline-item__timestamp is-bottom">
            test2账号属于一个租户，能看到【公众号版】所有功能
          </div>
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import { randomLenNum } from "@/util/util";
import { mapGetters } from "vuex";

export default {
  name: "userlogin",
  data() {
    return {
      thirdPartyForm: {
        code: "",
        state: ""
      },
      loginForm: {
        username: "",
        password: "",
        code: "",
        redomStr: ""
      },
      checked: false,
      code: {
        src: "/code",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ]
        // code: [
        //   {required: true, message: "请输入验证码", trigger: "blur"},
        //   {min: 4, max: 4, message: "验证码长度为4位", trigger: "blur"}
        // ]
      },
      passwordType: "password"
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    refreshCode() {
      this.loginForm.code = "";
      this.loginForm.randomStr = randomLenNum(this.code.len, true);
      this.code.type === "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${window.location.origin}/code?randomStr=${this.loginForm.randomStr}`);
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.$store.commit("SET_TOP_MENU_INDEX", 0);
              this.$router.go(0);
              this.$router.push({ path: this.tagWel.value });
            })
            .catch(() => {
              this.refreshCode();
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pctitle {
  width: 100%;
  height: 32px;
  font-size: 23px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 32px;
  text-align: left;
  margin-bottom: 20px;
}
.pcdesc {
  width: 100%;
  height: 16px;
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 16px;
  text-align: left;
  margin-bottom: 56px;
}
.el-button--primary {
  height: 40px !important;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(245, 100, 73, 1) 0%,
    rgba(231, 52, 35, 1) 100%
  ) !important;
  border-radius: 4px !important;
  font-size: 17px !important;
  font-weight: 500;
}
.el-input input{
  padding-bottom: 0 !important;
}
</style>
