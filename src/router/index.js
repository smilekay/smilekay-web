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
import Contact from '@/views/Contact'
import AddVideo from '@/views/AddVideo'
import Videos from '@/views/Videos'
import Forum from "../views/Forum";

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
        {
          path: '/help', name: 'Help', component: Help, children: [
            {path: '/contact', name: 'Contact', component: Contact}
          ]
        }]
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


