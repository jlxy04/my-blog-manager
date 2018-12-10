'use strict';
import axios from 'axios';

// let LOADING;
/**
 * 拦截请求数据
 */

// 截取token
// const userInfo = {auth_token: Utils.GetHrefParam('auth_token'), userCode: Utils.GetHrefParam('userCode'),device: Utils.GetHrefParam('device')}
// console.log(userInfo);


axios.interceptors.request.use(function (config) {
  config.headers = config.headers || {};
  // console.log('=======interceptorsRequest========', config);
  // headers 添加token信息
 

  // 超时处理
  setTimeout(() => {
  
    this.$Message.error('请求超时');
  }, 15000);

  return config
}, function (error) {
 

  // console.error('=======interceptorsRequest error========', error);
  return Promise.reject(error)
});

function isJSON(str) {
  try {
    const strJSON = JSON.parse(str);
    console(strJSON);
    return true;
  } catch (err) {
      return false;
  }
}

/**
 * 拦截响应数据
 */
axios.interceptors.response.use(function (res) {
  let resData;

  switch (res.status) {
    case 401:
      // 权限处理
      break;
    case (200 || 304):
      // 业务正常处理 null 过滤
      if (res.data) {
        resData = res.data
      } else {
        // console.warn('数据 data null!');
        resData = res.data;
      }
      break;
    default:
      // console.warn('网络状态异常!');
      resData = res.data ? res.data : res;
  }

  // console.log('=======interceptorsResponse========');
  return resData
}, function (err) {

  // console.warn('=======interceptorsResponse error========', err, err.response);
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误';
        break;

      case 401:
        err.message = '未授权，请登录';
        break;

      case 403:
        err.message = '拒绝访问';
        break;

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`;
        break;

      case 408:
        err.message = '请求超时';
        break;

      case 500:
        // err.message = '服务器内部错误';
        let errMsg = '服务器 500 错误';
        if (err.response.data) {
          if (typeof err.response.data.message === 'string' && isJSON(err.response.data.message)) {
            const msgJSON = JSON.parse(err.response.data.message);
            errMsg = msgJSON && msgJSON['message'] ? msgJSON['message'] : '服务器 500 错误'
          } else {
            errMsg = err.response.data.message || '服务器 500 错误'
          }
        }
        err.message = `${errMsg}`;
        // console.warn('==500==',err.message);
        break;
      case 501:
        err.message = '服务未实现';
        break;

      case 502:
        err.message = '网关错误';
        break;

      case 503:
        err.message = '服务不可用';
        break;

      case 504:
        err.message = '网关超时';
        break;

      case 505:
        err.message = 'HTTP版本不受支持';
        break;

      default:
    }
  }

  let message = Message.error(err.message);
  message = null;
  return Promise.reject(err)
})
;

/**
 * 错误显示提示信息
 * @param functionName
 * @param error
 * @returns {string|*}
 */
export function handleError(error, functionName = '') {
  console.warn(` 函数 : ${functionName} 。发生错误 : `, error);
  return error.message || error;
}

export class BaseService {

  static postConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  /**
   * POST API
   * @param url
   * @param reqbodys
   * @param config
   * @returns {*}
   */
  static postApi(url, reqbodys, config) {
    const paramsConfig = config || this.postConfig;
    return axios.post(url, reqbodys, paramsConfig);
  }

}
