<template>
  <div><a-button @click="click">添加</a-button></div>
<div class="chart" id="chart" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

import { chartUseStore } from '@/stores/chartStore.js'
const chartStore = chartUseStore()

onMounted(() => {
  const chart = echarts.init(document.getElementById('chart'))
  chart.setOption(chartStore.option)
})
const click = () => {
  const length = chartStore.option.xAxis.data.length
  chartStore.option.xAxis.data.push(`${length * 5 + 5}并发`)
  chartStore.option.series[0].data.push((Math.random() * 10) + 10)
}
</script>

<style scoped>

</style>
