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
          url: 'attendance/department',
          labels: ['id', '部门名称']
      }
  },
};
</script>

<style>
</style>