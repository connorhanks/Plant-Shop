<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import SproutLoader from "@/components/SproutLoader.vue";

const plants = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

// Filter states
const selectedCategories = ref([]);
const searchQuery = ref("");
const sortBy = ref("name"); // Options: name, price-low-high, price-high-low

// Get unique categories from all plants
const availableCategories = computed(() => {
  const categories = new Set();
  plants.value.forEach((plant) => {
    plant.categories.forEach((category) => categories.add(category));
  });
  return Array.from(categories);
});

// Filtered and sorted plants
const filteredPlants = computed(() => {
  let result = [...plants.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (plant) =>
        plant.name.toLowerCase().includes(query) ||
        plant.nickname.toLowerCase().includes(query)
    );
  }

  // Apply category filters
  if (selectedCategories.value.length > 0) {
    result = result.filter((plant) =>
      plant.categories.some((category) =>
        selectedCategories.value.includes(category)
      )
    );
  }

  // Apply sorting
  switch (sortBy.value) {
    case "price-low-high":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
});

const fetchPlants = async () => {
  try {
    loading.value = true;
    error.value = null;
    const baseUrl = "http://192.168.1.72:3001";
    const response = await fetch(`${baseUrl}/plants`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    plants.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching plants:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPlants();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-primary text-white py-16 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('@/assets/leaf-pattern.svg')] opacity-10"
      ></div>
      <div class="container mx-auto px-4 relative">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-4">
          Our <span class="scribble-underline">Plants</span>
        </h1>
        <p class="text-lg text-center max-w-2xl mx-auto">
          Find your perfect plant companion from our carefully curated
          collection
        </p>
      </div>
    </header>

    <!-- Filters and Plants Grid -->
    <div class="container mx-auto px-4 py-8">
      <!-- Filters -->
      <div class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search plants..."
            class="w-full p-3 border rounded-lg"
          />
        </div>

        <!-- Categories -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in availableCategories"
            :key="category"
            @click="
              selectedCategories.includes(category)
                ? (selectedCategories = selectedCategories.filter(
                    (c) => c !== category
                  ))
                : selectedCategories.push(category)
            "
            class="px-3 py-1 rounded-full text-sm"
            :class="
              selectedCategories.includes(category)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            {{ category }}
          </button>
        </div>

        <!-- Sort -->
        <select v-model="sortBy" class="w-full p-3 border rounded-lg">
          <option value="name">Sort by Name</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex justify-center items-center min-h-[400px]"
      >
        <SproutLoader />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="fetchPlants"
          class="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>

      <!-- Plants Grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="plant in filteredPlants"
          :key="plant.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <router-link :to="{ name: 'PlantDetails', params: { id: plant.id } }">
            <div class="relative aspect-square">
              <img
                :src="plant.images[0]"
                :alt="plant.name"
                class="w-full h-full object-cover"
              />
              <div
                v-if="plant.badge"
                class="absolute top-4 left-4 bg-[#ca6a14] text-white px-3 py-1 rounded-full text-sm"
              >
                {{ plant.badge }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-1">{{ plant.name }}</h3>
              <p class="text-gray-600 text-sm mb-2">{{ plant.nickname }}</p>
              <div class="flex justify-between items-center">
                <p class="text-xl font-bold text-primary">£{{ plant.price }}</p>
                <button
                  class="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/80 transition-colors text-sm"
                  @click.prevent
                >
                  View Details
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- No Results -->
      <div
        v-if="filteredPlants.length === 0 && !loading && !error"
        class="text-center py-12"
      >
        <p class="text-gray-600">No plants found matching your criteria</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
