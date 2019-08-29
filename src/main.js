// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import App from './App'
import router from './router'
import './assets/icon/iconfont.css'
import store from './store'
import {get, post} from './utils/http'
import utils from './utils/utils'
import VueVideoPlayer from 'vue-video-player'
import VueCookie from 'vue-cookie'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import "../static/css/smilekay.css";

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import 'videojs-contrib-hls'

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next({path: '/mall'});
  }
  next();
});

// 安装 ElementUI
Vue.use(ELEMENT);
Vue.use(VueQuillEditor);
Vue.use(VueRouter);
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
