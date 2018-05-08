import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Post from '@/pages/Post'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/',
      component: Index
    }
  ]
})
