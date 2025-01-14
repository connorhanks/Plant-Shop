<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const plantId = route.params.id;
const selectedSize = ref("70cm");
const selectedPot = ref("nursery");

// Mock data - replace with API call
const plant = ref({
  id: 5,
  name: "Monstera Deliciosa",
  nickname: "Swiss Cheese Plant",
  scientificName: "Monstera deliciosa",
  price: 35.99,
  categories: [
    "Foliage",
    "Bathroom Plants",
    "Bedroom Plants",
    "Living Room Plants",
  ],
  features: [
    { name: "Easy-care", icon: "@/assets/icons/easy-care.svg" },
    { name: "Indirect sun", icon: "@/assets/icons/indirect-sunlight.svg" },
    { name: "Best-seller", icon: "@/assets/icons/best-seller.svg" },
  ],
  images: [
    "@/assets/plants/monstera1.jpg",
    "@/assets/plants/monstera2.jpg",
    "@/assets/plants/monstera3.jpg",
    "@/assets/plants/monstera4.jpg",
  ],
  description:
    "This giant version of the Swiss Cheese Plant will be the piece de resistance in your home...",
});

const sizes = [
  {
    label: "70cm",
    potSize: "19cm pot",
    price: 35.99,
    icon: "@/assets/icons/small-plant-icon.svg",
  },
  {
    label: "90cm",
    potSize: "24cm pot",
    price: 45.99,
    icon: "@/assets/icons/large-plant-icon.svg",
  },
  {
    label: "140cm",
    potSize: "32cm pot",
    price: 55.99,
    icon: "@/assets/icons/large-plant-icon.svg",
  },
];

const generateSrcSet = (image) => {
  const sizes = [280, 384, 560, 768];
  return sizes.map((size) => `${image}_${size}w.webp ${size}w`).join(", ");
};
</script>

<template>
  <div class="lg:flex items-start">
    <!-- Left Column - Image Grid -->
    <div class="lg:w-3/5 hidden lg:flex flex-wrap -m-2.5">
      <div
        v-for="(image, index) in plant.images"
        :key="index"
        class="w-1/2 p-2.5"
      >
        <img
          :src="image"
          :srcset="generateSrcSet(image)"
          sizes="34vw"
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
          {{ plant.scientificName }}
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

      <!-- Price -->
      <div class="font-serif text-2xl">£{{ plant.price }}</div>

      <!-- Categories -->
      <div class="my-4 text-xs font-bold leading-none">
        <a
          v-for="category in plant.categories"
          :key="category"
          :href="`/indoor-plants/${category.toLowerCase()}`"
          class="inline-block mr-2 mb-2 rounded-full bg-mintgreen text-green hover:bg-green hover:text-white p-3"
        >
          {{ category }}
        </a>
      </div>

      <!-- Features -->
      <div class="my-4 inline-flex flex-wrap text-sm font-bold leading-none">
        <div
          v-for="feature in plant.features"
          :key="feature.name"
          class="flex items-center mr-6 mb-4"
        >
          <img
            :src="feature.icon"
            :alt="feature.name"
            class="w-6"
            loading="lazy"
            crossorigin
          />
          <span class="pl-2">{{ feature.name }}</span>
        </div>
      </div>

      <!-- Size Selection -->
      <div class="font-bold mb-2">
        Plant height
        <a class="text-orange hover:text-yellow text-sm ml-1.5 cursor-pointer">
          <span class="icon-info-circle-solid"></span>
        </a>
      </div>
      <div class="flex flex-wrap -mx-2 mb-8">
        <div v-for="size in sizes" :key="size.label" class="w-1/3 max-w-52 p-2">
          <div class="custom-radio-input">
            <input
              type="radio"
              :id="size.label"
              v-model="selectedSize"
              :value="size.label"
              name="size"
            />
            <label :for="size.label">
              <div class="sr-only">
                {{ size.label }} height, {{ size.potSize }}
              </div>
            </label>
            <div
              class="absolute flex flex-wrap justify-center content-center top-0 left-0 w-full h-full p-3 text-center"
            >
              <img
                :src="size.icon"
                :alt="size.label"
                class="hidden xs:block w-5"
                loading="lazy"
                crossorigin
              />
              <div class="w-full font-bold text-sm mt-2.5">
                {{ size.label }}
              </div>
              <div class="w-full text-xs">{{ size.potSize }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="w-full bg-orange text-white hover:bg-yellow hover:text-white transition duration-300 font-bold uppercase leading-none text-sm tracking-wider py-8 px-7"
      >
        <span>£{{ plant.price }} — Add to Bag</span>
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

      <!-- Bottom Icons -->
      <div class="flex mt-12">
        <div class="w-1/3 p-2 text-center">
          <img
            src="/assets/images/price-match-promise.svg"
            alt="Price match promise"
            class="mx-auto mb-4 w-15"
            loading="lazy"
            crossorigin
          />
          <p class="text-sm font-bold mb-0">Price match promise</p>
        </div>
        <div class="w-1/3 p-2 text-center">
          <img
            src="/assets/images/best-quality.svg"
            alt="Best quality"
            class="mx-auto mb-4 w-15"
            loading="lazy"
            crossorigin
          />
          <p class="text-sm font-bold mb-0">Best quality plants guaranteed</p>
        </div>
        <div class="w-1/3 p-2 text-center">
          <img
            src="/assets/images/delivery-van.svg"
            alt="Delivery van"
            class="mx-auto mb-4 w-15"
            loading="lazy"
            crossorigin
          />
          <p class="text-sm font-bold mb-0">Delivered to your door with care</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-radio-input {
  @apply relative border border-lightgreen rounded-lg h-24 cursor-pointer transition-colors duration-300;
}

.custom-radio-input input {
  @apply absolute opacity-0 w-full h-full cursor-pointer;
}

.custom-radio-input input:checked + label {
  @apply border-2 border-green rounded-lg;
}

.bg-mintgreen {
  @apply bg-opacity-20 bg-green;
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
