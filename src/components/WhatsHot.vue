<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import MobileCarousel from "./MobileCarousel.vue";

const trendingPlants = ref([]);
const currentIndex = ref(0);
const autoScrollInterval = ref(null);
const isHovered = ref(false);
const loading = ref(true);
const error = ref(null);
const isMobile = ref(window.innerWidth < 768);

const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    if (!isHovered.value && trendingPlants.value.length > 0) {
      currentIndex.value =
        (currentIndex.value + 1) % trendingPlants.value.length;
    }
  }, 3000);
};

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
  }
};

const fetchTrendingPlants = async () => {
  try {
    loading.value = true;
    error.value = null;
    const baseUrl = "http://192.168.1.72:3001";
    console.log("Fetching plants from:", baseUrl);
    const response = await fetch(`${baseUrl}/plants`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch plants: ${response.status} ${response.statusText}`
      );
    }
    const plants = await response.json();
    if (Array.isArray(plants) && plants.length > 0) {
      trendingPlants.value = plants;
      console.log("Fetched plants:", plants.length);
    } else {
      throw new Error("No plants data received");
    }
  } catch (error) {
    console.error("Error fetching trending plants:", error);
    error.value = error.message;
  } finally {
    loading.value = false;
  }
};

const handleImageError = (e) => {
  console.error("Image failed to load:", e.target.src);
  // You could set a fallback image here if needed
  // e.target.src = '/fallback-image.jpg';
};

// Add resize listener
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  fetchTrendingPlants();
  startAutoScroll();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  stopAutoScroll();
});
</script>

<template>
  <section class="py-16 px-6 md:px-10 bg-[#f5f5f5] overflow-hidden">
    <h2 class="text-4xl md:text-5xl text-center mb-4 text-[#056f75] font-bold">
      What's <span class="scribble-underline">hot</span>
    </h2>
    <p class="text-center text-gray-600 mb-12 font-medium">
      Trending plants our community is loving right now
    </p>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-[#056f75] border-t-transparent"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="text-center text-red-600 min-h-[200px] flex items-center justify-center"
    >
      <div>
        <p class="mb-2">{{ error }}</p>
        <button @click="fetchTrendingPlants" class="text-[#056f75] underline">
          Try Again
        </button>
      </div>
    </div>

    <!-- Mobile Carousel -->
    <MobileCarousel v-else-if="isMobile" :plants="trendingPlants" />

    <!-- Desktop Carousel -->
    <div
      v-else
      class="relative mx-auto"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="overflow-visible">
        <div
          class="flex transition-transform duration-700 ease-in-out p-4"
          :style="{ transform: `translateX(-${currentIndex * 20}%)` }"
        >
          <div
            v-for="plant in [...trendingPlants, ...trendingPlants]"
            :key="`${plant.id}-${Math.random()}`"
            class="w-[300px] flex-shrink-0 mx-4"
          >
            <router-link
              :to="{ name: 'PlantDetails', params: { id: plant.id } }"
              class="block"
            >
              <div
                class="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:z-10"
              >
                <div class="relative aspect-square">
                  <img
                    :src="plant.images ? plant.images[0] : ''"
                    :alt="plant.name"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <div
                    class="absolute top-4 left-4 bg-[#ca6a14] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {{ plant.badge }}
                  </div>
                </div>

                <div class="p-6">
                  <h3 class="text-xl font-bold mb-1">{{ plant.name }}</h3>
                  <p class="text-gray-600 text-sm mb-3">{{ plant.nickname }}</p>
                  <div class="flex justify-between items-center">
                    <p class="text-2xl font-bold text-[#056f75]">
                      £{{ plant.price }}
                    </p>
                    <button
                      class="bg-[#056f75] text-white px-4 py-2 rounded-sm hover:bg-[#034c50] transition-colors text-sm"
                      @click.prevent
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Dots Navigation -->
      <div
        v-if="trendingPlants.length > 0"
        class="flex justify-center gap-2 mt-8"
      >
        <button
          v-for="(_, index) in trendingPlants"
          :key="index"
          @click="currentIndex = index"
          class="w-2 h-2 rounded-full transition-colors"
          :class="
            index === currentIndex % trendingPlants.length
              ? 'bg-[#056f75]'
              : 'bg-gray-300'
          "
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}

.scribble-underline {
  background: url(@/assets/scribble-underline.svg) no-repeat 100% 100%/221px
    24px;
  padding-bottom: 14px;
}

@media (max-width: 768px) {
  .scribble-underline {
    background-size: 150px 18px;
    padding-bottom: 12px;
  }
}
</style>
