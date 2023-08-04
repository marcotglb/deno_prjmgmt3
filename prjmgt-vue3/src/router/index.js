import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Deliverables from "@/components/deliverable/Deliverables.vue";
import About from "@/views/About.vue";
import Users from "@/components/user/Users.vue";
import NotFound from "@/views/NotFound.vue";
import TopMenu from "@/views/TopMenu.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/deliverables",
    name: "Deliverables",
    component: Deliverables
  },
  {
    path: "/users/:top",
    name: "Users",
    component: Users,
    props: true
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/topmenu",
    name: "TopMenu",
    component: TopMenu,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
