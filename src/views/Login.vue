<template>
  <div class="flex justify-center items-center px-2 py-2 h-screen">
    <div class="lg:w-2/5 w-full bg-white px-6 py-6 rounded shadow">
      <h1 class="text-gray-700 text-2xl tracking-wide">Welcome to <span class="text-blue-600">Shop app</span>,</h1>
      <h3 class="text-gray-800 text-lg tracking-wide">Please login to your account!</h3>
      <form class="mt-4" @submit.prevent="submit">
        <div class="mb-4 ">
          <form-input label="Email" type="text" v-model="form.email"/>
          <span class="text-red-500 text-sm" v-if="validationErrors.email">{{ validationErrors.email[0] }}</span>
        </div>
        <div class="mb-4 ">
          <form-input label="Password" type="password" v-model="form.password"/>
          <span class="text-red-500 text-sm" v-if="validationErrors.password">{{ validationErrors.password[0] }}</span>
          <span class="text-red-500 text-sm" v-if="failed">{{ errorMsg }}</span>
        </div>
        <div class="mb-4 ">
          <div class="flex justify-between items-center">
            <router-link to="/register" class="text-blue-600 hover:text-blue-500 duration-100">Create Account Here!
            </router-link>
            <submit-button text="Login" :loading="loading" loading_text="Logging in..."/>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormInput from "@/components/shared/form-input.vue";
import SubmitButton from "@/components/shared/submit-button.vue";
import {useAuthStore} from "@/stores/auth";  // Adapt this path to your project structure
import {reactive} from 'vue';

export default {
  name: 'Login',
  components: {SubmitButton, FormInput},
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
      failed: false,
      errorMsg: '',
      validationErrors: {}
    }
  },
  setup() {
    const authStore = useAuthStore();
    return {authStore};
  },
  methods: {
    async submit() {
      this.loading = true;
      const result = await this.authStore.login(this.form);
      this.loading = false;
      if (result.success) {
        await this.$router.push("/");
      } else {
        this.failed = true;
        this.validationErrors = result.validationErrors;
        this.errorMsg = result.error;

      }
    }
  }
}
</script>