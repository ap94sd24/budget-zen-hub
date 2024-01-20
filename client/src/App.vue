<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
</script>
<template>
  <Navbar />
  <main class="px-8 py-6 bg-gray-100">
    <RouterView />
  </main>

  <Notification />
</template>
