<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      pageSizes: [10, 15, 20],
    };
  },
  computed: {
    ...mapState("department", ["currentPage", "pageSize", "total", "tableAllData"]),
  },
  methods: {
    ...mapMutations("department", ["SET_PAGESIZE", "SET_CURRENTPAGE", "SET_TABLE_DATA"]),
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.SET_PAGESIZE(val);
      this.SET_TABLE_DATA(this.tableAllData)
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.SET_CURRENTPAGE(val);
      this.SET_TABLE_DATA(this.tableAllData)
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 1rem;
}
</style>