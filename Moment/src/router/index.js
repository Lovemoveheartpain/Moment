import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    components:{
      default:() => import('../views/Home.vue'),
      bar:() => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/course',
    name: 'course',
    components:{
      default:() => import('../views/Course.vue'),
      bar:() => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/record',
    name: 'record',
    components:{
      default:() => import('../views/Record.vue'),
      bar:() => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/practice',
    name: 'practice',
    components:{
      default:() => import('../views/Practice.vue'),
      bar:() => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/oto',
    name: 'oto',
    component: () => import('../views/Oto.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
