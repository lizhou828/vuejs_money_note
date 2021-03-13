import Vue from 'vue'
import Router from 'vue-router'

/**
 * 重写vue-router路由的push方法,这样的话，在普通的html标签中触发了click时间，也能跳转路由 ，就没必要一定要用<router-link>标签了
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};

// import HelloWorld from '@/components/HelloWorld'
import MnMenu from '@/components/mn/MnMenu'
import test from '@/components/test'
import weixin from '@/components/mn/weixin'
import contact from '@/components/mn/contact'
import setting from '@/components/mn/setting'

import mnEventBlank from '@/components/mnEvent/blank'
import mnEventList from '@/components/mnEvent/list'

import Login from '@/components/user/login'
import register from '@/components/user/register'
import userCenter from '@/components/user/userCenter'

import mnItemBlank from '@/components/mnItem/blank'
import mnItemDayList from '@/components/mnItem/dayList'
import incomePerMonth from '@/components/mnItem/incomePerMonth'
import payedPerMonth from '@/components/mnItem/payedPerMonth'
import mnItemSearch from '@/components/mnItem/search'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: MnMenu
    },
    {
      path: '/test',
      name: '测试页面',
      component: test
    },
    {
      path: '/mn/menu',
      name: '菜单页',
      component: MnMenu
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'register',
      component: register
    },
    {
      path: '/mnItem/blank',
      name: 'mnItemBlank',
      component: mnItemBlank,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/mnItem/dayList',
      name: 'mnItemDayList',
      component: mnItemDayList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/mnEvent/list',
      name: 'mnEventList',
      component: mnEventList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/mnEvent/blank',
      name: 'mnEventBlank',
      component: mnEventBlank,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },

    {
      path: '/user/userCenter',
      name: '个人中心',
      component: userCenter
    },
    {
      path: '/mnItem/incomePerMonth',
      name: '收入汇总',
      component: incomePerMonth,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/mnItem/payedPerMonth',
      name: '支出汇总',
      component: payedPerMonth,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/mnItem/search',
      name: '搜索记账条目',
      component: mnItemSearch,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },

    {
      path: '/mn/weixin',
      name: '关注我们',
      component: weixin
    },
    {
      path: '/mn/contact',
      name: '联系我们',
      component: contact
    }, {
      path: '/mn/setting',
      name: '设置',
      component: setting

    }


  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {  // 还可以用store.state.token  通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/user/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后再跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

export default router;
