import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Register",
    component: () => import("@/components/Register"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/components/Dashboard"),
    meta: { requiresAuth: true },
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: () => import("@/components/Rooms/Details"),
    meta: { requiresAuth: true },
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = store.getters["_getCurrentUser"];
    if (!user) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
