<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useNotificationStore } from '@/stores/notification.store';
  import { storeToRefs } from 'pinia';
  const notifcationStore = useNotificationStore();

  const { notifications } = storeToRefs(notifcationStore);
  onMounted(async () => {
    await notifcationStore.getNotificationsForUser();
  });

const readNotification = async (notif: any) => {
    
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-for="notification in notifications"
        v-bind:key="notification.id"
        v-if="notifications.length > 0"
      >
        {{ notification.body }}

        <button class="underline" @click="readNotification(notification)">Read more</button>
      </div>

      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-else>
        You don't have any unread notifications!
      </div>
    </div>
  </div>
</template>
