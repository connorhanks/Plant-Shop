<template>
  <div class="relative overflow-hidden">
    <div
      class="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar"
      ref="scrollContainer"
      @scroll="handleScroll"
    >
      <div
        v-for="(plant, index) in plants"
        :key="plant.id"
        class="snap-center w-full flex-shrink-0 px-6"
        :ref="(el) => (slides[index] = el)"
      >
        <div class="max-w-[300px] mx-auto">
          <router-link
            :to="{ name: 'PlantDetails', params: { id: plant.id } }"
            class="block"
          >
            <div class="bg-white rounded-lg shadow-xl overflow-hidden">
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
                  <p class="text-2xl font-bold text-primary">
                    £{{ plant.price }}
                  </p>
                  <button
                    class="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/80 transition-colors text-sm"
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

    <!-- Dots -->
    <div class="flex justify-center gap-2 mt-8">
      <button
        v-for="(_, index) in plants"
        :key="index"
        @click="scrollToSlide(index)"
        class="w-2 h-2 rounded-full transition-colors"
        :class="index === activeIndex ? 'bg-primary' : 'bg-gray-300'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  plants: {
    type: Array,
    required: true,
  },
});

const scrollContainer = ref(null);
const activeIndex = ref(0);
const slides = ref([]);
const autoScrollInterval = ref(null);
const isHovered = ref(false);

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const scrollLeft = scrollContainer.value.scrollLeft;
  const slideWidth = scrollContainer.value.offsetWidth;
  activeIndex.value = Math.round(scrollLeft / slideWidth);
};

const scrollToSlide = (index) => {
  if (!scrollContainer.value) return;

  const slideWidth = scrollContainer.value.offsetWidth;
  scrollContainer.value.scrollTo({
    left: slideWidth * index,
    behavior: "smooth",
  });
};

const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    if (!isHovered.value && scrollContainer.value) {
      const nextIndex = (activeIndex.value + 1) % props.plants.length;
      scrollToSlide(nextIndex);
    }
  }, 3000); // Change slide every 3 seconds
};

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
  }
};

onMounted(() => {
  // Initialize slides array
  slides.value = new Array(props.plants.length).fill(null);
  startAutoScroll();
});

onUnmounted(() => {
  stopAutoScroll();
});

const handleImageError = (e) => {
  console.error("Image failed to load:", e.target.src);
};
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-center {
  scroll-snap-align: center;
}
</style>
