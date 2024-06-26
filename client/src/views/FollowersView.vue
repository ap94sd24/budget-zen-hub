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
  <div class="max-w-7xl mx-auto grid grid-cols-4 md:gap-4">
    <div class="col-span-4 md:col-span-1 md:order-3 md:space-y-4">
      <PeopleToConnect />

      <Trends />
    </div>
    <!-- <div class="col-span-4 md:col-span-1 md:order-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img :src="user.get_avatar" class="mb-6 rounded-full" />

        <p>
          <strong>{{ user.name }}</strong>
        </p>

        <div class="mt-6 flex space-x-8 justify-around">
          <p class="text-xs text-gray-500">{{ user.followers_count }} followers</p>
          <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
        </div>
      </div>
    </div> -->

    <div class="col-span-4 md:col-span-2 md:space-y-4 md-order-2">
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-if="followerRequests.length">
        <h2 class="mb-6 text-xl">Followers requests</h2>

        <div
          class="p-4 text-center bg-gray-100 rounded-lg"
          v-for="req in followerRequests"
          :key="req.id"
        >
          <img :src="req.created_by.get_avatar" class="mb-6 mx-auto rounded-full" />

          <p>
            <strong>
              <RouterLink :to="{ name: 'profile', params: { id: req.created_by.name } }">{{
                req.created_by.name
              }}</RouterLink>
            </strong>
          </p>

          <div class="mt-6 flex space-x-8 justify-around">
            <p class="text-xs text-gray-500">{{ user.followers_count }} followers</p>
            <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
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
          <img :src="user.get_avatar" class="mb-6 rounded-full" />

          <p>
            <strong>
              <RouterLink :to="{ name: 'profile', params: { id: user.id } }">{{
                user.name
              }}</RouterLink>
            </strong>
          </p>

          <div class="mt-6 flex space-x-8 justify-around">
            <p class="text-xs text-gray-500">{{ user.followers_count }} followers</p>
            <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
