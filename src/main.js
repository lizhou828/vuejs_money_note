// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {currency} from './common/currency'
import Moment from 'moment'

import '../static/public/css/style.css'
import '../static/public/colors/green/green.css'
import '../static/public/css/idangerous.swiper.css'
import '../static/public/css/swipebox.css'

// 需要调试时，开启Vconsole的代码
// import Vconsole from 'vconsole';
// let vConsole = new Vconsole();
// export default vConsole


// 定义全局组件(自定义)
import commonHead from '@/components/mn/commonHead'
Vue.component('commonHead',commonHead);

// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})

//定义全局过滤器
Vue.filter('currency',currency);

//引用第三方ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



