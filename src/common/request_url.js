import {post} from './http.js'

// 这里使用了箭头函数，转换一下写法：
//export const LOGIN=function(req){
//    return post('/operator/login',params)
//}

 // 登录接口
 export const LOGIN = params => post( '/user/login', params);
 // 定义注册接口
 export const REGISTER = params => post( '/user/register', params);
 // 定义注销接口
 export const LOGOUT = params => post( '/user/logout', params);


export const EVENT_DETAIL = params => post( '/mnEvent/detail', params);
export const EVENT_LIST = params => post( '/mnEvent/list', params);
export const EVENT_DELETE = params => post( '/mnEvent/delete', params);
export const EVENT_SAVE_OR_UPDATE = params => post( '/mnEvent/saverOrUpdate', params);

export const ITEM_DETAIL = params => post( '/mnItem/detail', params);
export const ITEM_DELETE = params => post( '/mnItem/delete', params);
export const ITEM_SAVE_OR_UPDATE = params => post('/mnItem/saverOrUpdate', params);

export const MN_PAYED_PER_MONTH = params => post( '/mn/payedPerMonth', params);
export const MN_INCOME_PER_MONTH = params => post( '/mn/incomePerMonth', params);
export const MN_DAY_LIST= params => post( '/mn/dayList', params);


