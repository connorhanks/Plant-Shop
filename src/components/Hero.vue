<script setup>
import heroImg from "@/assets/hero.webp";
import smileyImg from "@/assets/smiley.webp";
</script>

<template>
  <div class="bg-[#007175] flex relative">
    <!-- Hero image -->
    <img :src="heroImg" class="h-[750px]" />

    <!-- Rotating smiley -->
    <img
      :src="smileyImg"
      class="absolute left-[44%] top-[20%] -translate-x-1/2 -translate-y-1/2 w-25 h-25 rotating-smiley"
      alt="Smiley face"
    />

    <!-- Call to action -->
    <div
      class="flex flex-col justify-center items-center w-full gap-4 text-white"
    >
      <p class="text-5xl max-w-[600px]">
        Connecting people to
        <span class="scribble-underline">nature</span> through plants and
        gardening.
      </p>
      <p class="max-w-[600px]">
        The Stem is your one-stop shop for all things green. We bring you closer
        to nature by delivering indoor plants, outdoor plants, plant pots,
        accessories, and seeds & bulbs straight to your door.
      </p>

      <!-- CTA buttons -->
      <div class="flex gap-5 max-w-[600px] w-full">
        <button class="bg-[#ca6a14] px-4 py-3">Shop Indoor Plants</button>
        <button class="bg-[#ca6a14] px-4 py-3">Shop Plant Accessories</button>
      </div>
    </div>
  </div>
</template>

<style>
.scribble-underline {
  background: url(@/assets/scribble-underline.svg) no-repeat 100% 100%/221px
    14px;
  padding-bottom: 6px;
}

.scribble-underline {
  background: url(@/assets/scribble-underline.svg) no-repeat 100% 100%/221px
    14px;
  padding-bottom: 6px;
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
</style>
