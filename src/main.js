// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import axios from 'axios';
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import Vuex from 'vuex'
import store from './store'
import {get, post} from './utils/http'
import utils from './utils/utils'
import VueVideoPlayer from 'vue-video-player'
import VueCookie from 'vue-cookie'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import 'videojs-contrib-hls'

router.beforeEach((to, from, next) => {
  // let token = localStorage.getItem('token');
  // if (!token) {
  //   if (to.path != '/register' && to.path != '/login' && to.path != '/callback') {
  //     next({path: '/login'});
  //   }
  // } else {
  //   get('/check_login', {token: token}).then(response => {
  //     if (to.path == '/register' || to.path == '/login') {
  //       console.log(response.message)
  //       next({path: from.path})
  //     }
  //   }).catch(error => {
  //     console.log(error.message)
  //     localStorage.clear();
  //     next({path: '/login'})
  //   })
  // }
  if(to.path=='/'){
    next({path: '/mall'});
  }
  next();
});

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueVideoPlayer);
Vue.use(VueCookie);
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$utils = utils;
axios.defaults.withCredentials = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
