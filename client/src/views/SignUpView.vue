<script setup lang="ts">
  import { ref } from 'vue';
  import { useNotificationStore } from '@/stores/notification.store';
  import { signupAccount } from '@/api/account';

  const notifStore = useNotificationStore();

  const form = ref({
    email: '',
    name: '',
    password1: '',
    password2: '',
  });

  const errors: any = ref([]);

  const resetForm = () => {
    form.value.email = '';
    form.value.name = '';
    form.value.password1 = '';
    form.value.password2 = '';
  };

  const formValidation = () => {
    errors.value = [];

    if (form.value.email === '') {
      errors.value.push('Your email is missing');
    }

    if (form.value.name === '') {
      errors.value.push('Your name is missing');
    }

    if (form.value.password1 === '') {
      errors.value.push('Your password is missing');
    }

    if (form.value.password1 !== form.value.password2) {
      errors.value.push('Password does not match');
    }
  };

  const submitForm = async () => {
    formValidation();
    if (errors.value.length === 0) {
      try {
        const res = await signupAccount(form.value);

        if (res.data.message === 'success') {
          notifStore.showNotification(
            5000,
            'The user is registered. Please activate your account by clicking your email link!',
            'bg-emerald-500'
          );
          resetForm();
        } else {
          const errorObj = JSON.parse(res.data.message);
          for (const key in errorObj) {
            errors.value.push(errorObj[key][0].message);
          }
          notifStore.showNotification(
            5000,
            'Something went wrong. Please try again.',
            'bg-red-300'
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-6 md:p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-4 text-2xl md:text-3xl">Sign Up</h1>
        <p class="mb-4 text-gray-500 text-sm md:text-base">
          Join our community to learn about personal finance, budgeting and how to grow your assets!
        </p>
        <p class="font-bold text-sm md:text-base">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="underline">Click here</RouterLink> to login to
          your account!
        </p>
      </div>
    </div>
    <div class="main-right">
      <div class="p-6 md:p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block">Name</label>
            <input
              v-model="form.name"
              type="text"
              name="name"
              id="name"
              placeholder="Your full name"
              class="w-full mt-2 py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label for="email" class="block">E-mail</label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              class="w-full mt-2 py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label for="password" class="block">Password</label>
            <input
              v-model="form.password1"
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              class="w-full mt-2 py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label for="password-repeat" class="block">Repeat Password</label>
            <input
              v-model="form.password2"
              type="password"
              name="password-repeat"
              id="password-repeat"
              placeholder="Repeat your password"
              class="w-full mt-2 py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-3 md:p-6">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </template>
          <div>
            <button type="submit" class="w-full py-3 px-6 bg-gray-600 text-white rounded-lg">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
