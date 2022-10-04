<template>
  <el-container class="index">
    <el-aside width="200px">
      <el-menu
        unique-opened
        router
        text-color="#ffffff"
        background-color="#304156"
      >
        <template v-for="menu in menuList">
          <el-menu-item v-if="menu.path" :key="menu.id" :index="menu.path">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </template>
          </el-menu-item>

          <el-submenu v-else :key="menu.id" :index="menu.id + ''">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item
              :index="subMenu.path"
              v-for="subMenu in menu.children"
              :key="subMenu.id"
            >
              <template slot="title">
                <span>{{ subMenu.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="container">
      <el-header style="height: 3rem">
        <div>
          <span>后台管理系统</span>
        </div>
        <el-dropdown @command="logout">
          <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main
        ><!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      exit: "exit",
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("/attendance/system/menu");
      if (res.status !== 200) return alert("error");
      this.menuList = res.data;
    },
    logout(text) {
      if (text === this.exit) {
        // window.sessionStorage.removeItem("token");
        window.sessionStorage.clear();
        // this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  .el-aside {
    .el-menu {
      height: 100%;
    }
  }
}

.el-header {
  height: 1rem;
  padding: 0 1rem;
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;

  .el-dropdown {
    margin-right: 2rem;
    font-size: 1rem;

    .el-dropdown-link {
      cursor: pointer;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>