<template>
  <div class="relative inline-block" v-on-clickaway="closeDropdown">
    <button @click="open = !open" class="relative z-10 block focus:outline-none">
      <slot name="button"></slot>
    </button>
    <div v-show="open" class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl">
      <cart-skeleton v-if="cart.loading" v-for="n in 3" :key="n"/>
      <div v-else-if="cart.error" class="p-4">{{ cart.error }}</div>
      <div v-else>
        <div v-for="item in cart.items" :key="item.id" class="border-b p-4">
          <h2 class="font-bold text-lg text-gray-700">{{ item.product.name }}</h2>
          <p class="text-gray-700">Quantity: {{ item.quantity }}</p>
          <p class="text-gray-700">Total price: ${{ item.total_price.toLocaleString() }}</p>
          <button class="text-red-600 text-sm" @click.stop="cart.removeFromCart(item)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useCartStore} from "@/stores/cart";
import CartSkeleton from "@/components/skeleton/CartSkeleton.vue";

export default {
  name: 'CartDropdown',
  components: {CartSkeleton},
  data() {
    return {
      open: false,
    };
  },
  computed: {
    cart() {
      return useCartStore();
    },
  },
  watch: {
    open(newVal) {
      if (newVal) this.cart.getCartItems();
    },
  },
  methods: {
    closeDropdown() {
      this.open = false;
    },
  },
};
</script>
