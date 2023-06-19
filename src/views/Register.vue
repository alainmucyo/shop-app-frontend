<template>
  <div class="flex justify-center px-2 py-2 items-center h-screen">
    <div class="lg:w-2/5  w-full bg-white px-6 py-6 rounded shadow">
      <h1 class="text-gray-700 text-2xl tracking-wide">Welcome,</h1>
      <h3 class="text-gray-800 text-lg tracking-wide">Please provide your details to register!</h3>
      <form class="mt-4" @submit.prevent="submit">
        <div class="mb-4 flex">
          <form-input label="First Name" type="text" v-model="form.firstName"/>
          <span class="text-red-500 text-sm" v-if="validationErrors.firstName">{{ validationErrors.firstName[0] }}</span>
          <div class="ml-2"></div>
          <form-input label="Last Name" type="text" v-model="form.lastName"/>
          <span class="text-red-500 text-sm" v-if="validationErrors.lastName">{{ validationErrors.lastName[0] }}</span>
        </div>
        <div class="mb-4">
          <form-input label="Email" type="text" v-model="form.email"/>
          <span class="text-red-500 text-sm" v-if="validationErrors.email">{{ validationErrors.email[0] }}</span>
        </div>

        <div class="mb-4 ">
          <form-input label="Password" type="password" v-model="form.password"/>
          <span class="text-red-500 text-sm" v-if="validationErrors.password">{{ validationErrors.password[0] }}</span>
        </div>
        <div class="mb-4 ">
          <form-input label="Confirm Password" type="password" v-model="form.confirm_password"/>
          <span class="text-red-500 text-sm" v-if="errorMsg!=''">{{ errorMsg }}</span>
        </div>
        <div class="mb-4 ">
          <div class="flex justify-between items-center">
            <router-link to="/login" class="text-blue-600 hover:text-blue-500 duration-100">Login Here!</router-link>
            <submit-button text="Create Account" :loading="loading" loading_text="Creating Account..."/>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>

import axios from "axios";
import SubmitButton from "@/components/shared/submit-button.vue";
import FormInput from "@/components/shared/form-input.vue";
import {useAuthStore} from "@/stores/auth";

export default {
  name: 'Register',
  components: {SubmitButton, FormInput},
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: "",
        password: '',
        confirm_password: '',
      },
      loading: false,
      failed: false,
      errorMsg: '',
      validationErrors: {}
    }
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async submit() {
      if (this.form.password !== this.form.confirm_password) {
        console.log("Not equal");
        this.errorMsg = "Password confirmation doesn't match";
        return;
      }
      this.loading = true;
      const result = await this.authStore.register(this.form);
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
