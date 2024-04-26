<script setup lang="ts">
  import { usePostStore } from '@/stores/post.store';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  const postStore = usePostStore();
  const { is_private } = storeToRefs(postStore);
  const body = ref('');
  const file: any = ref<HTMLElement | null>(null);
  const url: any = ref(null);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    url.value = URL.createObjectURL(file);
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append('image', file.value.files[0]);
    formData.append('body', body.value);
    formData.append('is_private', is_private.value);

    const res = await postStore.savePost(formData);

    if (res) {
      body.value = '';
      file.value.value = null;
      url.value = null;
      is_private.value = false;
    }
  };
</script>

<template>
  <div class="w-full sm:p-0 sm:m-0 bg-white border border-gray-200 rounded-lg">
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
          <input class="hidden" type="file" ref="file" @change="onFileChange" />
          Attach image
        </label>

        <button href="#" class="inline-block py-2 px-5 bg-blue-600 text-white rounded-lg">
          Post
        </button>
      </div>
    </form>
  </div>
</template>
