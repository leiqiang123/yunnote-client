import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/register',
      name:'register',
      component:() => import('../views/register')
    },
    {
      path:'/writenote',
      name:'writenote',
      component:() => import('../views/writenote')
    }
  ]
})

