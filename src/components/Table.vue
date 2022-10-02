<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column label="#" type="index"></el-table-column>
    <template v-for="(val, key, index) in tableData[0]">
      <el-table-column
        v-if="key !== 'id'"
        :prop="key"
        :label="labels[index]"
        :key="key"
      ></el-table-column>
    </template>
    <el-table-column prop="options" label="操作">
      <template v-slot="scope">
        <el-button type="primary" size="mini" @click="update(scope.row.id)"
          >修改</el-button
        >
        <el-button type="danger" size="mini" @click="update(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
		mapState,
		mapMutations
	} from 'vuex'

export default {
  props: ["url","labels"],
  data() {
    return {
      tableLable: [],
      // tableData: [],
      isShow: false,
    };
  },
  created() {
    this.getTableList()
  },
  computed: {
    ...mapState('department', ['tableData']),
  },
  methods: {
    ...mapMutations('department', ['SET_TABLE_DATA']),
    // 获取所有的菜单
    async getTableList() {
      const { data: res } = await this.$http.get(this.url);
      if (res.status !== 200) return alert("error");
      this.tableLable = res.label
      this.SET_TABLE_DATA(res.data)
      // this.tableData = res.data;
      //   console.log(res);
    },
    update(id) {
      console.log(id);
    },
  },
};
</script>

<style>
</style>