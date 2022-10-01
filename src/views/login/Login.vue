<template>
  <div class="login">
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
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
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
        <el-form-item class="btns">
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 验证码 -->
      <vcode :show="isShow" @success="success" @close="close" />
    </div>
  </div>
</template>

<script>
import vcode from "vue-puzzle-vcode";
export default {
  data() {
    return {
      // 登录表单的数据绑定
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在5-12个字符", trigger: "blur" },
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
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        this.isShow = true;
      });
    },
    // 用户通过了验证
    success(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.login();
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登录按钮
    async login() {
      const { data: res } = await this.$http.post("api/login", this.loginForm);
      console.log(res);
      if (res.status != 200) return alert(res.message);
      // this.$message.success("登录成功")
      // 1.将登录成功之后的token,保存到客户端的 sessionStorage 中
      //   1.1 项目中除了登录之外的其他API接口,必须在登录之后才能访问
      //   1.2 token 只应在当前网站打开期间生效,所以将token保存在sessionStorage中
      // window.sessionStorage.setItem("token", res.data.token)
      // 2.通过编程式导航跳转到后台主页,路由地址是 /home
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
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
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>