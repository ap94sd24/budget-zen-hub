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
      console.log('Query -> ' + query.value);
      const res = await searchQuery({ query: query.value });

      console.log('Res data -> ' + JSON.stringify(res.data, null, 2));
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
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-3 space-y-4">
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
        class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4"
        v-if="users.length > 0"
      >
        <template v-for="user in users" :key="user.id">
          <div class="p-4 text-center bg-gray-100 rounded-lg">
            <img
              src="https://gravatar.com/avatar/5ac01b7cd1192f1c1c60bf84eab96570?s=300&d=robohash&r=x"
              alt="Avatar for profile"
              class="mb-6 rounded-full"
            />

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
        </template>
      </div>
      <template v-for="post in posts" :key="post.id">
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <FeedItem :post="post" />
        </div>
      </template>
    </div>
    <div class="main-right col-span-1 space-y-4">
      <PeopleToConnect />
      <Trends />
    </div>
  </div>
</template>
