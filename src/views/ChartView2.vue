<template>
<div class="chart" id="chart" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  const chart = echarts.init(document.getElementById('chart'))
  chart.setOption({
    title: { text: '预占性能' },
    tooltip: {},
    legend: {
      data: ['事中平均值', '目前平均值']
    },
    xAxis: {
      data: ['5并发', '10并发', '15并发']
    },
    yAxis: {},
    series: [{
      name: '事中平均值',
      type: 'line',
      stack: 'Total',
      data: [3.958, 5.885, 10.334]
    }, {
      name: '目前平均值',
      type: 'line',
      stack: 'Total',
      data: [1.263, 1.045, 1.923]
    }]
  })
})
</script>

<style scoped>

</style>
