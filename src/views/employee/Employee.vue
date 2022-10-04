<template>
  <div>
    <el-button
      class="add"
      type="primary"
      size="small"
      plain
      @click="addEmployee"
      >添加</el-button
    >
    <!-- 表格数据 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        prop="real_name"
        label="姓名"
        width="100"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="gender" label="性别" width="100"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="entry_time" label="入职时间"></el-table-column>
      <el-table-column
        prop="department_name"
        label="部门名称"
      ></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="options" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="updateEmployee(scope.row.id)"
            >修改</el-button
          >
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="是否确定删除"
            @confirm="deleteEmployee(scope.row.id)"
          >
            <!-- <el-button slot="reference">删除</el-button> -->
            <el-button class="delete" type="danger" size="mini" slot="reference"
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
    <el-dialog
      title="收货地址"
      :visible.sync="dialogVisible"
      modal
      top="1.5rem"
    >
      <el-form :model="employeeForm" ref="employeeFormRef" width="100">
        <el-form-item
          prop="username"
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="employeeForm.username"
            autocomplete="off"
            :disabled="!isAdd"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
          v-show="isAdd"
        >
          <el-input
            type="password"
            v-model="employeeForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="real_name"
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="employeeForm.real_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
          <el-radio v-model="employeeForm.gender" :label="1">男</el-radio>
          <el-radio v-model="employeeForm.gender" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item prop="age" label="年龄" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="employeeForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话" :label-width="formLabelWidth">
          <el-input v-model="employeeForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="entry_time"
          label="入职时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="employeeForm.entry_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="department_id"
          label="部门"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="employeeForm.department_id"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.department_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
          <el-select
            v-model="employeeForm.role_id"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEmployee()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "../../plugins/format";
export default {
  created() {
    this.getTableList();
    this.getOptions();
  },
  data() {
    return {
      tableData: [],
      url: "attendance/employee",
      formLabelWidth: "6rem",
      currentPage: 1,
      pageSizes: [10, 15, 20],
      pageSize: 10,
      total: 0,
      employeeForm: {
        username: "",
        password: "",
        real_name: "",
        gender: 0,
        age: "",
        tel: "",
        entry_time: "",
        department_id: "",
        role_id: "",
      },
      dialogVisible: false,
      deleteVisible: false,
      isAdd: false,
      departments: [],
      roles: [],
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
    async addEmployee() {
      this.dialogVisible = true;
      this.isAdd = true;
      this.$nextTick(() => {
        this.$refs.employeeFormRef.resetFields();
      });
    },
    async updateEmployee(updateId) {
      this.dialogVisible = true;
      this.isAdd = false;
      const { data: res } = await this.$http.get(this.url + "/" + updateId);
      if (res.status !== 200) return alert("获取该条数据失败");
      this.employeeForm = res.data;
    },
    async saveEmployee() {
      this.employeeForm.entry_time = dayjs.dateFormat(
        this.employeeForm.entry_time
      );
      if (this.isAdd === false) {
        const { data: res } = await this.$http.put(
          this.url + "/" + this.employeeForm.id,
          this.employeeForm
        );
        if (res.status !== 200) return alert("更新失败");
      } else {
        const { data: res } = await this.$http.post(
          this.url,
          this.employeeForm
        );
        if (res.status !== 200) return alert("添加失败");
      }
      this.dialogVisible = false;
      this.getTableList();
    },
    async deleteEmployee(id) {
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
    async getOptions() {
      const { data: result } = await this.$http.get("attendance/department");
      if (result.status !== 200) return alert("获取部门数据失败");
      this.departments = result.data;
      const { data: roleres } = await this.$http.get("attendance/role");
      if (roleres.status !== 200) return alert("获取部门数据失败");
      this.roles = roleres.data;
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  margin-bottom: 0.5rem;
}
.delete {
  margin-left: 0.5rem;
}
</style>