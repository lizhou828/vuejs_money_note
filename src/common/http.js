import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，
// 创建axios的一个实例
var instance = axios.create({
  baseURL: "http://192.168.222.231:8092",
  timeout: 30000
});
axios.defaults.timeout = 10000;

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


// const http = axios.create({
//   baseURL: "http://192.168.222.231:8092",
//   timeout: 6000
// })
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
//console.log('tokenW2W2W2W2W2'+token);

    if (token) {
      config.headers.common['mn-Auth-Token'] = token;
      // config.headers['token'] = token
      // console.log("token"+token);
    }
    // console.log("token"+config)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// // http response 拦截器
// instance.interceptors.response.use(response => {
//   let data = response.data
//   if (data.code === 200) {
//     return data.data
//   }
//   if (data.code === 401) {
//     window.location.href = '/login'
//   }
//   // let msg = data.code ? data.msg : `${response.config.headers['method']} : ${data.error}`
//   // data.message = msg
//   return Promise.reject(data)
// }, error => {
//   // if (error.response) {
//   //   switch (error.response.status) {
//   //     case 401:
//   //       // 这里写清除token的代码
//   //       localStorage.removeItem(token);
//   //       router.replace({
//   //         path: 'login',
//   //         query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//   //       })
//   //   }
//   // }
//   // return Promise.reject(error.response.data)
//   // if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
//   //   error.msg = '请求超时，请重试'
//   // }
//   return Promise.reject(error)
// })


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
        case 401:
          router.replace({
            path: '/login',
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
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          this.$message({
            message: '网络请求不存在',
            type: 'warning'
          });
          // Toast({
          // message: '网络请求不存在',
          // duration: 1500,
          // forbidClick: true
          // });
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
