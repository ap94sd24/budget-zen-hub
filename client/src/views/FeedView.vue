<script setup lang="ts">
  import PeopleToConnect from '@/components/PeopleToConnect.vue';
  import Trends from '@/components/Trends.vue';

  import { onMounted, ref } from 'vue';
  import { usePostStore } from '@/stores/post.store';
  import { storeToRefs } from 'pinia';

  import FeedItem from '@/components/FeedItem.vue';

  const postStore = usePostStore();

  const { posts } = storeToRefs(postStore);

  const file: any = ref<HTMLElement | null>(null);
  const url: any = ref(null);

  onMounted(async () => {
    await postStore.getFeed();
  });

  const body = ref('');

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    url.value = URL.createObjectURL(file);
  };

  const submitForm = async () => {
    let formData = new FormData();
    formData.append('image', file.value.files[0]);
    formData.append('body', body.value);
    const res = await postStore.savePost(formData);

    if (res) {
      body.value = '';
      file.value.value = null;
      url.value = null;
    }
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-6">
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
