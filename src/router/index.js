import { createRouter, createWebHashHistory } from "vue-router";
import Group from "@/views/Group/index.vue";
import Stamina from "@/views/Stamina/index.vue";
import Major from "@/views/Major/index.vue";
import ShuangYi from "@/views/ShuangYi/index.vue";
import StaminaPlan from "@/views/StaminaPlan/index.vue";
import MajorPlan from "@/views/MajorPlan/index.vue";
import ShuangYiPlan from "@/views/ShuangYiPlan/index.vue";
import Home from "@/views/Home/index.vue";
import MyMajorPlan from "@/views/MyMajorPlan/index.vue";
import MyShuangYiPlan from "@/views/MyShuangYiPlan/index.vue";
import MyStaminaPlan from "@/views/MyStaminaPlan/index.vue";
import Subject from "@/views/Subject/index.vue";
import UserView from "@/views/User/index.vue";
import StudySubject from "@/views/StudySubject/index.vue";
import Question from "@/views/Question/index.vue";
import Quiz from "@/views/Quiz/index.vue";
import ErrorAnswer from "@/views/ErrorAnswer/index.vue";
import ScoreStatistics from "@/views/ScoreStatistics/index.vue";
import Feedback from "@/views/Feedback/index.vue";
import {
  House,
  User,
  School,
  Stamp,
  List,
  Document,
  ChatLineSquare,
  Message
} from "@element-plus/icons-vue";

const routes = [
  // 一级菜单：公共页面
  {
    path: "/",
    name: "首页",
    component: Home,
    meta: {
      show: true,
      icon: House,
      role: ["admin", "group_admin", "user"],
      keepAlive: false,
    },
  },
  ,
  // 一级菜单：用户管理
  {
    path: "/user",
    name: "用户管理",
    component: UserView,
    meta: {
      show: true,
      icon: User,
      role: ["admin", "group_admin"],
      keepAlive: false,
    },
  },
  {
    path: "/group",
    name: "分组管理",
    component: Group,
    meta: {
      show: true,
      icon: List,
      role: ["admin"],
      keepAlive: false,
    },
  },
  {
    path: "/subject",
    name: "科目维护",
    component: Subject,
    meta: {
      show: true,
      icon: Document,
      role: ["admin"],
      keepAlive: false,
    },
  },

  // 一级菜单：信息管理
  {
    path: "/info",
    name: "信息管理",
    meta: {
      show: true,
      icon: Stamp,
      role: ["admin", "group_admin"],
    },
    children: [
      {
        path: "stamina",
        name: "体能信息",
        component: Stamina,
        meta: {
          show: true,
          icon: Stamp,
          role: ["admin", "group_admin"],
          keepAlive: false,
        },
      },
      {
        path: "major",
        name: "专业信息",
        component: Major,
        meta: {
          show: true,
          icon: School,
          role: ["admin", "group_admin"],
          keepAlive: false,
        },
      },
      {
        path: "shuangyi",
        name: "双一信息",
        component: ShuangYi,
        meta: {
          show: true,
          icon: Document,
          role: ["admin", "group_admin"],
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/plan",
    name: "训练管理",
    meta: {
      show: true,
      icon: Stamp,
      role: ["admin", "group_admin"],
      keepAlive: false,
    },
    children: [
      {
        path: "MajorPlan",
        name: "专业训练",
        component: MajorPlan,
        meta: {
          show: true,
          icon: School,
          role: ["admin", "group_admin"],
          keepAlive: false,
        },
      },
      {
        path: "ShuangYiPlan",
        name: "双一训练",
        component: ShuangYiPlan,
        meta: {
          show: true,
          icon: Document,
          role: ["admin", "group_admin"],
          keepAlive: false,
        },
      },
      {
        path: "StaminaPlan",
        name: "体能训练",
        component: StaminaPlan,
        meta: {
          show: true,
          icon: Stamp,
          role: ["admin", "group_admin"],
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/my",
    name: "我的训练",
    meta: {
      show: true,
      icon: Stamp,
      role: ["admin", "group_admin", "user"],
      keepAlive: false,
    },
    children: [
      {
        path: "MyMajorPlan",
        name: "我的专业训练",
        component: MyMajorPlan,
        meta: {
          show: true,
          icon: School,
          role: ["admin", "group_admin", "user"],
          keepAlive: false,
        },
      },
      {
        path: "MyShuangYiPlan",
        name: "我的双一训练",
        component: MyShuangYiPlan,
        meta: {
          show: true,
          icon: Document,
          role: ["admin", "group_admin", "user"],
          keepAlive: false,
        },
      },
      {
        path: "MyStaminaPlan",
        name: "我的体能训练",
        component: MyStaminaPlan,
        meta: {
          show: true,
          icon: Stamp,
          role: ["admin", "group_admin", "user"],
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/qaSystem",
    name: "问答系统",
    meta: {
      show: true,
      icon: Stamp,
      role: ["admin", "group_admin", "user"],
      keepAlive: false,
    },
    children: [
      {
        path: "StudySubject",
        name: "科目维护",
        component: StudySubject,
        meta: {
          show: true,
          icon: Document,
          role: ["admin"],
          keepAlive: false,
        },
      },
      {
        path: "Question",
        name: "题库维护",
        component: Question,
        meta: {
          show: true,
          icon: Document,
          role: ["admin"],
          keepAlive: false,
        },
      },
      {
        path: "Quiz",
        name: "在线答题",
        component: Quiz,
        meta: {
          show: true,
          icon: Document,
          role: ["admin", "group_admin", "user"],
          keepAlive: false,
        },
      },
      {
        path: "ErrorAnswer",
        name: "错题记录",
        component: ErrorAnswer,
        meta: {
          show: true,
          icon: Document,
          role: ["admin", "group_admin", "user"],
          keepAlive: false,
        },
      },
      {
        path: "ScoreStatistics",
        name: "成绩统计",
        component: ScoreStatistics,
        meta: {
          show: true,
          icon: Document,
          role: ["admin", "group_admin", "user"],
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: "/Feedback",
    name: "意见箱",
    component: Feedback,
    meta: {
      show: true,
      icon: Message,
      role: ["admin", "group_admin", "user"],
      keepAlive: false,
    },
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
