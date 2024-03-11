<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';

  import { usePostStore } from '@/stores/post.store';
  import { useUserStore } from '@/stores/user.store';
  import { useFollowerStore } from '@/stores/follower.store';
  import { useChatStore } from '@/stores/chat.store';

  import Trends from '@/components/Trends.vue';
  import PeopleToConnect from '@/components/PeopleToConnect.vue';
  import FeedItem from '@/components/FeedItem.vue';

  const userStore = useUserStore();
  const followerStore = useFollowerStore();
  const chatStore = useChatStore();

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    await postStore.getAllPostsForUser(route.params.id);
  });

  const postStore = usePostStore();

  const { posts, user, can_send_follower_request, is_private } = storeToRefs(postStore);

  const body = ref('');
  const file: any = ref<HTMLElement | null>(null);
  const url: any = ref(null);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    url.value = URL.createObjectURL(file);
  };

  const submitForm = async () => {
    console.log('Is private -> ' + is_private.value);
    let formData = new FormData();
    formData.append('image', file.value.files[0]);
    formData.append('body', body.value);
    formData.append('is_private', is_private.value);

    const res = await postStore.savePost(formData);
    console.log('RES -> ' + res);
    if (res) {
      body.value = '';
      file.value.value = null;
      url.value = null;
      is_private.value = false;
    }
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

  const sendDirectMsg = async () => {
    await chatStore.getDirectMsgRequest(route.params.id);
    router.push('/chat');
  };

  const logout = () => {
    userStore.removeToken();
    router.push('/login');
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img :src="user?.get_avatar" alt="Avatar img" class="mb-6 rounded-full" />

        <p class="font-bold">
          {{ user?.name }}
        </p>

        <div class="mt-6 flex space-x-8 justify-around">
          <RouterLink
            :to="{ name: 'followers', params: { id: user?.id } }"
            class="text-xs text-gray-500"
            >{{ user?.followers_count }} followers</RouterLink
          >
          <!--TODO: figure out why user.posts_count isn't working-->
          <p class="text-xs text-gray-500">{{ user?.posts_count }} posts</p>
        </div>
        <div class="mt-6">
          <button
            v-if="userStore.user.id !== user?.id && can_send_follower_request"
            class="inline-block py-3 px-5 bg-blue-600 text-xs text-white rounded-lg"
            @click="sendFollowerRequest"
          >
            Send follower request
          </button>
          <button
            v-if="userStore.user.id !== user?.id"
            class="inline-block mt-4 py-3 px-5 bg-blue-600 text-xs text-white rounded-lg"
            @click="sendDirectMsg"
          >
            Want to chat?
          </button>
          <RouterLink
            to="/profile/edit"
            v-if="userStore.user.id === user?.id"
            class="inline-block py-3 px-5 bg-gray-600 mr-2 dark:bg-gray-400 text-xs text-white rounded-lg"
          >
            Edit Profile
          </RouterLink>
          <button
            v-if="userStore.user.id === user?.id"
            class="inline-block py-3 px-5 bg-red-600 dark:bg-red-400 text-xs text-white rounded-lg"
            @click="logout"
          >
            Log out
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

              <label for="is_private">
                <input type="checkbox" id="is_private" v-model="is_private" /> Private
              </label>

              <div id="preview" v-if="url">
                <img :src="url" class="w-[100px] mt-3 rounded-xl" />
              </div>
            </div>
            <div class="p-4 border-t border-gray-100 flex justify-between">
              <label class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">
                <input type="file" ref="file" @change="onFileChange" />
                Attach image
              </label>

              <button href="#" class="inline-block py-2 px-5 bg-blue-600 text-white rounded-lg">
                Post
              </button>
            </div>
          </form>
        </div>
      </template>

      <template v-for="post in posts" :key="post?.id">
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
<style scoped>
  input[type='file'] {
    display: none;
  }
</style>
