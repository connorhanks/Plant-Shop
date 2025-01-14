<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const trendingPlants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    nickname: "Swiss Cheese Plant",
    price: 35.99,
    trend: "+127% this week",
    image: "/images/monstera-deliciosa.webp",
    badge: "Most Loved",
  },
  {
    id: 2,
    name: "Flamingo Flower Pink",
    nickname: "Anthurium Andraeanum",
    price: 29.99,
    trend: "+89% this week",
    image: "/images/flamingo-flower-pink.webp",
    badge: "Instagram Favorite",
  },
  {
    id: 3,
    name: "Calathea Rattlesnake",
    nickname: "Goeppertia Insignis",
    price: 24.99,
    trend: "+65% this week",
    image: "/images/calathea-rattlesnake-plant.webp",
    badge: "Beginner Friendly",
  },
  {
    id: 4,
    name: "Hoya Heart",
    nickname: "Sweetheart Plant",
    price: 15.99,
    trend: "+92% this week",
    image: "/images/hoya-heart.webp",
    badge: "Trending",
  },
  {
    id: 5,
    name: "Chinese Money Plant",
    nickname: "Pilea Peperomioides",
    price: 19.99,
    trend: "+73% this week",
    image: "/images/chinese-money-plant.webp",
    badge: "Best Seller",
  },
];

const currentIndex = ref(0);
const autoScrollInterval = ref(null);
const isHovered = ref(false);

const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    if (!isHovered.value) {
      currentIndex.value = (currentIndex.value + 1) % trendingPlants.length;
    }
  }, 3000);
};

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
  }
};

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
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

    <!-- Full-width Carousel -->
    <div
      class="relative max-w-[90vw] mx-auto"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="overflow-visible">
        <div
          class="flex transition-transform duration-700 ease-in-out p-4"
          :style="{ transform: `translateX(-${currentIndex * 20}%)` }"
        >
          <!-- Duplicate plants array for infinite scroll effect -->
          <div
            v-for="plant in [...trendingPlants, ...trendingPlants]"
            :key="`${plant.id}-${Math.random()}`"
            class="w-[300px] flex-shrink-0 mx-4"
          >
            <div
              class="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:z-10"
            >
              <!-- Image Container -->
              <div class="relative aspect-square">
                <img
                  :src="plant.image"
                  :alt="plant.name"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute top-4 left-4 bg-[#ca6a14] text-white px-3 py-1 rounded-full text-sm"
                >
                  {{ plant.badge }}
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <div
                  class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm w-fit mb-3"
                >
                  {{ plant.trend }}
                </div>
                <h3 class="text-xl font-bold mb-1">{{ plant.name }}</h3>
                <p class="text-gray-600 text-sm mb-3">{{ plant.nickname }}</p>
                <div class="flex justify-between items-center">
                  <p class="text-2xl font-bold text-[#056f75]">
                    £{{ plant.price }}
                  </p>
                  <button
                    class="bg-[#056f75] text-white px-4 py-2 rounded-sm hover:bg-[#034c50] transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots Navigation -->
      <div class="flex justify-center gap-2 mt-8">
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
    18px;
  padding-bottom: 8px;
}

@media (max-width: 768px) {
  .scribble-underline {
    background-size: 150px 12px;
    padding-bottom: 6px;
  }
}
</style>
