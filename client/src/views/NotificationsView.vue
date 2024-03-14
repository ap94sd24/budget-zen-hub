<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useNotificationStore } from '@/stores/notification.store';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  const notifcationStore = useNotificationStore();

  const router = useRouter();

  const { notifications } = storeToRefs(notifcationStore);
  onMounted(async () => {
    await notifcationStore.getNotificationsForUser();
  });

  const readNotification = async (notification: any) => {
    await notifcationStore.readNotification(notification.id);

    if (
      notification.type_of_notification === 'post_like' ||
      notification.type_of_notification === 'post_comment'
    ) {
      router.push({ name: 'postdetailview', params: { id: notification.post_id } });
    } else {
      router.push({ name: 'followers', params: { id: notification.created_for_id } });
    }
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
