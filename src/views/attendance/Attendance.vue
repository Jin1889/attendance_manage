<template>
  <div>
    <el-button
      class="add"
      type="primary"
      size="small"
      plain
      @click="addAttendance"
      >添加</el-button
    >
    <!-- 表格数据 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="real_name" label="姓名"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="start_time" label="上班时间"></el-table-column>
      <el-table-column prop="end_time" label="下班时间"></el-table-column>
      <el-table-column
        prop="attendance_state"
        label="考勤状态"
      ></el-table-column>
      <el-table-column prop="options" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="updateAttendance(scope.row.id)"
            >修改</el-button
          >
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="是否确定删除"
            @confirm="deleteAttendance(scope.row.id)"
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
    <el-dialog title="收货地址" :visible.sync="dialogVisible" modal close="closeMethod">
      <el-form :model="attendanceForm" ref="attendanceFormRef">
        <el-form-item v-if="isAdd" label="员工" :label-width="formLabelWidth">
          <Employee></Employee>
        </el-form-item>
        <el-form-item prop="date" label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="attendanceForm.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上下班时间" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-time-picker
              placeholder="选择上班时间"
              v-model="attendanceForm.start_time"
            ></el-time-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择下班时间"
              v-model="attendanceForm.end_time"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="考勤状态" :label-width="formLabelWidth">
          <AttendanceState></AttendanceState>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAttendance()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AttendanceState from "../../components/AttendanceState.vue";
import Employee from "../../components/Employee.vue";
import dayjs from "../../plugins/format";
export default {
  components: {
    AttendanceState,
    Employee,
  },
  created() {
    this.getTableList();
  },
  data() {
    return {
      tableData: [],
      url: "attendance/attendance",
      formLabelWidth: "6rem",
      currentPage: 1,
      pageSizes: [10, 15, 20],
      pageSize: 10,
      total: 0,
      attendanceForm: {
        date: "",
        start_time: "",
        end_time: "",
        attendance_state: "",
      },
      dialogVisible: false,
      deleteVisible: false,
      isAdd: false,
    };
  },
  methods: {
    ...mapMutations(["SET_ATTENDANCE_STATE", "SET_EMPLOYEE_ID"]),
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
    async addAttendance() {
      this.dialogVisible = true;
      this.isAdd = true;
      this.$nextTick(() => {
        this.$refs.attendanceFormRef.resetFields();
      });
      this.attendanceForm.start_time = ''
      this.attendanceForm.end_time = ''
      this.SET_ATTENDANCE_STATE(1)
      this.SET_EMPLOYEE_ID(1)
    },
    async updateAttendance(updateId) {
      this.dialogVisible = true;
      this.isAdd = false;
      const { data: res } = await this.$http.get(this.url + "/" + updateId);
      if (res.status !== 200) return alert("获取该条数据失败");
      this.attendanceForm = res.data;
      this.SET_ATTENDANCE_STATE(this.attendanceForm.attendanceState_id);
    },
    async saveAttendance() {
      this.attendanceForm.attendanceState_id = this.attendanceState;
      this.attendanceForm.date = dayjs.dateFormat(this.attendanceForm.date);
      this.attendanceForm.start_time = dayjs.timeFormat(
        this.attendanceForm.start_time
      );
      this.attendanceForm.end_time = dayjs.timeFormat(
        this.attendanceForm.end_time
      );
      delete this.attendanceForm.username;
      delete this.attendanceForm.real_name;
      delete this.attendanceForm.department_name;
      delete this.attendanceForm.attendance_state;
      if (this.isAdd === false) {
        const { data: res } = await this.$http.put(
          this.url + "/" + this.attendanceForm.id,
          this.attendanceForm
        );
        if (res.status !== 200) return alert("更新失败");
      } else {
        this.attendanceForm.employee_id = this.employeeId
        const { data: res } = await this.$http.post(
          this.url,
          this.attendanceForm
        );
        if (res.status !== 200) return alert("添加失败");
      }
      this.dialogVisible = false;
      this.getTableList();
    },
    async deleteAttendance(id) {
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
  computed: {
    ...mapState(["attendanceState", "employeeId"]),
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