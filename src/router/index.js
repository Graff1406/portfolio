import Vue from "vue";
import VueRouter from "vue-router";
import Meta from 'vue-meta';
import Home from "../views/Home.vue";
import Customs from "../views/Customs.vue";

Vue.use(VueRouter);
Vue.use(Meta);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/components/:name",
    name: "customs",
    component: Customs
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.path !== '/') return { x: 0, y: 0 }
  }
});

export default router;
