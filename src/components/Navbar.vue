<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const navRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOutside = (event) => {
  if (
    navRef.value &&
    !navRef.value.contains(event.target) &&
    isMenuOpen.value
  ) {
    isMenuOpen.value = false;
  }
};

// Add and remove event listener when component mounts/unmounts
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav
    ref="navRef"
    class="flex items-center justify-between flex-col py-6 px-10 gap-2 text-[#056f75]"
  >
    <div class="w-full flex md:justify-center justify-between items-center">
      <RouterLink to="/" class="font-bold text-[36px]">Aloe There</RouterLink>
      <!-- Classic hamburger menu with stopPropagation -->
      <button @click.stop="toggleMenu" class="md:hidden">
        <svg
          v-if="!isMenuOpen"
          class="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M4 6h16" stroke-width="2" stroke-linecap="round" />
          <path d="M4 12h16" stroke-width="2" stroke-linecap="round" />
          <path d="M4 18h16" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg
          v-else
          class="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 6l12 12" stroke-width="2" stroke-linecap="round" />
          <path d="M6 18L18 6" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- Menu items -->
    <ul
      :class="[
        'flex font-semibold uppercase text-sm transition-all duration-300',
        isMenuOpen
          ? 'max-h-96 opacity-100'
          : 'max-h-0 md:max-h-96 opacity-0 md:opacity-100',
        'flex-col w-full items-center gap-4',
        'md:flex-row md:flex-wrap md:justify-center md:gap-6',
      ]"
    >
      <li
        class="cursor-pointer hover:text-[#034c50] hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span class="text-[#056f75] text-lg">🌿</span>Indoor Plants
      </li>
      <li
        class="cursor-pointer hover:text-[#034c50] hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span class="text-[#056f75] text-lg">🪴</span>Plant Pots
      </li>
      <li
        class="cursor-pointer hover:text-[#034c50] hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span class="text-[#056f75] text-lg">🌺</span>Accessories
      </li>
      <li
        class="cursor-pointer hover:text-[#034c50] hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span class="text-[#056f75] text-lg">🌱</span>Seeds & Bulbs
      </li>
      <li
        class="cursor-pointer hover:text-[#034c50] hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span class="text-[#056f75] text-lg">🎁</span>Gifts
      </li>
      <li
        class="cursor-pointer hover:text-[#034c50] hover:scale-105 transition-transform flex items-center gap-2"
      >
        <span class="text-[#056f75] text-lg">💼</span>Business
      </li>
    </ul>
  </nav>
</template>
