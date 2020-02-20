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
    path:'/finddetail/:id',
    component:()=>import('views/finddetail/FindDetail')
  },
  {
    path:'/postRequestions',
    component:()=>import('views/postrequestion/PostRequestion')
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
    path: '/register/:id',
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
    path:'/guideReceipt',
    component:()=>import('views/guidereceipt/GuideReceipt')
  },
  {
    path:'/nowfindGuide',
    component:()=>import('views/nowfindguide/NowFindGuide')
  },
  {
    path:'/nowbuytickets',
    component:()=>import('views/nowbuytickets/NowBuyTicket')
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

  if(to.path==='/profiledetail' && from.path==='/'){
    data.is_save= 0
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  if(to.path==='/profiledetail' && from.path==='/profiletags'){
    data.is_save= 1
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  if(to.path==='/profiledetail' && from.path==='/profile'){
    data.is_save= 0
    localStorage.setItem('userInfo',JSON.stringify(data))
  }


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

  if(to.path==='/guideReceipt'){
    if(data.is_guide){
      return next()
    }else{
      return next('/profile')
    }
  }

  next()
})

export default router
