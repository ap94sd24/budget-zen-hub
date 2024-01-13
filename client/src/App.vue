<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>
<template>
  <Navbar />
  <main class="px-8 py-6 bg-gray-100">
    <RouterView />
  </main>
</template>
