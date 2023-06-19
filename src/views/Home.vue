<template>
  <div class="container mx-auto px-6 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-700">Welcome to Shop</h1>
      <div class="flex items-center">

        <cart-dropdown>
          <template #button>
            <div class="flex items-center cursor-pointer text-gray-700" title="Cart">
              <CartIcon/>
              <span class="text-lg">{{ cartItemCount }}</span>
            </div>
          </template>
        </cart-dropdown>
        <button class="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 duration-200" @click="logout" title="Logout">
          <LogoutIcon/>
        </button>


      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <product-skeleton v-if="isLoading" v-for="n in 8" :key="n"/>
      <div v-else v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-700">{{ product.name }}</h2>
          <p class="text-gray-500 mt-2">Price: ${{ product.price }}</p>
          <p class="text-sm text-gray-400 mt-2">Added At: {{ new Date(product.created_at).toLocaleDateString() }}</p>
          <button
              class="mt-4 flex items-center bg-blue-600 text-white text-sm px-2 py-1 rounded hover:bg-blue-700 duration-100"
              @click="addToCart(product)">
            <AddToCartIcon/>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useCartStore} from '@/stores/cart';
import CartDropdown from '@/components/CartDropdown.vue';
import {useProductStore} from "@/stores/productStore";
import {useAuthStore} from "@/stores/auth";
import CartIcon from "@/components/icons/CartIcon.vue";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import AddToCartIcon from "@/components/icons/AddToCartIcon.vue";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton.vue";

export default {
  name: "Home",
  components: {
    ProductSkeleton,
    AddToCartIcon,
    LogoutIcon,
    CartIcon,
    CartDropdown,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    products() {
      return useProductStore().products;
    },
    cartItemCount() {
      return useCartStore().getItemCount();
    },
  },
  created() {
    this.isLoading = true;
    useProductStore().fetchProducts().then(() => {
      this.isLoading = false;
    });
    useCartStore().getCartItems();
  },
  methods: {
    addToCart(product) {
      useCartStore().addToCart(product);
    },
    logout() {
      useAuthStore().logout();
      this.$router.push('/login');
    },
  },
}
</script>

<style scoped>

</style>
