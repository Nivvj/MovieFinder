import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import MovieDetail from "../pages/MovieDetail.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/movie/:id", name: "movie", component: MovieDetail, props: true },
  { path: "/:pathMatch(.*)*", redirect: "/" }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
