<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
  import Notification from './components/Notification.vue';
  import { useUserStore } from './stores/user.store';
  import http from '@/utils/https';

  const userStore = useUserStore();

  userStore.initStore();

  const checkAccess = () => {
    const token = userStore.user.access;

    if (token) {
      http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      http.defaults.headers.common['Authorization'] = '';
    }
  };
  checkAccess();
</script>
<template>
  <Navbar />
  <main class="md:px-8 md:py-6 bg-gray-100">
    <RouterView />
  </main>

  <Notification />
</template>
