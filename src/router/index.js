import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlantDetails from "../views/PlantDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/plant/:id",
      name: "PlantDetails",
      component: PlantDetails,
    },
  ],
});

export default router;
