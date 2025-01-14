<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import RandomLoader from "@/components/RandomLoader.vue";

const route = useRoute();
const router = useRouter();
const plantId = route.params.id;
const selectedSize = ref("70cm");
const selectedPot = ref("nursery");
const plant = ref(null);
const loading = ref(true);
const error = ref(null);

// Cache for plants data
const plantsCache = ref(new Map());

async function fetchPlants() {
  // Check cache first
  if (plantsCache.value.size > 0) {
    console.log("Using cached plants data");
    return Array.from(plantsCache.value.values());
  }

  const response = await fetch("http://localhost:3001/plants");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const plants = await response.json();

  // Cache the plants
  plants.forEach((plant) => {
    plantsCache.value.set(plant.id, plant);
  });

  return plants;
}

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(`http://localhost:3001/plants/${plantId}`);
    if (!response.ok) {
      throw new Error(`Plant with ID ${plantId} not found`);
    }

    const data = await response.json();
    plant.value = data;
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching plant:", err);
  } finally {
    loading.value = false;
  }
});

const sizes = [
  {
    label: "70cm",
    potSize: "19cm pot",
    price: 35.99,
    icon: "/assets/images/small-plant-icon.svg",
  },
  {
    label: "90cm",
    potSize: "24cm pot",
    price: 45.99,
    icon: "/assets/images/small-plant-icon.svg",
  },
  {
    label: "140cm",
    potSize: "32cm pot",
    price: 55.99,
    icon: "/assets/images/large-plant-icon.svg",
  },
];

const pots = [
  {
    id: "nursery",
    name: "Nursery Pot",
    price: 0,
    image: "/images/pots/nursery-pot.webp",
    description: "Basic plastic growing pot",
  },
  {
    id: "tivoli-pot-grey",
    name: "Tivoli Pot Grey",
    price: 15.99,
    image: "/images/pots/tivoli-pot-grey.webp",
    description: "Modern white ceramic pot",
  },
  {
    id: "tivoli-pot-earth",
    name: "Tivoli Pot Earth",
    price: 15.99,
    image: "/images/pots/tivoli-pot-earth.webp",
    description: "Sleek black ceramic pot",
  },
];

