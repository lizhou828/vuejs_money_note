import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '@/components/mn/menu'
import Login from '@/components/user/login'
import mnItemBlank from '@/components/mnItem/blank'
import mnItemDayList from '@/components/mnItem/dayList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Menu
    },
    {
      path: '/mn/menu',
      name: '菜单页',
      component: Menu
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mnItem/blank',
      name: 'mnItemBlank',
      component: mnItemBlank
    },
    {
      path: '/mnItem/dayList',
      name: 'mnItemDayList',
      component: mnItemDayList
    }

  ]
})
