import Vue from 'vue';
import Router from 'vue-router';
import Home from '../../src/view/homePage.vue';


// import dyanpageRouter from 'dynapage/app-dynapage/router';
// import SubRouter from 'submodule/ioms-apprasial/router';

let routes = [
  {
    path: '/',
    name: '',
    meta: {sign: 'IS_NOT_REQUIRE'},
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {sign: 'IS_NOT_REQUIRE'},
    title: '登录',
    component: Home
  }
];

// 注册子模块路由
// routes.unshift(...dyanpageRouter(Home));
// routes.unshift(...SubRouter(Home));


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
