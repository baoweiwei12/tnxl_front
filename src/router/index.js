import { createRouter, createWebHashHistory } from "vue-router";
import Group from "@/views/Group.vue";
import Stamina from "@/views/Stamina.vue";

const routes = [

  {
    path: "/login",
    name: "登录",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
  {
    path: "/user",
    name: "用户管理",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/group",
    name: "分组管理",
    component: Group,
  }, {
    path: "/stamina",
    name: "体能信息",
    component: Stamina,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
