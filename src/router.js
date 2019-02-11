import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const JamDindingView = () => import(/* webpackChunkName: "jam-dinding-view" */'@/views/JamDinding.vue');

const TentangAplikasiView = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');


export default new Router({
  routes: [
    {
      path: '/jam',
      name: 'home',
      component: JamDindingView,
    },
    {
      path: '/about',
      name: 'about',
      component: TentangAplikasiView,
    },
    {
      path: '*',
      redirect: '/jam',
    },
  ],
});
