<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';

  import { usePostStore } from '@/stores/post.store';
  import { useUserStore } from '@/stores/user.store';
  import { useFollowerStore } from '@/stores/follower.store';

  import Trends from '@/components/Trends.vue';
  import PeopleToConnect from '@/components/PeopleToConnect.vue';

  import FeedItem from '@/components/FeedItem.vue';

  const userStore = useUserStore();
  const followerStore = useFollowerStore();
  const route = useRoute();

  onMounted(async () => {
    await postStore.getAllPostsForUser(route.params.id);
  });

  const postStore = usePostStore();

  const { posts, user } = storeToRefs(postStore);

  const body = ref('');

  const submitForm = async () => {
    await postStore.savePost(body.value);
    body.value = '';
  };

  watch(
    () => route.params.id,
    async () => {
      await postStore.getAllPostsForUser(route.params.id);
    },
    {
      immediate: true,
    }
  );

  const sendFollowerRequest = async () => {
    await followerStore.addFollowerRequest(route.params.id);
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img
          src="https://gravatar.com/avatar/5ac01b7cd1192f1c1c60bf84eab96570?s=400&d=robohash&r=x"
          alt="Avatar img"
          class="mb-6 rounded-full"
        />

        <p class="font-bold">
          {{ user?.name }}
        </p>

        <div class="mt-6 flex space-x-8 justify-around">
          <RouterLink
            :to="{ name: 'followers', params: { id: user?.id } }"
            class="text-xs text-gray-500"
            >{{ user.followers_count }} followers</RouterLink
          >
          <p class="text-xs text-gray-500">120 posts</p>
        </div>
        <div class="mt-6">
          <button
            class="inline-block py-3 px-5 bg-blue-600 text-xs text-white rounded-lg"
            @click="sendFollowerRequest"
          >
            Send follower request
          </button>
        </div>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-4">
      <template v-if="userStore.user.id === user?.id">
        <div class="bg-white border border-gray-200 rounded-lg">
          <form @submit.prevent="submitForm" method="post">
            <div class="p-4">
              <textarea
                name="budget-qs"
                id="budget-qs"
                v-model="body"
                class="p-4 w-full bg-gray-100 rounded-lg"
                placeholder="What budget goals do you want to ask?"
              ></textarea>
            </div>
            <div class="p-4 border-t border-gray-100 flex justify-between">
              <button href="#" class="inline-block py-2 px-5 bg-gray-600 text-white rounded-lg">
                Attach image
              </button>

              <button href="#" class="inline-block py-2 px-5 bg-blue-600 text-white rounded-lg">
                Post
              </button>
            </div>
          </form>
        </div>
      </template>

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
