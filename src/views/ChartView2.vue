<template>
  <div class="chart" id="chart" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import * as echarts from 'echarts'

import { chartUseStore } from '@/stores/chartStore.js'
const chartStore = chartUseStore()

let chart
onMounted(() => {
  chart = echarts.init(document.getElementById('chart'))
  chart.setOption(chartStore.option)
})

watch(chartStore.option, (o, n) => {
  chart.setOption(chartStore.option)
})

</script>

<style scoped>

</style>
