// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import Vuex from 'vuex'
import store from './store'
import {get, post} from './utils/http'

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (!token) {
    if (to.path != '/register' && to.path != '/login') {
      next({path: '/login'});
    }
  } else {
    get('/check_login', {token: token}).then(response => {
      if (to.path == '/register' || to.path == '/login') {
        console.log(response.message)
        next({path: from.path})
      }
    }).catch(error => {
      console.log(error.message)
      next({path: '/login'})
    })
  }
  next();
});

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$get = get;
Vue.prototype.$post = post;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
