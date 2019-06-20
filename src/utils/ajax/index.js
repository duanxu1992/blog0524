import axios from './config';
import router from 'vue-router'; // src目录下面找不到文件？？
import Auth from '../auth';
import {Loading, Message} from 'element-ui';
import Global from '../global'
import qs from 'qs';

let loading;
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.method == 'get' || config.method == 'delete') {
      config.params = Object.assign(config.params || {}, config.data || {});
    }
    if (config.url.indexOf('/authz/refreshToken') > -1) {
      // refreshtoken不需要loading状态
      return config;
    }
    if (config.showLoading && (window.location.href.indexOf('login') < 0 && window.location.href.indexOf('datapanel') < 0 && router.currentRoute.name !== 'datapanel')) {
      startLoading();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    let originalConfig = response.config;
    if (originalConfig.showLoading && window.location.href.indexOf('login') < 0 && window.location.href.indexOf('datapanel') < 0) {
      endLoading();
    }
    if (response.data.status == 401 || response.data.code == 401 || response.data.code == -1) {
      // refreshtoken 是否是retry
      if (!originalConfig._retry) {
        if (
          response.data.status == 401 ||
          response.data.code == 401 ||
          (response.data.code == -1 &&
            response.data.message == '用户jwt过期')
        ) {
          // let token = Auth.getKispAccessToken();
          let refreshToken = Auth.getKispRefreshToken();
          if (token) {
            axios
              .post(
                Global.getBaseUrl() +
                '/authz/refreshToken',
                qs.stringify({refreshToken: refreshToken || ''}),
                {
                  headers: {
                    'Content-Type':
                      'application/x-www-form-urlencoded'
                  },
                  _retry: true
                }
              )
              .then(res => {
                if (res.data.result && res.data.result.jwt_token) {
                  Auth.setKispAccessToken(data.result.jwt_token);
                  Auth.setKispRefreshToken(data.result.refresh_token);
                }
              })
              .then(() => {
                console.log('refresh', originalConfig);
                // originalConfig.headers['jwt-token'] = Auth.getKispAccessToken();
                originalConfig._retry = true;
                axios(originalConfig);
              });
          } else {
            return response;
          }
        } else {
          return response;
        }
      }
      else {
        return response;
      }
    }
    else {
      return response;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

function startLoading() {
  toggleEmptyBlock('hidden');
  loading = Loading.service({
    lock: true,
    text: '',
    background: 'rgba(0, 0, 0, 0.0)'
  });
};

function endLoading() {
  loading.close();
  toggleEmptyBlock('visible');
};

function toggleEmptyBlock(state) {
  if (document.getElementsByClassName('el-table__empty-block')[0]) {
    document.getElementsByClassName(
      'el-table__empty-block'
    )[0].style.visibility = state;
  }
};

axios.ajax = function ajax(
  url,
  method,
  params,
  form = null,
  authorityService = null,
  encryption = null,
  showLoading = true
) {
  return new Promise((resolve, reject) => {
    let config = null;
    if (form) {
      config = {
        url: url,
        method: method,
        headers: {
          'Content-Type': form == 'multipart' ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
        }
      };
      if (form !== 'multipart') {
        config.transformRequest = [
          function (data) {
            let ret = '';
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&';
            }
            return ret;
          }
        ];
      } else {
        config.headers = {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': 'Bearer ' + Auth.getKispAccessToken(),
          // 'jwt-token': Auth.getKispAccessToken()
        }
      }
    } else {
      config = {
        url: url,
        method: method,
        headers: {}
      };
      // 登录的时候检查用户后台不能传jwt_token，连传空值都不行，所以这里做了处理
      if (url.indexOf('auth/login') !== -1) {
        config.headers = {
          'Content-type': 'application/json;charset=utf-8',
        };
      } else {
        config.headers = {
          'Content-type': 'application/json;charset=utf-8',
          // 'Authorization': 'Bearer ' + Auth.getKispAccessToken(),
          // 'jwt-token': Auth.getKispAccessToken()
        };
      }
    }
    //使用sha256加密
    if (encryption == 'sha256') {
      config.headers = Object.assign(config.headers, {'Content-SHA-256': true});
    }
    // 如果authorityService有值，则请求的是微服务地址
    if (authorityService == 'authorityService') {
      config.baseURL = Global.getCloudRbacUrl();
    } else if (authorityService == 'datapanel') {
      // 地图大屏本地mock数据base url
      config.baseURL = '';
      config.method = 'get';
    }
    if (method && method.toLowerCase() == 'get') {
      config.params = params;
    } else {
      config.data = params;
    }
    config.showLoading = showLoading;
    axios(config)
      .then(response => {

        //无权限处理
        if (!isCodeNoAuth(response)) {
          reject('登录过期，请重新登录！');
        }

        //返回异常
        if (!isCodeSuccess(response)) {
          let rejectMsg = response.data.message ? response.data.message : '系统异常~~~';
          reject(rejectMsg);
        }

        // 请求接口正确且成功时
        if (response.data.status == 200) {
          resolve(
            response.data.result
              ? response.data.result
              : response.data
          );
        } else {
          let rejectMsg = response.data.message ? response.data.message : '请求失败~~~';
          reject(rejectMsg);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

function isCodeNoAuth(res) {
  if (res.data.status == 401 || res.data.code == 401 || (res.data.code == -1 && res.data.message == '用户jwt过期')) {
    router.push({path: '/login'});
    return false;
  }
  return true;
};

function isCodeSuccess(response) {
  if (response.data.status == 500) {
    let rejectMsg = response.data.message ? response.data.message : '请求失败~~~';
    if (response.data.code == 901) {
      Message({
        message: rejectMsg,
        type: 'error'
      });
    }
    return false;
  }
  if (response.data.status == 403 || response.data.status == 400 || response.data.status == 1001) {
    return false;
  }
  return true;
}

export default axios;
