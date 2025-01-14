<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const plantId = route.params.id;
const selectedSize = ref("70cm");
const selectedPot = ref("nursery");

// This would typically come from an API or store
const plant = ref({
  id: 1,
  name: "Monstera Deliciosa",
  nickname: "Swiss Cheese Plant",
  price: 35.99,
  trend: "+127% this week",
  badge: "Most Loved",
  description:
    "This giant version of the Swiss Cheese Plant will be the piece de resistance in your home. These beautiful plants with jumbo size, dark green and glossy leaves have lots of large oval fenestrations, and will make the perfect statement stand-out plant anywhere indoors.",
  images: [
    "/images/plants/monstera-deliciosa/main.webp",
    "/images/plants/monstera-deliciosa/lifestyle.webp",
    "/images/plants/monstera-deliciosa/detail.webp",
    "/images/plants/monstera-deliciosa/care.webp",
  ],
});

const sizes = [
  { label: "70cm", potSize: "19cm pot", price: 35.99 },
  { label: "90cm", potSize: "24cm pot", price: 45.99 },
  { label: "140cm", potSize: "32cm pot", price: 55.99 },
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
  <div class="bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Column - Images -->
        <div class="space-y-4">
          <!-- Main Image Grid -->
          <div class="hidden lg:grid grid-cols-2 gap-5">
            <div
              v-for="(image, index) in plant.images"
              :key="index"
              class="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                :src="image"
                :alt="`${plant.name} ${index + 1}`"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Mobile Slider (only visible on small screens) -->
          <div class="lg:hidden">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                :src="plant.image"
                :alt="plant.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="grid grid-cols-4 gap-4 mt-4">
              <div
                v-for="(image, index) in plant.images"
                :key="index"
                class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  :src="image"
                  :alt="`${plant.name} ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Product Details -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ plant.name }}</h1>
            <p class="text-lg text-gray-600">{{ plant.nickname }}</p>
          </div>

          <div class="border-t border-b py-4">
            <h2 class="text-xl font-bold mb-4">£{{ totalPrice }}</h2>

            <!-- Size Selection -->
            <div class="mb-6">
              <h3 class="font-bold mb-3">Select Size</h3>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="size in sizes"
                  :key="size.label"
                  @click="selectedSize = size.label"
                  class="p-4 border rounded-lg text-center"
                  :class="{
                    'border-[#056f75] text-[#056f75]':
                      selectedSize === size.label,
                  }"
                >
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
                    'border-[#056f75] text-[#056f75]': selectedPot === pot.id,
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
              class="w-full bg-[#056f75] text-white py-4 rounded-lg font-bold hover:bg-[#034c50] transition-colors"
            >
              Add to Cart - £{{ totalPrice }}
            </button>
          </div>

          <!-- Plant Details -->
          <div class="space-y-4">
            <h3 class="font-bold text-xl">About this plant</h3>
            <p class="text-gray-600">{{ plant.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
