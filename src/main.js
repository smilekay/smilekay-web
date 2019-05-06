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
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('isLogin');
  if (to.path == '/logout') {
    sessionStorage.clear();
    next({path: '/login'});
  } else if (to.path == '/') {
    if (isLogin == null) {
      next({path: '/login'});
    }
  } else if (to.path == '/login') {
    if (isLogin != null) {
      next({path: '/'});
    }
  } else if (to.path == '/register') {
    if (isLogin != null) {
      next({path: '/'});
    }
  }
  next();
});

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueAxios,axios);
Vue.prototype.qs = qs

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
