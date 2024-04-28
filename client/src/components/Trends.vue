<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  import { usePostStore } from '@/stores/post.store';

  const postStore = usePostStore();

  const { trends } = storeToRefs(postStore);

  onMounted(async () => {
    await postStore.getTrends();
  });
</script>
<template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg">
    <h3 class="mb-6 text-black text-center md:text-left text-xl">Trends</h3>

    <div class="space-y-4">
      <div class="grid grid-cols-2">
        <div class="col-span-1 md:col-span-2 p-2" v-for="trend in trends" :key="trend.id">
          <div class="flex items-center justify-between">
            <p class="text-xs">
              <strong>#{{ trend.hashtag }}</strong
              ><br />
              <span class="text-gray-500">{{ trend.occurrences }} posts</span>
            </p>

            <RouterLink
              :to="{ name: 'trendview', params: { id: trend.hashtag } }"
              class="py-2 px-3 mx-1 bg-blue-600 text-white text-xs rounded-lg"
              >Explore</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
