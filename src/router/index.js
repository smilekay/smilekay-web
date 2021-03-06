import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import NotFound from '@/views/Notfound'
import Login from '@/views/Login'
import Mall from '@/views/Mall'
import News from '@/views/News'
import Callback from '@/views/Callback'
import Media from '@/views/Media'
import Help from '@/views/Help'
import AddVideo from '@/views/AddVideo'
import Videos from '@/views/Videos'
import Forum from "../views/Forum";
import Admin from "../views/Admin";
import MyMedia from "../views/MyMedia";
import Post from "../views/Post";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path: '/mall', name: 'Mall', component: Mall},
        {path: '/videos', name: 'Videos', component: Videos},
        {path: '/news', name: 'News', component: News},
        {path: '/forum', name: 'Forum', component: Forum},
        {path: '/help', name: 'Help', component: Help},
        {path: '/admin', name: 'Admin', component: Admin}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/video',
      name: 'Media',
      component: Media
    },
    {
      path: '/p',
      name: 'Post',
      component: Post
    },
    {
      path: '/av',
      name: 'MyMedia',
      component: MyMedia
    },
    {
      path: '/add',
      name: 'AddVideo',
      component: AddVideo
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/views/Register'], resolve)
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
});


