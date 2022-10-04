<template>
  <div class="index_box">
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.echartsInit();
  },
  data() {
    return {
      echartData: [],
    };
  },
  methods: {
    async echartsInit() {
      const { data: res } = await this.$http.get("attendance/system/chart");
      if (res.status !== 200) return alert("获取该条数据失败");
      this.echartData = res.data;

      let myChart = this.$echarts.init(document.getElementById("main"));

      let option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "部门人数分布图",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [...this.echartData],
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.index_box {
  display: flex;
  justify-content: center;
  align-content: center;

  #main {
    width: 800px;
    height: 600px;
  }
}
</style>