<script setup lang="ts">
  // TODO: update this to trend view, this is currently feedview
  import { onMounted, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { usePostStore } from '@/stores/post.store';

  import PeopleToConnect from '@/components/PeopleToConnect.vue';
  import Trends from '@/components/Trends.vue';
  import FeedItem from '@/components/FeedItem.vue';

  const postStore = usePostStore();

  const { posts } = storeToRefs(postStore);

  const route = useRoute();

  onMounted(async () => {
    await postStore.getTrendFeed(route.params.id);
  });

  watch(
    () => route.params.id,
    async () => {
      await postStore.getTrendFeed(route.params.id);
    },
    {
      immediate: true,
    }
  );
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 md:gap-4">
    <div class="col-span-4 md:col-span-1 md:order-2 md:space-y-4">
      <PeopleToConnect />

      <Trends />
    </div>
    <div class="col-span-4 md:col-span-3 md:order-1 md:space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl">Trend: #{{ $route.params.id }}</h2>
      </div>

      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <FeedItem v-bind:post="post" />
      </div>
    </div>
  </div>
</template>
