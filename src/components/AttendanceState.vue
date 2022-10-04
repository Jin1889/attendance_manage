<template>
  <el-select v-model="state" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.attendance_state"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  created() {
    this.getAttendanceState();
  },
  data() {
    return {
      options: [],
    };
  },
  methods: {
    ...mapMutations(["SET_ATTENDANCE_STATE"]),
    async getAttendanceState() {
      const { data: res } = await this.$http.get(
        "attendance/system/attendanceState"
      );
      if (res.status !== 200) return alert("获取数据失败");
      this.options = res.data;
    },
  },
  computed: {
    ...mapState(["attendanceState"]),
    state: {
      get() {
        return this.attendanceState;
      },
      set(val) {
        this.SET_ATTENDANCE_STATE(val);
      },
    },
  },
};
</script>

<style>
</style>