<template>
  <div>
    <el-button class="add" type="primary" size="small" plain @click="addDepartment"
      >添加</el-button
    >
    <!-- 表格数据 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        prop="department_name"
        label="部门名称"
      ></el-table-column>
      <el-table-column prop="options" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="updateDepartment(scope.row.id)"
            >修改</el-button
          >
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="是否确定删除"
            @confirm="deleteDepartment(scope.row.id)"
          >
            <!-- <el-button slot="reference">删除</el-button> -->
            <el-button
            class="delete"
              type="danger"
              size="mini"
              slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <!-- 添加或修改 -->
    <el-dialog title="收货地址" :visible.sync="dialogVisible" modal>
      <el-form :model="departmentForm" ref="departmentFormRef">
        <el-form-item
          prop="department_name"
          label="部门"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="departmentForm.department_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDepartment()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getTableList();
  },
  data() {
    return {
      tableData: [],
      url: "attendance/department",
      formLabelWidth: "6rem",
      currentPage: 1,
      pageSizes: [10, 15, 20],
      pageSize: 10,
      total: 0,
      departmentForm: {
        department_name: "",
      },
      dialogVisible: false,
      deleteVisible: false,
      isAdd: false,
    };
  },
  methods: {
    async getTableList() {
      const { data: res } = await this.$http.get(this.url);
      if (res.status !== 200) return alert("获取数据失败");
      this.tableData = res.data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.total = res.data.length;
      this.tableLable = res.label;
    },
    async addDepartment() {
      this.dialogVisible = true;
      this.isAdd = true;
      this.$nextTick(() => {
        this.$refs.departmentFormRef.resetFields();
      });
    },
    async updateDepartment(updateId) {
      this.dialogVisible = true;
      this.isAdd = false;
      const { data: res } = await this.$http.get(this.url + "/" + updateId);
      if (res.status !== 200) return alert("获取该条数据失败");
      this.departmentForm = res.data;
    },
    async saveDepartment() {
      if (this.isAdd === false) {
        const { data: res } = await this.$http.put(
          this.url + "/" + this.departmentForm.id,
          this.departmentForm
        );
        if (res.status !== 200) return alert("更新失败");
      } else {
        const { data: res } = await this.$http.post(
          this.url,
          this.departmentForm
        );
        if (res.status !== 200) return alert("添加失败");
      }
      this.dialogVisible = false;
      this.getTableList();
    },
    async deleteDepartment(id) {
      const { data: res } = await this.$http.delete(this.url + "/" + id);
      if (res.status !== 200) return alert("删除失败");
      this.deleteVisible = false;
      this.getTableList();
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableList();
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  margin-bottom: 0.5rem;
}
.delete{
  margin-left: 0.5rem;
}
</style>