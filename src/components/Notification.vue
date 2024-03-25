<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.store'
import { storeToRefs } from 'pinia'

const notificationStore = useNotificationStore()
const { isVisible, classes, message } = storeToRefs(notificationStore)
</script>
<template>
  <div
    v-if="isVisible"
    class="transition ease-in-out delay-500 duration-500 px-6 py-6 fixed top-full right-8 rounded-xl shadow-xl"
    :class="classes"
  >
    {{ message }}
  </div>
</template>
