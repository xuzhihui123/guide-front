import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('views/home/Home')
  },
  {
    path: '/find',
    component: () => import('views/find/Find')
  },
  {
    path: '/orders',
    component: () => import('views/orders/Orders')
  },
  {
    path: '/profile',
    component: () => import('views/profile/Profile')
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/Register')
  },
  {
    path:'/profiledetail',
    component:()=>import('views/profiledetail/ProfileDetail')
  },
  {
    path:'/profiletags',
    component:()=>import('views/profiletags/ProfileTags')
  },
  {
    path:'/changepsd',
    component:()=>import('views/changepassword/ChangePassword')
  },
  {
    path:'/profiledetailshow',
    component:()=>import('views/profiledetailshow/ProfileDetailShow')
  },
  {
    path:'/search',
    component:()=>import('views/search/Search')
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let data = JSON.parse(localStorage.getItem('userInfo') || '{}')

  if (to.path === '/login' || to.path === '/register') {
    if (data.user_name !== undefined) {
      return next('/profile')
    } else {
      return next()
    }
  }
  if(to.path === '/profiledetail' || to.path === '/profiletags' || to.path==='/changepsd'){
    if (data.user_name !== undefined) {
      return next()
    } else {
      return next('/profile')
    }
  }

  next()
})

export default router
