import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，
import { Message} from 'element-ui';

//==========================================================================================axios全局的配置==========================================================================================
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://192.168.1.103:8087';
}
else if (process.env.NODE_ENV == 'testing') {
  axios.defaults.baseURL = 'http://192.168.1.105:8087';
}
else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://lizhou828.vicp.cc:28262';
}

//响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (!response.status || response.status != 200 ) {
      //通信的http状态码
      return Promise.reject(response);
    }
    if(response.data && response.data.statusCode && response.data.statusCode === 200){
        //业务层面的状态码
        return Promise.resolve(response);
    }else{
      switch (response.data.statusCode) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        //由于前端和服务器端采用JWT的token通信，并且服务器端做了url拦截。若前端发出的请求被服务器端拦截到，则服务器端返回401，所以axios在前端无需做url拦截处理
        case 401:
          Message({
            message: '登录过期，请重新登录...',
            type: 'error',
            offset:60
          });
          setTimeout(() => {
            //  跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            window.location.href="/#/user/login";
          },1000);
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: '无访问权限...',
            type: 'error',
            offset:60
          });
          break;

        // 404请求不存在
        case 404:
          Message({
            message: '请求url不存在...',
            type: 'warning',
            offset:60
          });
          break;
        case 400:
          Message({
            message: '请求参数错误...',
            type: 'warning',
            offset:60
          });
          break;
        case 500:
          Message({
            message: response.data.message,
            type: 'warning',
            offset:60
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          // Toast({
          // message: error.response.data.message,
          // duration: 1500,
          // forbidClick: true
          // });
          Message({
            message: '服务器异常...',
            type: 'warning',
            offset:60
          });
      }
      return Promise.resolve(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      return Promise.reject(error.response);
    }
  });
//==========================================================================================axios全局的配置==========================================================================================


//==========================================================================================axios实例instance的配置==========================================================================================


// 每次请求都为http的请求头增加mn-Auth-Token字段，其内容为登录接口中返回的token值
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['mn-Auth-Token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



//==========================================================================================axios实例instance的配置==========================================================================================


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}



