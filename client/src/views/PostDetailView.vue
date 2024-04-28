<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePostStore } from '@/stores/post.store';

  import PeopleToConnect from '@/components/PeopleToConnect.vue';
  import Trends from '@/components/Trends.vue';
  import FeedItem from '@/components/FeedItem.vue';
  import CommentItem from '@/components/CommentItem.vue';
  import { storeToRefs } from 'pinia';

  const postStore = usePostStore();
  const { posts } = storeToRefs(postStore);

  const route = useRoute();

  const body = ref('');
  const post: any = ref({
    id: null,
    comments: [],
  });

  onMounted(async () => {
    getPost();
  });

  const getPost = async () => {
    const res = await postStore.getPost(route.params.id);

    if (res) {
      post.value = res.post;
    }
  };

  const submitForm = async () => {
    const data = await postStore.saveCommentForPost(route.params.id, body.value);

    if (data) {
      body.value = '';
      post.value.comments.push(data);
      post.value.comments_count += 1;
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
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-if="post.id">
        <FeedItem :post="post" />
      </div>

      <div
        class="p-4 ml-6 bg-white border border-gray-200 rounded-lg"
        v-for="comment in post.comments"
        :key="comment.id"
      >
        <CommentItem :comment="comment" />
      </div>

      <div class="bg-white border border-gray-200 rounded-lg">
        <form v-on:submit.prevent="submitForm" method="post">
          <div class="p-4">
            <textarea
              v-model="body"
              class="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="What do you think?"
            ></textarea>
          </div>

          <div class="p-4 border-t border-gray-100">
            <button
              class="inline-block py-3 px-6 bg-blue-600 text-white dark:bg-blue-400 dark:text-black rounded-lg"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
