<script setup>
import { onMounted } from "vue";
import { useBlogsStore } from "@/stores/blogs";

const blogsStore = useBlogsStore();

onMounted(() => {
  blogsStore.fetchBlogs();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Blog List Header -->
    <header
      class="bg-primary text-white py-16 md:py-24 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[url('@/assets/leaf-pattern.svg')] opacity-10"
      ></div>
      <div class="container mx-auto px-4 relative">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">
          Explore the World of <span class="scribble-underline">Plants</span>
        </h1>
        <p class="text-lg md:text-xl text-center max-w-2xl mx-auto">
          Dive into our collection of tips, tricks, and stories to nurture your
          green thumb and elevate your plant journey!
        </p>
      </div>
    </header>

    <!-- Blog List -->
    <div class="container mx-auto px-4 py-16">
      <div v-if="blogsStore.loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
        ></div>
      </div>

      <div v-else-if="blogsStore.error" class="text-center py-12 text-red-600">
        {{ blogsStore.error }}
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link
          v-for="blog in blogsStore.blogs"
          :key="blog.id"
          :to="{ name: 'blog-detail', params: { id: blog.id } }"
          class="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="blog.image"
              :alt="blog.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span>{{ blog.date }}</span>
              <span>•</span>
              <span>{{ blog.readTime }}</span>
            </div>
            <h2
              class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors"
            >
              {{ blog.title }}
            </h2>
            <p class="text-gray-600">{{ blog.subtitle }}</p>
            <div
              class="mt-4 inline-flex items-center text-primary font-semibold"
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
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
