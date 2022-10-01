<template>
  <Table :url="url"></Table>
</template>

<script>
import Table from '../../components/Table.vue'

export default {
  components: {
      Table,
  },
  data() {
      return {
          url: 'attendance/attendance'
      }
  },
};
</script>

<style>
</style>