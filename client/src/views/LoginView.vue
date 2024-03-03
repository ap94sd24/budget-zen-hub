<script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from '@/stores/user.store';
  import { useNotificationStore } from '@/stores/notification.store';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const form = ref({
    email: '',
    password: '',
  });

  const errors: any = ref([]);

  const resetForm = () => {
    form.value.email = '';
    form.value.password = '';
  };

  const formValidation = () => {
    errors.value = [];

    if (form.value.email === '') {
      errors.value.push('Your email is missing');
    }

    if (form.value.password === '') {
      errors.value.push('Your password is missing');
    }
  };

  const submitForm = async () => {
    formValidation();

    if (errors.value.length === 0) {
      const res = await userStore.loginUser(form.value);

      if (!res)
        errors.value.push('The email or password is incorrect! Or the user does not exist!');

      const isSuccess = await userStore.getUserInfo();
      if (isSuccess) router.push('/feed');
    }
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Sign in</h1>

        <p class="mb-6 text-gray-500">
          dsfad asdfa fasd fadfdsf dasf asdfds dff f adsfd saf adsfd dsfad asdfa fasd fadfdsf dasf
          asdfds dff f adsfd saf adsfd
        </p>

        <p class="font-bold">
          Don't have an account?
          <RouterLink :to="{ name: 'signup' }" class="underline">Click here</RouterLink> to sign up
          for an account!
        </p>
      </div>
    </div>
    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="email"> E-mail</label>
            <input
              type="email"
              name="email"
              v-model="form.email"
              id="email"
              placeholder="Your email address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="email"> Password</label>
            <input
              type="password"
              name="password"
              v-model="form.password"
              id="password"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-400 text-white dark:bg-red-600 dark:text-black rounded-lg p-5">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-blue-600 text-white rounded-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
