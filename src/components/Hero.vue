<script setup>
import heroImg from "@/assets/hero.webp";
import smileyImg from "@/assets/smiley.webp";
</script>

<template>
  <div
    class="bg-[#007175] flex flex-col md:flex-row relative min-h-[500px] md:min-h-[750px]"
  >
    <!-- Hero image -->
    <div class="relative w-full md:w-1/2 min-h-[300px] md:min-h-[750px]">
      <img
        :src="heroImg"
        class="h-full w-full object-cover absolute inset-0"
        alt="Hero image"
      />
    </div>

    <!-- Rotating smiley - positioned differently on mobile -->
    <img
      :src="smileyImg"
      class="absolute left-1/2 top-[40%] md:top-[15%] transform -translate-x-1/2 -translate-y-1/2 rotating-smiley w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32"
      alt="Smiley face"
    />

    <!-- Call to action -->
    <div
      class="flex flex-col justify-center items-center w-full md:w-1/2 gap-6 md:gap-8 text-white py-12 px-6 md:px-10"
    >
      <p class="text-3xl md:text-5xl max-w-[600px] text-center md:text-left">
        Connecting people to
        <span class="scribble-underline">nature</span> through plants and
        gardening.
      </p>
      <p class="max-w-[600px] text-center md:text-left text-sm md:text-base">
        Aloe There is your one-stop shop for all things green. We bring you
        closer to nature by delivering indoor plants, outdoor plants, plant
        pots, accessories and seeds & bulbs straight to your door.
      </p>

      <!-- CTA buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4 sm:gap-5 max-w-[600px] w-full"
      >
        <button
          class="bg-secondary px-4 py-3 hover:bg-secondary-dark transition-colors rounded-sm flex-1"
        >
          Shop Indoor Plants
        </button>
        <button
          class="bg-secondary px-4 py-3 hover:bg-secondary-dark transition-colors rounded-sm flex-1"
        >
          Shop Plant Accessories
        </button>
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

.rotating-smiley {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (max-width: 768px) {
  .scribble-underline {
    background-size: 150px 18px;
    padding-bottom: 12px;
  }
}
</style>
