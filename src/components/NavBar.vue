<template>
  <div>
    <div class="flex items-center justify-between bg-gray-100 px-4 shadow">
      <div class="py-4">PiniaStore</div>
      <div>{{ numb.items }}</div>
      <router-link to="favorites"></router-link>
    </div>
  </div>
</template>

<script>
import { useCart } from "../Stores-Pinia/cart";
export default {
  setup() {
    const cartStore = useCart();
    return { cartStore };
  },
  computed: {
    numItems() {
      return this.cartStore.cartProducts.length;
    },
    // cartProducts es un array y está mencionado en Store-Pinia-->cart.js
  },
};
</script>

<style></style>
