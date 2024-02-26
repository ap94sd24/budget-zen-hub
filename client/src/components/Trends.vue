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
    <h3 class="mb-6 text-xl">Trends</h3>

    <div class="space-y-4">
      <div class="flex items-center justify-between"
        v-for="trend in trends"
        :key="trend.id"
      >
        <p class="text-xs">
          <strong>#{{ trend.hashtag }}</strong><br />
          <span class="text-gray-500">{{ trend.occurrences }} posts</span>
        </p>

        <a href="#" class="py-2 px-3 bg-purple-600 text-white text-xs rounded-lg">Explore</a>
      </div>
    </div>
  </div>
</template>
