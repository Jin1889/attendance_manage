<template>
  <el-select v-model="employee" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.username + '-' + item.real_name + '-' + item.department_name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  created() {
    this.getEmployee();
  },
  data() {
    return {
      options: [],
    };
  },
  methods: {
    ...mapMutations(["SET_ATTENDANCE_STATE", "SET_EMPLOYEE_ID"]),
    async getEmployee() {
      const { data: res } = await this.$http.get("attendance/employee");
      if (res.status !== 200) return alert("获取数据失败");
      this.options = res.data;
    },
  },
  computed: {
    ...mapState(["attendanceState", "employeeId"]),
    state: {
      get() {
        return this.attendanceState;
      },
      set(val) {
        this.SET_ATTENDANCE_STATE(val);
      },
    },
    employee: {
      get() {
        return this.employeeId;
      },
      set(val) {
        this.SET_EMPLOYEE_ID(val);
      },
    },
  },
};
</script>

<style>
</style>