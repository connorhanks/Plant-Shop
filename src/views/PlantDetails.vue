<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import RandomLoader from "@/components/RandomLoader.vue";
import { useCartStore } from "@/stores/cart";
import CartDrawer from "@/components/CartDrawer.vue";

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

const cart = useCartStore();

async function fetchPlants() {
  // Check cache first
  if (plantsCache.value.size > 0) {
    console.log("Using cached plants data");
    return Array.from(plantsCache.value.values());
  }

  const baseUrl = "http://192.168.1.72:3001";
  const response = await fetch(`${baseUrl}/plants`);
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

    // Fetch all plants first
    const plants = await fetchPlants();

    // Find the specific plant from the cached data
    const foundPlant = plants.find((p) => p.id === parseInt(plantId));
    if (!foundPlant) {
      throw new Error(`Plant with ID ${plantId} not found`);
    }

    plant.value = foundPlant;
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

// Mobile Image Gallery
const gallery = ref(null);
const currentImageIndex = ref(0);
let autoScrollInterval = null;

const handleGalleryScroll = () => {
  if (!gallery.value) return;

  const scrollLeft = gallery.value.scrollLeft;
  const width = gallery.value.offsetWidth;
  currentImageIndex.value = Math.round(scrollLeft / width);
};

const scrollToNextImage = () => {
  if (!gallery.value || !plant.value) return;

  const nextIndex = (currentImageIndex.value + 1) % plant.value.images.length;
  const width = gallery.value.offsetWidth;

  gallery.value.scrollTo({
    left: nextIndex * width,
    behavior: "smooth",
  });
};

onMounted(() => {
  // Start auto-scroll when component mounts
  autoScrollInterval = setInterval(scrollToNextImage, 3000);
});

onBeforeUnmount(() => {
  // Clean up interval when component unmounts
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
  }
});

// Plant Description
const activeAccordion = ref(null);

const toggleAccordion = (section) => {
  activeAccordion.value = activeAccordion.value === section ? null : section;
};

