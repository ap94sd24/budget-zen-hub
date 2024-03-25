<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { usePostStore } from '@/stores/post.store';
  import { useUserStore } from '@/stores/user.store';
  const props = defineProps(['post']);

  const postStore = usePostStore();
  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);

  const likePost = async (id: string) => {
    await postStore.likePost(id);
  };

  const showExtraModal = ref(false);

  const togglePostActionModal = () => {
    showExtraModal.value = !showExtraModal.value;
  };

  const deletePost = async () => {
    await postStore.deletePostForUser(props.post.id);
  };

  const reportPost = async () => {
    await postStore.reportPost(props.post.id);
  };
</script>
<template>
  <div class="mb-6 flex items-center justify-between">
    <div class="flex item-center space-x-6">
      <img :src="post.created_by.get_avatar" alt="" class="w-[40px] rounded-full" />
      <p>
        <strong>{{ post?.created_by.name }}</strong>
      </p>
    </div>
    <div class="text-gray-600 text-sm">{{ post?.created_at_formatted }} ago</div>
  </div>

  <template v-if="post.attachments.length > 0">
    <img
      v-for="image in post.attachments"
      :key="image.id"
      :src="image.get_image"
      alt="Image of post"
      class="w-full mb-4 rounded-xl"
    />
  </template>
  <p>{{ post?.body }}</p>

  <div class="my-6 flex justify-between">
    <div class="flex space-x-6 items-center">
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

      <div v-if="post.is_private" class="flex items-center space-x-2 text-gray-500 text-xs">
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
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>

        <span class="pl-1"> Is private</span>
      </div>
    </div>
    <div>
      <div
        class="hover:cursor-pointer hover:bg-gray-100 rounded-full"
        @click="togglePostActionModal"
      >
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
  </div>

  <div v-if="showExtraModal">
    <div class="flex space-x-6 items-center">
      <div
        v-if="user.id === post.created_by.id"
        class="cursor-pointer flex items-center space-x-2"
        @click="deletePost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>

        <span class="text-red-500 text-xs">Delete post</span>
      </div>
      <div class="cursor-pointer flex items-center space-x-2" @click="reportPost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-orange-600 dark:text-orange-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
          />
        </svg>

        <span class="text-orange-600 dark:text-orange-300 text-xs">Report post</span>
      </div>
    </div>
  </div>
</template>
