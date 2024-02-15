<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';

  import { useFollowerStore } from '@/stores/follower.store';

  import Trends from '@/components/Trends.vue';
  import PeopleToConnect from '@/components/PeopleToConnect.vue';

  const followerStore = useFollowerStore();
  const route = useRoute();

  const { user, followerRequests, followers } = storeToRefs(followerStore);

  onMounted(async () => {
    await followerStore.getFollowers(route.params.id);
  });
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img src="https://i.pravatar.cc/300?img=70" class="mb-6 rounded-full" />

        <p>
          <strong>{{ user.name }}</strong>
        </p>

        <div class="mt-6 flex space-x-8 justify-around">
          <p class="text-xs text-gray-500">
            {{ user.followers_count > 0 ? user.followers_count : 0 }} followers
          </p>
          <p class="text-xs text-gray-500">120 posts</p>
        </div>
      </div>
    </div>

    <div class="main-center col-span-2 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-if="followerRequests.length">
        <h2 class="mb-6 text-xl">Followers requests</h2>

        <div
          class="p-4 text-center bg-gray-100 rounded-lg"
          v-for="req in followerRequests"
          :key="req.id"
        >
          <img
            src="https://gravatar.com/avatar/5ac01b7cd1192f1c1c60bf84eab96570?s=200&d=robohash&r=x"
            class="mb-6 mx-auto rounded-full"
          />

          <p>
            <strong>
              <RouterLink :to="{ name: 'profile', params: { id: req.created_by.name } }">{{
                req.created_by.name
              }}</RouterLink>
            </strong>
          </p>

          <div class="mt-6 flex space-x-8 justify-around">
            <p class="text-xs text-gray-500">{{ user.followers_count }} followers</p>
            <p class="text-xs text-gray-500">120 posts</p>
          </div>

          <div class="mt-6 space-x-4">
            <button
              class="inline-block py-2 px-5 bg-blue-600 dark:bg-blue-400 text-white rounded-lg"
              @click="followerStore.handleRequest('accepted', req.created_by.id)"
            >
              Accept
            </button>
            <button
              class="inline-block py-2 px-5 bg-red-600 text-white dark:text-black dark:bg-red-400 rounded-lg"
              @click="followerStore.handleRequest('rejected', req.created_by.id)"
            >
              Reject
            </button>
          </div>
        </div>

        <hr />
      </div>

      <div
        class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-4"
        v-if="followers.length"
      >
        <div
          class="p-4 text-center bg-gray-100 rounded-lg"
          v-for="user in followers"
          :key="user.id"
        >
          <img src="https://i.pravatar.cc/300?img=70" class="mb-6 rounded-full" />

          <p>
            <strong>
              <RouterLink :to="{ name: 'profile', params: { id: user.id } }">{{
                user.name
              }}</RouterLink>
            </strong>
          </p>

          <div class="mt-6 flex space-x-8 justify-around">
            <p class="text-xs text-gray-500">{{ user.followers_count }} followers</p>
            <p class="text-xs text-gray-500">120 posts</p>
          </div>
        </div>
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleToConnect />

      <Trends />
    </div>
  </div>
</template>
