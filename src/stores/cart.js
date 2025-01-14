import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  // State is like data() in components
  state: () => ({
    items: [],
    isOpen: false,
  }),

  // Getters are like computed properties
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);
    },
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },

  // Actions are like methods
  actions: {
    addItem(plant, selectedSize, selectedPot) {
      const existingItem = this.items.find(
        (item) =>
          item.id === plant.id &&
          item.selectedSize === selectedSize &&
          item.selectedPot === selectedPot
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({
          id: plant.id,
          name: plant.name,
          price: plant.price,
          image: plant.images[0],
          selectedSize,
          selectedPot,
          quantity: 1,
        });
      }
    },
    removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
    updateQuantity(itemId, quantity) {
      const item = this.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart() {
      this.items = [];
    },
    toggleCart() {
      this.isOpen = !this.isOpen;
    },
  },
});
