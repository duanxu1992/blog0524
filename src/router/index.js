import Vue from 'vue';
import Router from 'vue-router';
import Home from 'main/view/main/Main';
import Login from 'main/view/login/Login';

// import dyanpageRouter from 'dynapage/app-dynapage/router';
// import SubRouter from 'submodule/ioms-apprasial/router';
const moduleConfig = require('../../module-config.js');

let routes = [
  {
    path: '/',
    name: '',
    meta: {sign: 'IS_NOT_REQUIRE'},
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: {sign: 'IS_NOT_REQUIRE'},
    title: '登录',
    component: Login
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {sign: 'IS_NOT_REQUIRE'},
    title: 'demo',
    component: () => import('main/view/main/demo')
  },
  {
    path: '/kisp',
    icon: 'ios-grid-view',
    name: 'kisp',
    title: '首页',
    meta: {sign: 'AUTH_INDEX'},
    component: Home,
    children: [
      // 权限管理 结束
      // 个人中心
      {
        // path: 'personal-center/:userId',
        path: 'personal-center',
        title: '个人中心',
        name: 'personal-center',
        meta: {sign: 'IS_NOT_REQUIRE'},
        icon: 'arrow-move',
        component: () => import('main/view/personal-center/index')
      },
      {
        path: '/*',
        title: '404',
        name: 'ppl-detail',
        meta: {sign: 'IS_NOT_REQUIRE'},
        icon: 'arrow-move',
        component: () => import('main/view/error-page/404.vue')
      }
    ]
  }
];

// 注册子模块路由
// routes.unshift(...dyanpageRouter(Home));
// routes.unshift(...SubRouter(Home));

if (moduleConfig && moduleConfig.length > 0) {
  moduleConfig.forEach(item => {
    if (item.router) {
      try {
        var Router = require(`submodule/${item.name}/router`);
        routes.unshift(...Router.default(Home));
      } catch (err) {
        console.warn('cannot find submodule\'s router.js!');
      }
    }
  });
}

Vue.use(Router);
console.log('router', routes);

let router = new Router({
  routes: routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.length > 0 && to.matched[1] && (to.matched[1].name === 'map-index')) {
    // 所有map页面html类名样式
    document.getElementsByTagName('html')[0].className = 'map-html';
  } else {
    document.getElementsByTagName('html')[0].className = (to.path.split('/')[2] || to.path.split('/')[1]) + '-page';
  }
  // if (to.meta.sign === 'IS_NOT_REQUIRE') {
  if (false) {
    next();
  } else {
    if (sessionStorage.getItem('jwt_token')) {
      console.log('当前路由', to.path);
      // 其他路由没有退出跳转到login的情况下
      if (to.path.indexOf('login') > 0 && sessionStorage.getItem('jwt_token')) {
        sessionStorage.removeItem('jwt_token');
        ajaxIndex.endLoading();
      }
      //
      next();
    } else {
      if (to.fullPath === '/login') {
        next();
      } else {
        Message({
          message: '对不起，您没有权限！',
          type: 'error'
        });
        next('/login');
      }
    }
  }
});
export default router;
