<script setup>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import CartDrawer from "@/components/CartDrawer.vue";

const router = useRouter();

// Scroll to top on route change
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
</script>

<template>
  <CartDrawer />
  <div class="min-h-screen">
    <Navbar />
    <Banner />
    <router-view></router-view>
    <Footer />
  </div>
</template>
