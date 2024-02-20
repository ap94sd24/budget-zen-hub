<script setup lang="ts">
  import { usePostStore } from '@/stores/post.store';
  defineProps(['post']);

  const postStore = usePostStore();

  const likePost = async (id: string) => {
    await postStore.likePost(id);
  };
</script>
<template>
  <div class="mb-6 flex items-center justify-between">
    <div class="flex item-center space-x-6">
      <img
        src="https://gravatar.com/avatar/5ac01b7cd1192f1c1c60bf84eab96570?s=400&d=robohash&r=x"
        alt=""
        class="w-[40px] rounded-full"
      />
      <p>
        <strong>{{ post?.created_by.name }}</strong>
      </p>
    </div>
    <div class="text-gray-600 text-sm">{{ post?.created_at_formatted }} ago</div>
  </div>

  <!-- <img
            src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            class="w-full rounded-bg"
          /> -->
  <p>{{ post?.body }}</p>

  <div class="my-6 flex justify-between">
    <div class="flex space-x-6">
      <div class="cursor-pointer flex items-center space-x-2" @click="likePost(post.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          :stroke="`${post.likes_count > 0 ? 'red' : 'black'}`"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          ></path>
        </svg>
        <span class="text-gray-500 text-xs">{{ post.likes_count }} likes</span>
      </div>
      <div class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          ></path>
        </svg>

        <RouterLink
          :to="{ name: 'postdetailview', params: { id: post.id } }"
          class="text-gray-500 text-xs"
          >{{ post.comments_count }} comments</RouterLink
        >
      </div>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        ></path>
      </svg>
    </div>
  </div>
</template>
