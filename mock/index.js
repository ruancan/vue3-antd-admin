export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        msg: 'success',
        cookie: 'asdasdasfdsfdsf'
      }
    }
  }, {
    url: '/api/user/info',
    method: 'post',
    response: () => {
      const numb = Math.floor((Math.random() * 100) + 1)
      if (numb % 10 !== 0) {
        return {
          code: 20000,
          msg: 'success',
          menuList: [{
            key: 'home',
            title: 'home'
          },
          //   {
          //   key: '2',
          //   title: 'Navigation 2',
          //   children: [{
          //     key: '2.1',
          //     title: 'Navigation 2.1',
          //     children: [{
          //       key: '2.1.1',
          //       title: 'Option 2.1.1'
          //     },
          //     {
          //       key: '2.1.2',
          //       title: 'Option 2.1.2'
          //     }]
          //   },
          //   {
          //     key: '2.2',
          //     title: 'Navigation 2.2',
          //     children: [{
          //       key: '2.2.1',
          //       title: 'Option 2.2.1'
          //     },
          //     {
          //       key: '2.2.2',
          //       title: 'Option 2.2.2'
          //     }]
          //   }]
          // },
          // {
          //   key: '3',
          //   title: 'Navigation 3',
          //   children: [{
          //     key: '3.1',
          //     title: 'Navigation 3.1'
          //   },
          //   {
          //     key: '3.2',
          //     title: 'Navigation 3.2'
          //   }]
          // },
          {
            key: 'example',
            title: 'chart'
          }],
          userInfo: 'ruanbb'
        }
      } else {
        return {
          code: 50000,
          msg: 'fail'
        }
      }
    }
  },
  {
    url: '/api/chart',
    method: 'post',
    response: () => {
      return {
        title: { text: '债券库限额性能' },
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

]
