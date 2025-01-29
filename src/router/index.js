import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SustainabilityView from "@/views/SustainabilityView.vue";
import BlogsView from "@/views/BlogsView.vue";
import BlogDetailView from "@/views/BlogDetailView.vue";
import PlantDetails from "@/views/PlantDetails.vue";
import AllPlantsView from "@/views/AllPlantsView.vue";
import AboutUs from "@/views/AboutUs.vue";
import Contact from "@/views/Contact.vue";

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
      path: "/plants",
      name: "AllPlants",
      component: AllPlantsView,
    },
    {
      path: "/plants/:id",
      name: "PlantDetails",
      component: PlantDetails,
    },
    {
      path: "/about",
      name: "about",
      component: AboutUs,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
  ],
});

export default router;
