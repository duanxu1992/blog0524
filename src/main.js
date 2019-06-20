import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import './assets/scss/rest.scss';
import './assets/scss/common.scss';
import './assets/iconFont/iconfont.css';
import Global from './utils/global.js'

Vue.use(ElementUI);
Global.init()
  .then(
    // async关键字，表示函数是一个异步函数。该函数的执行不会阻塞后面的代码执行
    async (res) => {
      console.log('init返回', res);
      new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: {App},
        render: h => h(App)
      })
    })
  .catch(
    console.log('init error')
  );

