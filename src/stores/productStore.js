import { defineStore } from 'pinia';
import api from "@/utils/api";

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        error: null,
    }),
    actions: {
        async fetchProducts() {
            try {
                const response = await api.get("/products");
                this.products = response.data;
            } catch (error) {
                this.error = error;
            }
        },
    },
});
