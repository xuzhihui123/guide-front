import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/home',
    component:()=>import('views/home/Home')
  },
  {
    path:'/find',
    component:()=>import('views/find/Find')
  },
  {
    path:'/orders',
    component:()=>import('views/orders/Orders')
  },
  {
    path:'/profile',
    component:()=>import('views/profile/Profile')
  },
  {
    path:'/login',
    component:()=>import('views/login/Login')
  },
  {
  path:'/register',
    component:()=>import('views/register/Register')
},
  {
    path:'/',
    redirect:'/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let data = JSON.parse(localStorage.getItem('userInfo'))

  if(to.path === '/login' || to.path==='/register'){
    if(data.user_name !== undefined){
      return next('/profile')
    }else{
      return next()
    }
  }


  next()
})

export default router
