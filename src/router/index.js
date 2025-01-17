import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SustainabilityView from "@/views/SustainabilityView.vue";
import BlogsView from "@/views/BlogsView.vue";
import BlogDetailView from "@/views/BlogDetailView.vue";
import PlantDetails from "@/views/PlantDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sustainability",
      name: "sustainability",
      component: SustainabilityView,
    },
    {
      path: "/blogs",
      name: "blogs",
      component: BlogsView,
    },
    {
      path: "/blogs/:id",
      name: "blog-detail",
      component: BlogDetailView,
    },
    {
      path: "/plants/:id",
      name: "PlantDetails",
      component: PlantDetails,
    },
  ],
});

export default router;
