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
    redirect: '/home',
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        componentName: 'HomeView',
        keepAlive: true
      }
    }]
  },
  {
    path: '/chart',
    name: '报表',
    component: LayoutView,
    children: [{
      path: 'chart1',
      name: '试算性能',
      component: () => import('@/views/ChartView1.vue'),
      meta: {
        componentName: 'ChartView1',
        keepAlive: true
      }
    }, {
      path: 'chart2',
      name: '预占性能',
      component: () => import('@/views/ChartView2.vue'),
      meta: {
        componentName: 'ChartView2',
        keepAlive: true
      }
    }, {
      path: 'chart3',
      name: '实占性能',
      children: [{
        path: 'chart31',
        name: '实占性能冒烟',
        component: () => import('@/views/ChartView31.vue'),
        meta: {
          componentName: 'ChartView31',
          keepAlive: true
        }
      },
      {
        path: 'chart32',
        name: '实占性能压测',
        component: () => import('@/views/ChartView32.vue'),
        meta: {
          componentName: 'ChartView32',
          keepAlive: true
        }
      }]
    }]
  },
  {
    path: '/blank',
    name: 'blank',
    component: LayoutView,
    children: [{
      path: 'blank',
      name: '空白页',
      component: () => import('@/views/BlankView.vue'),
      meta: {
        componentName: 'BlankView',
        keepAlive: false
      }
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
