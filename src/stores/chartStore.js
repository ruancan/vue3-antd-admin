import { defineStore } from 'pinia'

export const chartUseStore = defineStore('chartStore', {
  state: () => {
    return {
      option: {
        title: { text: '试算性能' },
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
      }
    }
  }
})
