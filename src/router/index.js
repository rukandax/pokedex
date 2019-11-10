import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue');

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/:pokemon',
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes,
});

export default router;
