<script setup lang="ts">
  import { ref } from 'vue';
  import PeopleToConnect from '@/components/PeopleToConnect.vue';
  import Trends from '@/components/Trends.vue';
  import FeedItem from '@/components/FeedItem.vue';
  import { searchQuery } from '@/api/search';

  const query = ref('');

  const users: any = ref([]);
  const posts: any = ref([]);

  const submitForm = async () => {
    try {
      const res = await searchQuery({ query: query.value });

      if (res.data) {
        users.value = res.data.users;
        posts.value = res.data.posts;
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 md:gap-4">
    <div class="col-span-4 md:col-span-1 md:order-2 md:space-y-4">
      <PeopleToConnect />
      <Trends />
    </div>
    <div class="col-span-4 md:col-span-3 md:order-1 md:space-y-4">
      <div class="bg-white border border-gray-200">
        <form @submit.prevent="submitForm" class="p-4 flex space-x-0">
          <input
            v-model="query"
            type="search"
            name="budget-search"
            id="budget-search"
            class="p-4 w-full bg-gray-100 rounded-tl-lg rounded-bl-lg"
            placeholder="What are you looking for?"
          />
          <button
            class="inline-block m-0 py-4 px-6 bg-blue-600 text-white rounded-tr-lg rounded-br-lg"
          >
            <svg
              class="w-4 h-4 text-white-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
      </div>

      <div
        class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 md:gap-4"
        v-if="users.length > 0"
      >
        <template v-for="user in users" :key="user.id">
          <div class="col-span-2 md:col-span-1 m-1">
            <div class="p-4 text-center bg-gray-100 rounded-lg">
              <img :src="user.get_avatar" alt="Avatar for profile" class="mb-6 rounded-full" />

              <p class="font-bold">
                <RouterLink :to="{ name: 'profile', params: { id: user.id } }">{{
                  user.name
                }}</RouterLink>
              </p>

              <div class="mt-6 flex space-x-8 justify-around">
                <p class="text-xs text-gray-500">{{ user.followers_count }} followers</p>
                <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
              </div>
            </div>
          </div>
        </template>
      </div>
      <template v-for="post in posts" :key="post.id">
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <FeedItem :post="post" />
        </div>
      </template>
    </div>
  </div>
</template>
