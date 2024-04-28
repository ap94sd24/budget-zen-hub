<script setup lang="ts">
  import PeopleToConnect from '@/components/PeopleToConnect.vue';
  import Trends from '@/components/Trends.vue';

  import { onMounted } from 'vue';
  import { usePostStore } from '@/stores/post.store';
  import { storeToRefs } from 'pinia';

  import FeedItem from '@/components/FeedItem.vue';
  import FeedForm from '@/components/FeedForm.vue';

  const postStore = usePostStore();

  const { posts } = storeToRefs(postStore);

  onMounted(async () => {
    await postStore.getFeed();
  });
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-right col-span-4 md:col-span-1 md:order-2 md:space-y-4">
      <PeopleToConnect />
      <Trends />
    </div>
    <div class="main-center col-span-4 md:col-span-3 md:order-1 space-y-6">
      <FeedForm />
      <template v-for="post in posts" :key="post?.id">
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <FeedItem :post="post" />
        </div>
      </template>
    </div>
  </div>
</template>
