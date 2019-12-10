// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/public/css/style.css'
import '../static/public/colors/green/green.css'
import '../static/public/css/idangerous.swiper.css'
import '../static/public/css/swipebox.css'

// 定义全局组件(自定义)
import commonHead from '@/components/mn/commonHead'
Vue.component('commonHead',commonHead);

//引用第三方ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