const addToCart = () => {
  cart.addItem(plant.value, selectedSize.value, selectedPot.value);
  cart.toggleCart();
};
</script>
<template>
  <!-- Loading State -->
  <div
    v-if="loading"
    class="flex justify-center items-center min-h-[400px] px-6"
  >
    <RandomLoader />
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="text-center py-8 px-6">
    <div class="text-red-600 mb-4">{{ error }}</div>
    <button
      @click="router.push('/')"
      class="bg-[#056f75] text-white px-6 py-2 rounded hover:bg-[#034c50] transition-colors"
    >
      Return Home
    </button>
  </div>

  <!-- Success State -->
  <div
    v-else-if="plant"
    class="max-w-7xl mx-auto px-4 sm:px-6 sm:py-10 lg:px-8"
  >
    <div class="lg:flex items-start">
      <!-- Mobile Image Gallery -->
      <div class="lg:hidden mb-8">
        <div
          class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          ref="gallery"
          @scroll="handleGalleryScroll"
        >
          <div
            v-for="(image, index) in plant.images"
            :key="index"
            class="w-full flex-shrink-0 snap-center"
          >
            <img
              :src="image"
              :alt="`${plant.name} ${index + 1}`"
              class="w-full aspect-square object-cover rounded-lg"
              loading="lazy"
              crossorigin
            />
          </div>
        </div>
        <!-- Active dot indicator -->
        <div class="flex justify-center gap-2 mt-4">
          <div
            v-for="(_, index) in plant.images"
            :key="index"
            class="w-2 h-2 rounded-full transition-colors"
            :class="
              currentImageIndex === index ? 'bg-[#056f75]' : 'bg-gray-300'
            "
          ></div>
        </div>
      </div>

      <!-- Left Column - Image Grid (desktop only) -->
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
      <div class="lg:w-2/5 lg:pl-16 py-5 px-6 lg:px-0">
        <div class="pr-20 md:pr-24">
          <h3
            class="inline-block uppercase text-sm lg:text-sm tracking-wider mr-2 lg:mr-4 font-sans text-[#006F74]"
          >
            {{ plant.nickname }}
          </h3>
          <!-- Star Rating -->
          <div class="inline-block text-[#006F74]">
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

        <h1 class="text-3xl lg:text-4xl my-3 text-[#006F74]">
          {{ plant.name }}
        </h1>
        <div class="block w-full">
          <div
            class="font-serif text-2xl text-[#006F74] scribble-underline inline-block"
          >
            £{{ totalPrice }}
          </div>
        </div>

        <!-- Plant Categories -->
        <div class="my-2 text-xs font-bold leading-none">
          <router-link
            v-for="category in plant.categories"
            :key="category"
            :to="`/plants/category/${category.toLowerCase().replace(' ', '-')}`"
            class="inline-block mr-2 mb-2 rounded-full bg-[#e6f3f3] text-[#006F74] hover:bg-[#006F74] hover:text-white transition-colors p-3"
          >
            {{ category }}
          </router-link>
        </div>

        <!-- Plant Features -->
        <div
          v-if="plant.features"
          class="my-2 inline-flex flex-wrap text-sm font-bold leading-none text-[#006F74]"
        >
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
        <div class="my-2">
          <h3 class="font-bold mb-3 text-[#006F74]">Select Size</h3>
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="size in sizes"
              :key="size.label"
              @click="selectedSize = size.label"
              class="p-4 border rounded-lg text-center"
              :class="{
                'border-[#006F74] text-[#006F74]': selectedSize === size.label,
              }"
            >
              <img
                :src="size.icon"
                :alt="`${size.label} plant size`"
                class="h-12 w-12 mx-auto mb-2"
              />
              <div class="font-bold">{{ size.label }}</div>
              <div class="text-sm text-gray-600">{{ size.potSize }}</div>
              <div class="mt-2 font-bold text-black">£{{ size.price }}</div>
            </button>
          </div>
        </div>

        <!-- Pot Selection -->
        <div class="mt-4 mb-6">
          <h3 class="font-bold mb-3 text-[#006F74]">Select Pot</h3>
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="pot in pots"
              :key="pot.id"
              @click="selectedPot = pot.id"
              class="p-4 border rounded-lg text-center"
              :class="{
                'border-[#006F74] text-[#006F74]': selectedPot === pot.id,
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
          @click="addToCart"
          class="w-full bg-[#006F74] text-white hover:bg-[#005c61] transition-colors font-bold uppercase leading-none text-sm tracking-wider py-8 px-7"
        >
          <span>£{{ totalPrice }} — Add to Bag</span>
          <span class="icon-bag text-xl ml-4 align-bottom"></span>
        </button>

        <!-- Free Delivery Notice -->
        <div
          class="flex my-8 text-sm font-bold leading-none justify-center text-[#006F74]"
        >
          <img
            src="/assets/images/free-delivery-icon.svg"
            alt="Free delivery"
            loading="lazy"
            crossorigin
          />
          <span class="pl-2">FREE delivery on orders over £50</span>
        </div>

        <!-- Plant Description -->
        <div class="accordion text-sm">
          <div class="border-b border-[#e6f3f3]">
            <button
              class="accordion-trigger text-left font-bold uppercase text-xs tracking-wider flex justify-between items-center w-full pt-5 pb-2 text-[#006F74]"
              @click="toggleAccordion('description')"
            >
              Description
              <span
                class="icon-chevron-down transform transition-transform duration-300 text-[#006F74]"
                :class="{ 'rotate-180': activeAccordion === 'description' }"
                >▼</span
              >
            </button>
            <div
              class="accordion-content overflow-hidden transition-all duration-300 text-[#006F74]"
              :class="{
                'h-0': activeAccordion !== 'description',
                'h-auto pb-4': activeAccordion === 'description',
              }"
            >
              <p>{{ plant.description }}</p>
            </div>
          </div>

          <div class="border-b border-[#e6f3f3]">
            <button
              class="accordion-trigger text-left font-bold uppercase text-xs tracking-wider flex justify-between items-center w-full pt-5 pb-2 text-[#006F74]"
              @click="toggleAccordion('size')"
            >
              Size Guide
              <span
                class="icon-chevron-down transform transition-transform duration-300 text-[#006F74]"
                :class="{ 'rotate-180': activeAccordion === 'size' }"
                >▼</span
              >
            </button>
            <div
              class="accordion-content overflow-hidden transition-all duration-300 text-[#006F74]"
              :class="{
                'h-0': activeAccordion !== 'size',
                'h-auto pb-4': activeAccordion === 'size',
              }"
            >
              <p>
                Height is measured from the bottom of the plastic nursery pot
                (please allow a +/-10% variance). Diameter is the nursery pot
                diameter, so to get a pot that fits, the pot diameter should be
                bigger.
              </p>
            </div>
          </div>

          <div class="border-b border-[#e6f3f3]">
            <button
              class="accordion-trigger text-left font-bold uppercase text-xs tracking-wider flex justify-between items-center w-full pt-5 pb-2 text-[#006F74]"
              @click="toggleAccordion('shipping')"
            >
              Shipping & Returns
              <span
                class="icon-chevron-down transform transition-transform duration-300 text-[#006F74]"
                :class="{ 'rotate-180': activeAccordion === 'shipping' }"
                >▼</span
              >
            </button>
            <div
              class="accordion-content overflow-hidden transition-all duration-300 text-[#006F74]"
              :class="{
                'h-0': activeAccordion !== 'shipping',
                'h-auto pb-4': activeAccordion === 'shipping',
              }"
            >
              <p>
                Our deliveries are simple! Just choose your preferred delivery
                day during checkout.
              </p>
            </div>
          </div>
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
            <p class="text-sm font-bold mb-0 text-[#006F74]">
              Price match promise
            </p>
          </div>
          <div class="w-1/3 p-2 text-center">
            <img
              src="/assets/images/best-quality.svg"
              alt="Best quality"
              class="mx-auto mb-4 h-12 w-12"
              loading="lazy"
              crossorigin
            />
            <p class="text-sm font-bold mb-0 text-[#006F74]">
              Best quality plants guaranteed
            </p>
          </div>
          <div class="w-1/3 p-2 text-center">
            <img
              src="/assets/images/delivery-van.svg"
              alt="Delivery van"
              class="mx-auto mb-4 h-12 w-12"
              loading="lazy"
              crossorigin
            />
            <p class="text-sm font-bold mb-0 text-[#006F74]">
              Delivered to your door with care
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fallback State -->
  <div v-else class="text-center py-8 px-6">
    <div class="text-gray-600 mb-4">No plant information available</div>
    <button
      @click="router.push('/')"
      class="bg-[#056f75] text-white px-6 py-2 rounded hover:bg-[#034c50] transition-colors"
    >
      Return Home
    </button>
  </div>

  <!-- Add CartDrawer component at the top level of your template -->
  <CartDrawer />
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

.scribble-underline {
  background: url(@/assets/scribble-underline.svg) no-repeat 0 100%/100% 18px;
  padding-bottom: 12px;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .scribble-underline {
    background-size: 100% 12px;
    padding-bottom: 10px;
  }
}

.accordion-content {
  transition: height 0.3s ease-in-out;
}

.icon-chevron-down {
  font-size: 0.75rem;
}
</style>
