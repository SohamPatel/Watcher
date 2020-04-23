import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import MyList from '../components/MyList.vue'
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'MyList',
    component: MyList,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production'
    ? '/Watcher/'
    : '/', 
  mode: 'history',
  routes
})

export default router
