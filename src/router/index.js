import Vue from "vue";
import firebase from "../plugins/firebase";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/chakra-demo",
    name: "ChakraDemo",
    component: () => import("@/views/CakraDemo.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/list-form",
    name: "ListForm",
    component: () => import("@/views/ListForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/list-form/:slug",
    name: "FormGenerator",
    component: () => import("@/views/FormGenerator.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
        return;
      }

      next("/login");
    });
  } else {
    next();
  }
});

export default router;
