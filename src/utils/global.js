import axios from 'axios';
import Vue from 'vue';
import MainGolbal from './../utils/global.js';


const packageJson = require('./../utils/global.js');

// const config = require('../config');
const config = {
  app: {
    name: packageJson.name || 'kiaf'
    // layout: packageJson.layout || 'H',
    // contentPath: packageJson.contentPath || ''//nginx 目录下的文件夹 /kiaf or ''
  }
};
let mockUrl = '';
let global = {};
let baseUrl = '';
let cloudRbacUrl = '';
let chartBaseUrl = '';
let ispopup = true;//是否时弹出窗口的模式
let windows = [];
let routerMenu = [];
// 拿取所有路由参数
global.setRouterMenu = function (value) {
  routerMenu = value;
};
global.getRouterMenu = function (value) {
  return routerMenu;
};
global.setBaseUrl = function (value) {
  baseUrl = value;
};
global.setChartBaseUrl = function (value) {
  chartBaseUrl = value;
};
global.getChartBaseUrl = function () {
  return chartBaseUrl;
};

global.getBaseUrl = function () {
  if (!baseUrl) {
    baseUrl = MainGolbal.getBaseUrl();
  }
  return baseUrl;
};
global.setMockUrl = function (value) {
  mockUrl = value;
};
global.getMockUrl = function () {
  return mockUrl;
};
global.setCloudRbacUrl = function (value) {
  cloudRbacUrl = value;
};

global.getCloudRbacUrl = function () {
  return cloudRbacUrl;
};

global.setWindows = function (value) {
  windows = value;
  windows.forEach(win => {
    if (win.url && win.url.indexOf('#') < 0) {
      win.url = '/#' + win.url;
    }
  });
};

global.getWindows = function () {
  if (windows.length > 0) {
    return windows;
  } else {
    return [{
      'windowId': 'primary',
      'primary': true,
      'url': '/#/welcome/page1'
    }];
  }
};

global.isHorizontalLayout = function () {
  let layout = 'H';// h horizontal V vertical
  if (config.app && config.app.layout) {
    layout = config.app.layout;
  }
  return layout === 'H';
};

global.getAppName = function () {
  let appName = 'kiaf';
  if (config.app && config.app.name) {
    appName = config.app.name;
  }
  return appName;
};

global.getContentPath = function () {
  let contentPath = '';
  if (config.app && config.app.contentPath) {
    contentPath = config.app.contentPath;
  }
  return contentPath;
};

global.isPopUp = function () {
  return ispopup === 'Y';
};

global.setPopUp = function (value) {
  ispopup = value;
};
let clientSign = '';
global.getClientSign = function () {
  return clientSign;
};

global.setClientSign = function (value) {
  clientSign = value;
};

global.getEnv = function () {
  let env = 'development';
  if (process.env.NODE_ENV) {
    env = process.env.NODE_ENV;
  }
  return env;
};

global.init = function () {
  return new Promise((resolve, reject) => {
    console.log('packageJson.name');
    let env = MainGolbal.getEnv();
    axios.get(`src/assets/config/config-${env}.json`).then((res) => {
      let params = res.data;
      if (params['CLOUD_RBAC_URL']) {
        this.setCloudRbacUrl(params['CLOUD_RBAC_URL']);
      }
      if (params['BASE_URL']) {
        this.setBaseUrl(params['BASE_URL']);
      }
      if (params['MOCK_URL']) {
        this.setMockUrl(params['MOCK_URL']);
      }
      if (params['WINDOWS']) {
        this.setWindows(params['WINDOWS']);
      }
      if (params['POPUP']) {
        this.setPopUp(params['POPUP']);
      }
      if (params['CLIENT_SIGN']) {
        this.setClientSign(params['CLIENT_SIGN']);
      }
      if (params['CHART_BASE_URL']) {
        this.setChartBaseUrl(params['CHART_BASE_URL']);
      }
      // let axiosConfig = {
      // 	baseURL: params.BASE_URL,
      // 	withCredentials: true
      // };
      // sessionStorage.setItem('picBaseUrl', params.BASE_URL);
      // // sessionStorage.setItem('authorityServiceUrl', params.CLOUD_RBAC_URL); // 请求权限的服务器地址
      // // sessionStorage.setItem('REFRERSH_TOKEN_TIME', params.REFRERSH_TOKEN_TIME); // 刷新token时间
      // axios.setConfig(params);
      resolve(true);
    }).catch((err) => {
      console.error(`global init err`, err);
      reject(true);
    });
    // axios.get(`src/assets/config/config-${env}.json`).then((res) => {
    //   let params = res.data.data;
    //   this.setRouterMenu(params);
    //   resolve(true);
    // }).catch((err) => {
    //   console.error(`${submoduleName} global init err`, err);
    //   reject(true);
    // });
  });
};
export default global;
