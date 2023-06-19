import { defineStore } from 'pinia';
import api from "@/utils/api";

export const useCartStore = defineStore({
    // unique id of the store across your application
    id: 'cart',
    state: () => ({
        items: [],
        loading: false,
        error: null,
    }),
    actions: {
        async getCartItems() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get('/basket/items');
                this.items = response.data;
            } catch (error) {
                this.error = 'Failed to load cart items.';
            } finally {
                this.loading = false;
            }
        },
        async addToCart(product) {
            this.loading = true;
            try {
                await api.post('/basket/items', {
                    product_id: product.id,
                    quantity: 1,
                });
                // Update cart items after adding new item
                this.getCartItems();
            } catch (error) {
                this.error = 'Failed to add item to cart.';
            } finally {
                this.loading = false;
            }
        },
        async removeFromCart(item) {
            this.loading = true;
            try {
                await api.delete(`/basket/items/${item.id}`);
                // Update cart items after removal
                this.getCartItems();
            } catch (error) {
                this.error = 'Failed to remove item from cart.';
            } finally {
                this.loading = false;
            }
        },
        getItemCount() {
            return this.items.reduce((count, item) => count + item.quantity, 0);
        },
    },
});
