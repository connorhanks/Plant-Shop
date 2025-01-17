<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isHovered = ref(false);

const funnyPhrases = [
  "🌿 Where plant nerds unite!",
  "🪴 Tales from the potting bench",
  "🌱 Warning: Contains plant puns",
  "🍃 Leaf through our stories",
  "🌺 Blooming with inspiration",
];

const randomPhrase =
  funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
</script>

<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="router.push('/blogs')"
    class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl max-w-4xl mx-auto my-16"
  >
    <div class="relative">
      <!-- Fun wavy divider -->
      <div class="absolute -bottom-1 left-0 right-0 h-16 z-10">
        <svg
          viewBox="0 0 1440 320"
          class="absolute bottom-0 text-white fill-current"
        >
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <!-- Background pattern -->
      <div
        class="absolute inset-0 bg-[url('@/assets/leaf-pattern.svg')] opacity-5"
        :class="{ 'animate-pulse': isHovered }"
      ></div>

      <div class="relative z-10 p-8 md:p-12">
        <div class="max-w-3xl mx-auto text-center">
          <span
            class="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            {{ randomPhrase }}
          </span>

          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Discover Our
            <span class="relative inline-block px-2">
              <span class="relative z-10">Plant Blogs</span>
              <span
                class="absolute bottom-0 left-0 right-0 h-3 bg-primary/20 -rotate-2"
              ></span>
            </span>
          </h2>

          <p class="text-lg text-gray-600 mb-6">
            From care guides to plant parent stories, dive into our world of
            green inspiration!
          </p>

          <div class="flex justify-center gap-4 items-center">
            <div class="flex -space-x-4">
              <div
                class="w-10 h-10 rounded-full bg-[#e1f3e1] flex items-center justify-center"
              >
                <span class="text-lg">🌿</span>
              </div>
              <div
                class="w-10 h-10 rounded-full bg-[#f7e8d0] flex items-center justify-center"
              >
                <span class="text-lg">🪴</span>
              </div>
              <div
                class="w-10 h-10 rounded-full bg-[#d0e8f7] flex items-center justify-center"
              >
                <span class="text-lg">🌱</span>
              </div>
            </div>

            <button
              class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 group"
            >
              Read Our Blogs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}
</style>
