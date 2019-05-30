import Vue from 'vue';
import Router from 'vue-router';
import Main from '../../src/view/main.vue';
import Home from '../../src/view/homePage.vue';
import About from '../../src/view/about.vue';
import Categroy from '../../src/view/category.vue';

// import dyanpageRouter from 'dynapage/app-dynapage/router';
// import SubRouter from 'submodule/ioms-apprasial/router';
Vue.use(Router);
let routes = [
  {
    path: '/',
    name: '',
    meta: {sign: 'IS_NOT_REQUIRE'},
    redirect: '/home'
  },
  {
    path: '/',
    name: 'main',
    meta: {sign: 'IS_NOT_REQUIRE'},
    title: '登录',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {sign: 'IS_NOT_REQUIRE'},
        component: Home,
      },
      {
        path: '/about-auther',
        name: 'about',
        meta: {sign: 'IS_NOT_REQUIRE'},
        component: About,
      },
      {
        path: '/category',
        name: 'Categroy',
        meta: {sign: 'IS_NOT_REQUIRE'},
        component: Categroy,
      },
    ]
  }
];

// 注册子模块路由
// routes.unshift(...dyanpageRouter(Home));
// routes.unshift(...SubRouter(Home));


Vue.use(Router);

let router = new Router({
  routes: routes
});
router.beforeEach((to, from, next) => {
  if (true) {
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