const totalPrice = computed(() => {
  const basePrice =
    sizes.find((s) => s.label === selectedSize.value)?.price || 0;
  const potPrice = pots.find((p) => p.id === selectedPot.value)?.price || 0;
  return (basePrice + potPrice).toFixed(2);
});
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
    <RandomLoader />
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="text-center py-8">
    <div class="text-red-600 mb-4">{{ error }}</div>
    <button
      @click="router.push('/')"
      class="bg-[#056f75] text-white px-6 py-2 rounded hover:bg-[#034c50] transition-colors"
    >
      Return Home
    </button>
  </div>

  <!-- Success State -->
  <div v-else-if="plant" class="lg:flex items-start">
    <!-- Left Column - Image Grid -->
    <div class="lg:w-3/5 hidden lg:flex flex-wrap -m-2.5">
      <div
        v-for="(image, index) in plant.images"
        :key="index"
        class="w-1/2 p-2.5"
      >
        <img
          :src="image"
          :alt="`${plant.name} ${index + 1}`"
          class="block w-full"
          width="280"
          height="350"
          loading="lazy"
          crossorigin
        />
      </div>
    </div>

    <!-- Right Column - Plant Details -->
    <div class="lg:w-2/5 lg:pl-16 py-5">
      <div class="pr-20 md:pr-24">
        <h3
          class="inline-block uppercase text-xs lg:text-sm tracking-wider mr-2 lg:mr-4 font-sans"
        >
          {{ plant.nickname }}
        </h3>
        <!-- Star Rating -->
        <div class="inline-block">
          <span v-for="n in 5" :key="n" class="icon-star pr-0.5"></span>
        </div>
        <!-- Love Sticker -->
        <img
          src="/assets/stickers/love-bubble.svg"
          alt="Love sticker"
          class="float-right w-16 lg:w-20 -mt-14 -mr-20 lg:-mr-24"
          loading="lazy"
          crossorigin
        />
      </div>

      <h1 class="text-3xl lg:text-4xl my-3">{{ plant.name }}</h1>
      <div class="font-serif text-2xl">£{{ totalPrice }}</div>

      <!-- Size Selection -->
      <div class="my-6">
        <h3 class="font-bold mb-3">Select Size</h3>
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="size in sizes"
            :key="size.label"
            @click="selectedSize = size.label"
            class="p-4 border rounded-lg text-center"
            :class="{
              'border-green text-green': selectedSize === size.label,
            }"
          >
            <img
              :src="size.icon"
              :alt="`${size.label} plant size`"
              class="h-12 w-12 mx-auto mb-2"
            />
            <div class="font-bold">{{ size.label }}</div>
            <div class="text-sm text-gray-600">{{ size.potSize }}</div>
            <div class="mt-2 font-bold">£{{ size.price }}</div>
          </button>
        </div>
      </div>

      <!-- Pot Selection -->
      <div class="mb-6">
        <h3 class="font-bold mb-3">Select Pot</h3>
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="pot in pots"
            :key="pot.id"
            @click="selectedPot = pot.id"
            class="p-4 border rounded-lg text-center"
            :class="{
              'border-green text-green': selectedPot === pot.id,
            }"
          >
            <img
              :src="pot.image"
              :alt="pot.name"
              class="w-full h-32 object-cover rounded-lg mb-2"
            />
            <div class="font-bold">{{ pot.name }}</div>
            <div class="mt-2">
              {{ pot.price === 0 ? "Free" : `+£${pot.price}` }}
            </div>
          </button>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="w-full bg-orange text-white hover:bg-yellow hover:text-white transition duration-300 font-bold uppercase leading-none text-sm tracking-wider py-8 px-7"
      >
        <span>£{{ totalPrice }} — Add to Bag</span>
        <span class="icon-bag text-xl ml-4 align-bottom"></span>
      </button>

      <!-- Free Delivery Notice -->
      <div class="flex my-8 text-sm font-bold leading-none justify-center">
        <img
          src="/assets/images/free-delivery-icon.svg"
          alt="Free delivery"
          loading="lazy"
          crossorigin
        />
        <span class="pl-2">FREE scheduled deliveries on orders over £50</span>
      </div>

      <!-- Plant Description -->
      <div class="my-8">
        <h3 class="font-bold text-xl mb-4">About this plant</h3>
        <p class="text-gray-600">{{ plant.description }}</p>
      </div>

      <!-- Bottom Icons -->
      <div class="flex mt-12">
        <div class="w-1/3 p-2 text-center">
          <img
            src="/assets/images/price-match-promise.svg"
            alt="Price match promise"
            class="mx-auto mb-4 h-12 w-12"
            loading="lazy"
            crossorigin
          />
          <p class="text-sm font-bold mb-0">Price match promise</p>
        </div>
        <div class="w-1/3 p-2 text-center">
          <img
            src="/assets/images/best-quality.svg"
            alt="Best quality"
            class="mx-auto mb-4 h-12 w-12"
            loading="lazy"
            crossorigin
          />
          <p class="text-sm font-bold mb-0">Best quality plants guaranteed</p>
        </div>
        <div class="w-1/3 p-2 text-center">
          <img
            src="/assets/images/delivery-van.svg"
            alt="Delivery van"
            class="mx-auto mb-4 h-12 w-12"
            loading="lazy"
            crossorigin
          />
          <p class="text-sm font-bold mb-0">Delivered to your door with care</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Fallback State -->
  <div v-else class="text-center py-8">
    <div class="text-gray-600 mb-4">No plant information available</div>
    <button
      @click="router.push('/')"
      class="bg-[#056f75] text-white px-6 py-2 rounded hover:bg-[#034c50] transition-colors"
    >
      Return Home
    </button>
  </div>
</template>

<style scoped>
.custom-radio-input {
  @apply relative border border-gray-200 rounded-lg h-24 cursor-pointer transition-colors duration-300;
}

.custom-radio-input input {
  @apply absolute opacity-0 w-full h-full cursor-pointer;
}

.custom-radio-input input:checked + label {
  @apply border-2 border-green rounded-lg;
}

.icon-star::before {
  content: "★";
}

.icon-bag::before {
  content: "🛍";
}

.icon-info-circle-solid::before {
  content: "ℹ";
}
</style>
