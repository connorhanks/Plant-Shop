import { defineStore } from "pinia";

// This creates our cart's storage system - like a special box to keep track of what's in our shopping cart
export const useCartStore = defineStore("cart", {
  // STATE is like a snapshot of our cart at any moment
  // Think of it like a shopping list that keeps updating
  state: () => ({
    items: [], // This is our array of items - starts empty like an empty cart
    isOpen: false, // This tells us if the cart drawer is open (true) or closed (false)
  }),

  // GETTERS are like calculators - they look at what's in our cart and give us useful info
  // They automatically update whenever our cart changes
  getters: {
    // Counts how many different items are in our cart (not counting multiples of same item)
    totalItems: (state) => state.items.length,

    // Adds up the total price of everything in our cart
    // It multiplies each item's price by how many of that item we have
    totalPrice: (state) => {
      return state.items
        .reduce((total, item) => {
          // For each item: price × quantity, then add to total
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2); // Makes sure we show 2 decimal places, like £29.99
    },

    // Counts the total number of items, including multiples
    // Example: 2 plants + 3 pots = 5 items
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },

  // ACTIONS are like the things we can do with our cart
  // Like picking up items, removing them, or changing how many we want
  actions: {
    // This adds a new item to our cart
    addItem(plant, selectedSize, selectedPot) {
      // First, check if we already have this exact item (same plant, size, and pot)
      const existingItem = this.items.find(
        (item) =>
          item.id === plant.id &&
          item.selectedSize === selectedSize &&
          item.selectedPot === selectedPot
      );

      // If we already have this item:
      if (existingItem) {
        existingItem.quantity++; // Just add one more to the quantity
      } else {
        // If it's a new item, add it to our cart with all its details
        this.items.push({
          id: plant.id,
          name: plant.name,
          price: plant.price,
          image: plant.images[0], // Save the first image of the plant
          selectedSize, // What size plant they chose
          selectedPot, // What pot they chose
          quantity: 1, // Start with quantity of 1
        });
      }
    },

    // This removes an item completely from our cart
    removeItem(itemId) {
      // Find where in our cart this item is
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index > -1) {
        // If we found it, remove it from the array
        this.items.splice(index, 1);
      }
    },

    // This changes how many of an item we want
    updateQuantity(itemId, quantity) {
      // Find the item we want to update
      const item = this.items.find((item) => item.id === itemId);
      if (item) {
        // Make sure we can't have less than 1 of an item
        // Math.max means "pick the bigger number between 1 and quantity"
        item.quantity = Math.max(1, quantity);
      }
    },

    // This empties our entire cart
    clearCart() {
      this.items = []; // Set items back to an empty array
    },

    // This opens/closes the cart drawer
    // If it's open, this closes it. If it's closed, this opens it
    toggleCart() {
      this.isOpen = !this.isOpen;
    },
  },
});
