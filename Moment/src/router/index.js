import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    components: {
      default: () => import('../views/Home.vue'),
      bar: () => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/course',
    name: 'course',
    components: {
      default: () => import('../views/Course.vue'),
      bar: () => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/course_details/:id',
    name: 'course_details',
    component: () => import('../components/course/CourseDetails.vue'),
  },
  {
    path: '/record',
    name: 'record',
    components: {
      default: () => import('../views/Record.vue'),
      bar: () => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/practice',
    name: 'practice',
    components: {
      default: () => import('../views/Practice.vue'),
      bar: () => import('../common/NavigationBar.vue')
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
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
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/Teacher.vue')
  },
  {
    path: '/oto_plan',
    name: 'oto_plan',
    component: () => import('../views/Oto_plan.vue')
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('../views/Vip.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


router.beforeEach((to, from, next) => {
  let id = window.localStorage.getItem('user_id');
  let token = window.localStorage.getItem('adminToken');
  let flag = token != null && id != null
  if (flag) {
    if (navigator.userAgent.indexOf("MSIE") > -1) {
      alert('当前组件不兼容IE10以下浏览器')
    } else {
      next()
    } //判断是否IE浏览器
  } else {
    if (to.path == '' || to.path == '/mine') {
      next('/login')
    } else if (to.path == '/calendar' || to.path == '/vip' || to.path == '/teacher') {
      store.commit('loginVerify', true)
    } else {
      store.commit('loginVerify', false)
      next()
    }
  }
})

export default router
