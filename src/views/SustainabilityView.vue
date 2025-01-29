<script setup>
import { ref, computed, onMounted } from "vue";
import { useBlogsStore } from "@/stores/blogs";

const blogsStore = useBlogsStore();

const initiatives = [
  {
    title: "Zero-Waste Packaging",
    description:
      "Our innovative packaging solutions eliminate single-use plastics, using biodegradable materials and minimal packaging designs.",
    icon: "🌱",
    stats: {
      number: "1,000",
      unit: "kg",
      detail: "of cardboard saved annually",
    },
  },
  {
    title: "Tree Planting Program",
    description:
      "For every order placed, we plant a tree through our partnership with Eden Projects, contributing to global reforestation.",
    icon: "🌳",
    stats: {
      number: "5",
      unit: "",
      detail: "trees planted and counting",
    },
  },
  {
    title: "1% for the Planet",
    description:
      "We're proud members of 1% for the Planet, donating 1% of our sales to environmental nonprofits.",
    icon: "🌍",
    stats: {
      number: "1",
      unit: "%",
      detail: "of sales donated",
    },
  },
];

const sustainabilityBlogs = computed(() => {
  return blogsStore.blogs
    .filter((blog) => blog.category === "sustainability")
    .slice(0, 3);
});

onMounted(() => {
  blogsStore.fetchBlogs();
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="bg-primary text-white py-20 md:py-32 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[url('@/assets/leaf-pattern.svg')] opacity-10"
      ></div>

      <div class="container mx-auto px-4 relative">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">
          Our Commitment to <br />
          <span class="scribble-underline">Sustainability</span>
        </h1>
        <p class="text-lg md:text-xl text-center max-w-2xl mx-auto">
          We're on a mission to make plant parenthood sustainable. Every small
          action counts towards a greener future.
        </p>
      </div>
    </section>

    <!-- Initiatives Section -->
    <section class="py-16 md:py-24 bg-mintgreen">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8 md:gap-12">
          <div
            v-for="(initiative, index) in initiatives"
            :key="index"
            class="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
          >
            <div class="text-4xl mb-4">{{ initiative.icon }}</div>
            <h3 class="text-2xl font-bold text-primary mb-4">
              {{ initiative.title }}
            </h3>
            <p class="text-gray-600 mb-6">{{ initiative.description }}</p>
            <div class="border-t pt-6">
              <div class="text-3xl font-bold text-primary">
                {{ initiative.stats.number }}{{ initiative.stats.unit }}
              </div>
              <div class="text-sm text-gray-500">
                {{ initiative.stats.detail }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Eco Tips Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-primary mb-16"
        >
          Sustainable <span class="scribble-underline">Plant Care</span> Tips
        </h2>

        <!-- Loading State -->
        <div v-if="blogsStore.loading" class="text-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
          ></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="blogsStore.error"
          class="text-center py-12 text-red-600"
        >
          {{ blogsStore.error }}
        </div>

        <!-- No Blogs State -->
        <div
          v-else-if="sustainabilityBlogs.length === 0"
          class="text-center py-12"
        >
          <p class="text-lg text-gray-600">
            Stay tuned! Sustainability tips coming soon. 🌱
          </p>
        </div>

        <!-- Blogs Grid -->
        <div v-else class="grid md:grid-cols-3 gap-8">
          <div
            v-for="blog in sustainabilityBlogs"
            :key="blog.id"
            class="group relative overflow-hidden rounded-lg aspect-square"
          >
            <img
              :src="blog.image"
              :alt="blog.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white"
            >
              <h3 class="text-xl font-bold mb-2">{{ blog.title }}</h3>
              <p
                class="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                {{ blog.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-secondary py-16 text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Join Our Green Journey
        </h2>
        <p class="mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for sustainable gardening tips and updates
          on our environmental initiatives.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            class="px-6 py-3 rounded-sm flex-1 text-gray-800 border border-gray-200 focus:border-primary/30 focus:outline-none transition-colors"
          />
          <button
            class="bg-primary hover:bg-primary/90 px-8 py-3 rounded-sm transition-colors border border-transparent"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.scribble-underline {
  position: relative;
  display: inline-block;
}

.scribble-underline::after {
  content: "";
  position: absolute;
  bottom: -1.2rem;
  left: 0;
  width: 100%;
  height: 1.5rem;
  background: url(@/assets/scribble-underline.svg) no-repeat center bottom;
  background-size: 100% auto;
}

@media (max-width: 768px) {
  .scribble-underline::after {
    height: 1.2rem;
    bottom: -1rem;
  }
}
</style>
