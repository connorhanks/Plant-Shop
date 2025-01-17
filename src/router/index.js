import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlantDetails from "../views/PlantDetails.vue";
import SustainabilityView from "../views/SustainabilityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: "/sustainability",
      name: "sustainability",
      component: SustainabilityView,
    },
  ],
});

export default router;
