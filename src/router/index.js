import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test'
import TestExampleTable from '../components/Test/TestExampleTable'
import TestReport from '../views/TestReport'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Test',
    name: 'Test',
    component: Test,
    children: [
      {
        path: ':id',
        component: TestExampleTable
      }
    ]
  },
  {
    path: '/TestReport',
    name: 'TestReport',
    component: TestReport
  }
]

const router = new VueRouter({
  routes
})

export default router
