<template>
  <div>
    <Table :url="url" :labels="labels"></Table>
    <Pagination></Pagination>
  </div>
</template>

<script>
import Table from '../../components/Table.vue'
import Pagination from '../../components/Pagination.vue'

export default {
  components: {
      Table,
      Pagination,
  },
  data() {
      return {
          url: 'attendance/attendance',
          labels: ['id', '用户名', '姓名', '部门', '考勤日期', '上班时间', '下班时间', '当前考勤状态']
      }
  },
};
</script>

<style>
</style>