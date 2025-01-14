<script setup>
// Import the tools we need from Vue and our project
import { ref, onMounted, onUnmounted } from "vue"; // These help us manage our component
import { useRouter } from "vue-router"; // This helps us with navigation
import { useCartStore } from "@/stores/cart"; // This gives us access to our shopping cart

// Create variables we'll use in our navbar
const isMenuOpen = ref(false); // This keeps track if mobile menu is open (true) or closed (false)
const navRef = ref(null); // This helps us reference our nav element in the HTML
const cart = useCartStore(); // This connects us to our shopping cart system

// This function handles opening/closing the mobile menu
// When someone clicks the hamburger button, it switches isMenuOpen between true and false
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// This function closes the menu if someone clicks outside of it
// It's like clicking outside a dropdown menu to close it
const handleClickOutside = (event) => {
  if (
    navRef.value && // If we have a navbar
    !navRef.value.contains(event.target) && // And the click was outside it
    isMenuOpen.value // And the menu is currently open
  ) {
    isMenuOpen.value = false; // Then close the menu
  }
};

// When the navbar first appears on the page:
onMounted(() => {
  // Start listening for clicks anywhere on the page
  document.addEventListener("click", handleClickOutside);
});

// When the navbar is removed from the page:
onUnmounted(() => {
  // Stop listening for clicks (this keeps our website running smoothly)
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <!-- Main Navigation Bar -->
  <nav
    ref="navRef"
    class="flex items-center justify-between flex-col py-3 md:py-6 px-6 md:px-10 gap-2 text-[#056f75]"
  >
    <!-- Top section of navbar containing logo and icons -->
    <div class="w-full flex md:justify-center justify-between items-center">
      <!-- Logo/Home Link -->
      <RouterLink to="/" class="font-bold text-[28px] md:text-[36px]"
        >Aloe There</RouterLink
      >

      <!-- Right side icons (Cart and Menu) -->
      <div class="flex items-center gap-4">
        <!-- Shopping Cart Button. When clicked, opens/closes the cart -->
        <button
          @click="cart.toggleCart"
          class="relative hover:text-[#034c50] transition-colors"
        >
          <!-- Shopping Cart Icon (SVG) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          <!-- Shopping Cart Item Counter -->
          <!-- This only shows up if there are items in the cart -->
          <span
            v-if="cart.itemCount > 0"
            class="absolute -top-2 -right-2 bg-[#ca6a14] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cart.itemCount }}
            <!-- Shows number of items in cart -->
          </span>
        </button>

        <!-- Mobile Menu Button (Hamburger) -->
        <!-- This only shows up on mobile screens -->
        <button @click.stop="toggleMenu" class="md:hidden">
          <!-- Hamburger Icon (when menu is closed) -->
          <svg
            v-if="!isMenuOpen"
            class="h-6 w-6 md:h-8 md:w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <!-- Three lines that make up the hamburger icon -->
            <path d="M4 6h16" stroke-width="2" stroke-linecap="round" />
            <path d="M4 12h16" stroke-width="2" stroke-linecap="round" />
            <path d="M4 18h16" stroke-width="2" stroke-linecap="round" />
          </svg>

          <!-- X Icon (when menu is open) -->
          <svg
            v-else
            class="h-6 w-6 md:h-8 md:w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <!-- Two diagonal lines that make an X -->
            <path d="M6 6l12 12" stroke-width="2" stroke-linecap="round" />
            <path d="M6 18L18 6" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu items -->
    <ul
      :class="[
        'md:flex font-semibold uppercase text-sm transition-all duration-300',
        isMenuOpen ? 'flex' : 'hidden',
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

    <!-- Shopping Cart svg -->
  </nav>
</template>
