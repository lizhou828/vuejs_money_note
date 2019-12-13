import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，

//==========================================================================================axios全局的配置==========================================================================================
axios.defaults.timeout = 10000;
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'https://www.baidu.com';
}
else if (process.env.NODE_ENV == 'testing') {
  axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://www.production.com';
}

//响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        //由于前端和服务器端采用JWT的token通信，并且服务器端做了url拦截。若前端发出的请求被服务器端拦截到，则服务器端返回401，所以axios在前端无需做url拦截处理
        case 401:
          router.replace({
            path: '/user/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          this.$message({
            message: '登录过期，请重新登录',
            type: 'warning'
          });
          // Toast({
          // message: '登录过期，请重新登录',
          // duration: 1000,
          // forbidClick: true
          // });

          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/user/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          this.$message({
            message: '请求url不存在',
            type: 'warning'
          });
          break;
        case 400:
          this.$message({
            message: '请求参数错误',
            type: 'warning'
          });
          break;
        case 500:
          this.$message({
            message: '服务器返回内容错误',
            type: 'warning'
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          // Toast({
          // message: error.response.data.message,
          // duration: 1500,
          // forbidClick: true
          // });
          this.$message({
            message: 'error.response.data.message',
            type: 'warning'
          });
      }
      return Promise.reject(error.response);
    }
  });
//==========================================================================================axios全局的配置==========================================================================================


//==========================================================================================axios实例instance的配置==========================================================================================
// 创建axios的一个实例
var instance = axios.create({
  baseURL: "http://192.168.222.17:8087",
  timeout: 30000
});

// 每次请求都为http的请求头增加mn-Auth-Token字段，其内容为登录接口中返回的token值
instance.interceptors.request.use(
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
// 一、请求拦截器 忽略
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 二、响应拦截器 忽略
instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



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
      reject(err.data)
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
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}


export default function (method, url, data = null) {
  method = method.toLowerCase();
  if (method === 'post') {
    return instance.post(url, data);
  } else if (method === 'get') {
    return instance.get(url, {params: data});
  } else if (method === 'delete') {
    return instance.delete(url, {params: data});
  } else if (method === 'put') {
    return instance.put(url, data);
  } else {
    console.error('未知的method' + method);
    return false;
  }
}
