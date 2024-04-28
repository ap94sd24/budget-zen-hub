<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useFollowerStore } from '@/stores/follower.store';

  const followerStore = useFollowerStore();

  const { suggestedUsers } = storeToRefs(followerStore);

  onMounted(async () => {
    await followerStore.getFollowerRecommendations();
  });
</script>
<template>
  <div class="w-full p-4 bg-white border border-gray-200 rounded-lg">
    <h3 class="mb-6 text-center md:text-left text-xl">People to Follow</h3>

    <div class="space-y-4">
      <template v-if="suggestedUsers.length === 0">
        <div class="text-center md:text-left">
          No suggestions found. <br />
          Find more users to follow here: <br />
          <router-link to="/search" class="text-blue-700 hover:text-blue-900 hover:underline"
            >Search</router-link
          >
        </div>
      </template>
      <div class="flex items-center justify-between" v-for="user in suggestedUsers" :key="user.id">
        <div class="flex items-center space-x-2">
          <img :src="user.get_avatar" class="w-[40px] rounded-full" />

          <p class="text-xs">
            <strong>{{ user.name }}</strong>
          </p>
        </div>

        <RouterLink
          :to="{ name: 'profile', params: { id: user.id } }"
          class="py-2 px-3 bg-blue-600 text-white text-xs rounded-lg"
          >Show</RouterLink
        >
      </div>
    </div>
  </div>
</template>
