<template>
  <el-container class="index">
    <el-header style="height: 3rem">
      <div>
        <span>后台管理系统</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="container">
      <el-aside width="200px">
        <el-menu unique-opened router>
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
      // console.log(res.data);
    },
  },
};
</script>

<style lang="less" scoped>
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
.index {
  height: 100%;
  .container {
    .el-aside {
      background-color: #eef1f6;
    }
  }
}
</style>