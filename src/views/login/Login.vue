<template>
  <div class="login_box">
    <div class="login_img">
      <img src="../../assets/image/login.png" alt="" />
    </div>
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="auto"
      label-position="top"
      ref="loginFormRef"
      class="login_form"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          type="text"
          v-model="loginForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="submit">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- 验证码 -->
    <vcode :show="isShow" @success="success" @close="close" />
  </div>
</template>

<script>
import vcode from "vue-puzzle-vcode";
export default {
  data() {
    return {
      // 登录表单的数据绑定
      loginForm: {
        userName: "",
        password: "",
      },
      // 表单的验证规则
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6-12个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6-12个字符", trigger: "blur" },
        ],
      },
      // 验证码模态框
      isShow: false,
    };
  },
  components: {
    vcode,
  },
  methods: {
    submit() {
      this.isShow = true;
    },
    // 用户通过了验证
    success(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less">
body {
  background-color: #4169e1;
}
.login_box {
  width: 45rem;
  height: 27.5rem;
  border-radius: 5px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;

  .login_img {
    width: 50%;
    height: 100%;
    background-color: #f4f9fd;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      box-sizing: border-box;
      padding: 0 1rem;
    }
  }

  .login_form {
    width: 50%;

    .el-form-item {
      margin: 1rem 1rem;

      .el-button {
        float: right;
      }
    }
  }
}
</style>