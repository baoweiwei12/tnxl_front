import { createRouter, createWebHashHistory } from "vue-router";
import Group from "@/views/Group.vue";
import Stamina from "@/views/Stamina.vue";
import Major from "@/views/Major.vue";
import ShuangYi from "@/views/ShuangYi.vue";
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
  }, {
    path: "/major",
    name: "专业信息",
    component: Major,
  }, {
    path: "/shuangyi",
    name: "双一信息",
    component: ShuangYi,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
