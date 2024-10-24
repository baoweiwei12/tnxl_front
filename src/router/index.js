import { createRouter, createWebHashHistory } from "vue-router";
import Group from "@/views/Group.vue";
import Stamina from "@/views/Stamina.vue";
import Major from "@/views/Major.vue";
import ShuangYi from "@/views/ShuangYi.vue";
import StaminaPlan from "@/views/StaminaPlan/index.vue";
import MajorPlan from "@/views/MajorPlan/index.vue";
import ShuangYiPlan from "@/views/ShuangYiPlan/index.vue";
import Home from "@/views/Home/index.vue";
import MyMajorPlan from "@/views/MyMajorPlan/index.vue";
import MyShuangYiPlan from "@/views/MyShuangYiPlan/index.vue";
import MyStaminaPlan from "@/views/MyStaminaPlan/index.vue";
const routes = [
  {
    path: "/",
    name: "首页",
    component: Home,
  },


  {
    path: "/login",
    name: "登录",
    component: () => import("../views/Login.vue"),
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
  , {
    path: "/StaminaPlan",
    name: "体能训练",
    component: StaminaPlan,
  }, {
    path: "/MajorPlan",
    name: "专业训练",
    component: MajorPlan,
  }, {
    path: "/ShuangYiPlan",
    name: "双一训练",
    component: ShuangYiPlan,
  }, {
    path: "/MyMajorPlan",
    name: "我的专业训练",
    component: MyMajorPlan,
  }, {
    path: "/MyShuangYiPlan",
    name: "我的双一训练",
    component: MyShuangYiPlan,
  }, {
    path: "/MyStaminaPlan",
    name: "我的体能训练",
    component: MyStaminaPlan,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
