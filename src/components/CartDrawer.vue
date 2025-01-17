<script setup>
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>

<template>
  <div
    v-if="cart.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50"
    @click="cart.toggleCart"
  >
    <div
      class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
      @click.stop
    >
      <!-- Cart Header -->
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold text-[#006F74]">
          Your Cart ({{ cart.itemCount }})
        </h2>
        <button
          @click="cart.toggleCart"
          class="text-gray-500 hover:text-[#006F74]"
        >
          ✕
        </button>
      </div>

      <!-- Cart Items -->
      <div class="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div
          v-if="cart.items.length === 0"
          class="text-center py-8 text-gray-500"
        >
          Your cart is empty
        </div>

        <div
          v-for="item in cart.items"
          :key="`${item.id}-${item.selectedSize}-${item.selectedPot}`"
          class="flex gap-4 mb-4 border-b pb-4"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-20 h-20 object-cover rounded"
          />
          <div class="flex-1">
            <h3 class="font-bold text-primary">{{ item.name }}</h3>
            <p class="text-sm text-gray-600">
              Size: {{ item.selectedSize }} / Pot: {{ item.selectedPot }}
            </p>
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center gap-2">
                <button
                  @click="cart.updateQuantity(item.id, item.quantity - 1)"
                  class="text-primary px-2"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  @click="cart.updateQuantity(item.id, item.quantity + 1)"
                  class="text-primary px-2"
                >
                  +
                </button>
              </div>
              <div class="font-bold">
                £{{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>
          <button
            @click="cart.removeItem(item.id)"
            class="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Cart Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Total</span>
          <span class="font-bold text-lg">£{{ cart.totalPrice }}</span>
        </div>
        <button
          class="w-full bg-[#006F74] text-white py-3 rounded hover:bg-[#005c61] transition-colors"
          :disabled="cart.items.length === 0"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max-w-md {
  max-width: 28rem;
}
</style>
