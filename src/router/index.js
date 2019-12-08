import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '@/components/mn/menu'
import userCenter from '@/components/mn/userCenter'
import weixin from '@/components/mn/weixin'
import contact from '@/components/mn/contact'
import setting from '@/components/mn/setting'

import mnEventBlank from '@/components/mnEvent/blank'
import mnEventList from '@/components/mnEvent/list'

import Login from '@/components/user/login'

import mnItemBlank from '@/components/mnItem/blank'
import mnItemDayList from '@/components/mnItem/dayList'
import incomePerMonth from '@/components/mnItem/incomePerMonth'
import payedPerMonth from '@/components/mnItem/payedPerMonth'


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
    },
    {
      path: '/mnEvent/list',
      name: 'mnEventList',
      component: mnEventList
    },
    {
      path: '/mnEvent/blank',
      name: 'mnEventBlank',
      component: mnEventBlank
    },

    {
      path:'/mn/userCenter',
      name:'个人中心',
      component:userCenter
    },
    {
      path:'/mnItem/incomePerMonth',
      name:'收入汇总',
      component:incomePerMonth
    },
    {
      path:'/mnItem/payedPerMonth',
      name:'支出汇总',
      component:payedPerMonth
    },

    {
      path:'/mn/weixin',
      name:'关注我们',
      component:weixin
    },
    {
      path:'/mn/contact',
      name:'联系我们',
      component:contact
    },{
      path:'/mn/setting',
      name:'设置',
      component:setting

    }




  ]
})
