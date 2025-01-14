<script setup>
import { ref, onMounted } from "vue";
import LoadingLeaf from "./LoadingLeaf.vue";
import SproutLoader from "./SproutLoader.vue";
import MonsteraLoader from "./MonsteraLoader.vue";

const selectedLoader = ref(null);

onMounted(() => {
  const loaders = ["leaf", "sprout", "monstera"];
  const randomIndex = Math.floor(Math.random() * loaders.length);
  selectedLoader.value = loaders[randomIndex];
});
</script>

<template>
  <div class="flex justify-center items-center">
    <LoadingLeaf v-if="selectedLoader === 'leaf'" />
    <SproutLoader v-if="selectedLoader === 'sprout'" />
    <MonsteraLoader v-if="selectedLoader === 'monstera'" />
  </div>
</template>
