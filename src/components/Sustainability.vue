<script setup>
const sustainabilityStats = [
  {
    icon: "recycle",
    number: "30,000",
    unit: "kg",
    description: "cardboard saved through our no-packaging delivery service.",
  },
  {
    icon: "tree",
    number: "102,135",
    unit: "",
    description:
      "trees planted in partnership with Eden Projects for reforestation.",
  },
  {
    icon: "planet",
    number: "1",
    unit: "%",
    description: "of our profits are donated to environmental non-profits.",
  },
];
</script>

<template>
  <section class="bg-primary text-white relative py-16 md:py-24">
    <img
      class="absolute -translate-x-1/2 -top-10 md:-top-14 left-[20%] lg:left-[25%] xl:left-[30%] 2xl:left-[35%] w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-24 sm:w-28 md:h-32 lg:h-36 xl:h-40 animate-slow-wiggle"
      src="/assets/images/globe.svg"
      alt="Sustainability Globe"
      width="160"
      height="160"
      loading="lazy"
    />

    <div class="container mx-auto px-4 md:px-6">
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
        <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Make the<br />World <span class="scribble-underline">Greener</span>
        </h3>
        <p class="text-lg">
          We are on a mission to minimise the impact of plants and gardening on
          our planet. We've got a long way to go, but here are a few things
          we've done so far:
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
        <div
          v-for="(stat, index) in sustainabilityStats"
          :key="index"
          class="text-center"
        >
          <div class="text-4xl md:text-5xl font-bold mb-4">
            <span
              :class="`icon-${stat.icon} text-3xl md:text-4xl align-middle mr-2`"
            ></span>
            <span>{{ stat.number }}</span>
            <span v-if="stat.unit" class="text-2xl">{{ stat.unit }}</span>
          </div>
          <p class="text-lg max-w-xs mx-auto">{{ stat.description }}</p>
        </div>
      </div>

      <div class="text-center mt-12 md:mt-16">
        <router-link
          to="/sustainability"
          class="inline-block bg-secondary hover:bg-secondary-dark text-white transition-colors font-bold uppercase text-sm tracking-wider py-4 px-8"
        >
          Sustainability
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scribble-underline {
  position: relative;
  display: inline-block;
}

.scribble-underline::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 100%;
  height: 1.5rem;
  background: url(@/assets/scribble-underline.svg) no-repeat center bottom;
  background-size: 100% auto;
}

.animate-slow-wiggle {
  animation: wiggle 3s ease-in-out infinite;
}

@keyframes wiggle {
  0%,
  100% {
    transform: translateX(-50%) rotate(-3deg);
  }
  50% {
    transform: translateX(-50%) rotate(3deg);
  }
}

@media (max-width: 768px) {
  .scribble-underline::after {
    height: 1.2rem;
  }
}
</style>
