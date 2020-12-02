import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test'
import TestExampleTable from '../components/Test/TestExampleTable'
import TestReport from '../views/TestReport'
import Process from '../views/Process'
import DataCount from '../views/DataCount'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    children: [
      {
        path: '',
        component: TestExampleTable
      }
    ]
  },
  {
    path: '/testReport',
    name: 'TestReport',
    component: TestReport
  },
  {
    path: '/Process',
    name: 'Process',
    component: Process
  },
  {
    path: '/dataCount',
    name: 'dataCount',
    component: DataCount
  }
]

const router = new VueRouter({
  base: '/dist',
  mode: 'hash',
  routes
})

export default router
