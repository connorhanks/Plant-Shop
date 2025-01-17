<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBlogsStore } from "@/stores/blogs";

const route = useRoute();
const blogsStore = useBlogsStore();

const blog = computed(() => {
  return blogsStore.blogs.find((b) => b.id === route.params.id);
});

// SVG icons object
const icons = {
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>`,
  waterDrop: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12a8 8 0 01-8 8c-4.418 0-8-3.582-8-8 0-5 6-9 8-9s8 4 8 9z" />
  </svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
  </svg>`,
};
</script>

<template>
  <div v-if="blog" class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <header class="relative h-[60vh] overflow-hidden">
      <img
        :src="blog.image"
        :alt="blog.title"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
      ></div>
      <div class="absolute inset-0 flex items-end">
        <div class="container mx-auto px-4 pb-16">
          <div class="max-w-3xl">
            <div class="flex items-center gap-4 text-sm text-white/80 mb-3">
              <span>{{ blog.date }}</span>
              <span>•</span>
              <span>{{ blog.readTime }}</span>
            </div>
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              {{ blog.title }}
            </h1>
            <p class="text-xl text-white/90">{{ blog.subtitle }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto">
        <div v-for="(section, index) in blog.content" :key="index" class="mb-8">
          <!-- Headings -->
          <template v-if="section.type === 'heading'">
            <div class="flex items-center gap-3 mb-0">
              <span
                v-if="section.icon"
                class="w-6 h-6 text-primary"
                :class="section.iconClass"
                v-html="icons[section.icon]"
              />
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ section.text }}
              </h2>
            </div>
          </template>

          <!-- Subheadings -->
          <template v-if="section.type === 'subheading'">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              {{ section.text }}
            </h3>
          </template>

          <!-- Paragraphs -->
          <template v-if="section.type === 'paragraph'">
            <p class="text-lg text-gray-700 leading-relaxed">
              {{ section.text }}
            </p>
          </template>

          <!-- Quotes -->
          <template v-if="section.type === 'quote'">
            <blockquote class="my-8 pl-6 border-l-4 border-primary">
              <div class="relative">
                <svg
                  class="absolute -top-4 -left-4 h-8 w-8 text-primary/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                  />
                </svg>
                <p class="text-xl italic text-gray-700 mb-2">
                  {{ section.text }}
                </p>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span class="font-semibold">{{ section.author }}</span>
                  <span v-if="section.source" class="text-gray-400">|</span>
                  <span v-if="section.source" class="italic">{{
                    section.source
                  }}</span>
                </div>
              </div>
            </blockquote>
          </template>

          <!-- Tips -->
          <template v-if="section.type === 'tips'">
            <div class="bg-mintgreen rounded-lg p-6 my-8">
              <h3
                v-if="section.title"
                class="font-semibold text-lg mb-4 text-gray-900"
              >
                {{ section.title }}
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="(tip, tipIndex) in section.items"
                  :key="tipIndex"
                  class="flex items-start gap-3"
                >
                  <svg
                    class="w-5 h-5 text-primary flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span class="text-gray-700">{{ tip }}</span>
                </li>
              </ul>
            </div>
          </template>

          <!-- Callouts -->
          <template v-if="section.type === 'callout'">
            <div
              class="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg"
            >
              <div class="flex items-start gap-4">
                <svg
                  class="w-6 h-6 text-primary flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-gray-700">{{ section.text }}</p>
              </div>
            </div>
          </template>
        </div>

        <!-- Back Button -->
        <div class="mt-16">
          <router-link
            to="/blogs"
            class="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blogs
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quote-mark {
  font-size: 4em;
  position: absolute;
  top: -0.2em;
  left: -0.5em;
  color: rgba(0, 0, 0, 0.1);
}
</style>
