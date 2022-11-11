import LoginView from '@/views/LoginView.vue'
import LayoutView from '@/components/LayoutView.vue'

const defaultConfig = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'main',
    component: LayoutView,
    children: [{
      path: '/',
      name: '首页',
      component: () => import('@/views/HomeView.vue')
    }]
  },
  {
    path: '/chart',
    name: '报表',
    component: LayoutView,
    children: [{
      path: 'chart1',
      name: '试算性能',
      component: () => import('@/views/ChartView1.vue')
    }, {
      path: 'chart2',
      name: '预占性能',
      component: () => import('@/views/ChartView2.vue')
    }, {
      path: 'chart3',
      name: '实占性能',
      component: () => import('@/views/ChartView3.vue')
    }]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
]
export default defaultConfig
