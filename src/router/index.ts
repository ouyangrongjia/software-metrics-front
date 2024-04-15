import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import WelcomePage from "@/views/public/WelcomePage.vue";
import MainPage from "@/views/public/MainPage.vue";
import CK_XML from "@/views/functions/CK_XML.vue";
import CK_Java from "@/views/functions/CK_Java.vue";
import Traditional from "@/views/functions/Traditional.vue";
import LK from "@/views/functions/LK.vue";
import Expand from "@/views/functions/Expand.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ' ',
    component: WelcomePage
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/CK_Java',
    component: MainPage,
    children: [
      // {
      //   path: '/CK_XML',
      //   name: 'CK_XML',
      //   component: CK_XML
      // },
      {
        path: '/CK_Java',
        name: 'CK_Java',
        component: CK_Java
      },
      {
        path: '/Traditional',
        name: 'Traditional',
        component: Traditional
      },
      {
        path: '/LK',
        name: 'LK',
        component: LK
      },
      {
        path: '/Expand',
        name: 'Expand',
        component: Expand
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
