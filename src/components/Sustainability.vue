<script setup>
const sustainabilityStats = [
  {
    icon: "recycle",
    number: "30,000",
    unit: "kg",
    description: "cardboard saved, with our no packaging deliveries in London.",
  },
  {
    icon: "tree",
    number: "102,135",
    unit: "",
    description: "trees planted in partnership with Eden Projects.",
  },
  {
    icon: "planet",
    number: "1",
    unit: "%",
    description:
      "of sales to environmental nonprofits as 1% for the Planet members.",
  },
];
</script>

<template>
  <section class="bg-primary text-white relative">
    <img
      class="absolute -top-8 right-14 w-28 md:w-40 md:left-14 md:right-0 lg:left-72 animate-slow-wiggle"
      src="/assets/images/globe.svg"
      alt="Sustainability Globe"
      width="112"
      height="112"
      loading="lazy"
    />

    <div
      class="max-w-8xl w-full mx-auto px-6 pt-26 pb-20 sm:px-8 md:px-10 md:pt-30 md:pb-24 lg:px-12 text-lg text-center"
    >
      <div class="mb-14 max-w-2xl mx-auto md:mb-20">
        <h3 class="text-4xl lg:text-5xl leading-tight lg:leading-tight">
          Make the<br />World <span class="scribble-underline">Greener</span>
        </h3>
        <p>
          We are on a mission to minimise the impact of plants and gardening on
          our planet. We've got a long way to go, but here are a few things
          we've done so far:
        </p>
      </div>

      <div class="md:flex -m-2.5">
        <div
          v-for="(stat, index) in sustainabilityStats"
          :key="index"
          class="mb-14 md:mb-2 md:w-1/3 max-w-sm mx-auto md:px-2.5"
        >
          <div class="text-5xl sm:text-5.5xl font-bold mb-4">
            <span :class="`icon-${stat.icon} text-4xl sm:text-5xl`"></span>
            <span>{{ stat.number }}</span>
            <span v-if="stat.unit" class="text-2xl">{{ stat.unit }}</span>
          </div>
          <p class="px-14">{{ stat.description }}</p>
        </div>
      </div>

      <div>
        <router-link
          to="/sustainability"
          class="inline-block bg-[#ca6a14] text-white hover:bg-[#b55d11] transition-colors font-bold uppercase leading-none text-xs tracking-wider py-5 px-7 mt-7"
        >
          Sustainability
        </router-link>
      </div>
    </div>
  </section>
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

.animate-slow-wiggle {
  animation: wiggle 3s ease-in-out infinite;
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}
</style>
