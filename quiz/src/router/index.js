import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import MatchView from "@/components/MatchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainView,
    },
    // {
    //   path: "/matchview",
    //   name: "match",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import("../views/MatchView.vue"),
    //   component: MatchView,
    // },
  ],
});

export default router;
