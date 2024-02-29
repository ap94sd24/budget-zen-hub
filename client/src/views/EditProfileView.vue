<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useNotificationStore } from '@/stores/notification.store';
  import { useUserStore } from '@/stores/user.store';
  import { useRouter } from 'vue-router';

  const notificationStore = useNotificationStore();
  const userStore = useUserStore();

  const router = useRouter();

  const { user } = storeToRefs(userStore);

  const errors: any = ref([]);
  const form = ref({
    email: user.value.email,
    name: user.value.name,
  });

  const file: any = ref<HTMLElement | null>(null);

  const submitForm = async () => {
    errors.value = [];
    if (form.value.email === '') errors.value.push('Your email is missing!');

    if (form.value.name === '') errors.value.push('Your name is missing!');

    if (errors.value.length === 0) {
      let formData = new FormData();

      formData.append('avatar', file.value.files[0]);
      formData.append('name', form.value.name);
      formData.append('email', form.value.email);

      const res = await userStore.editUserProfile(formData);

      if (res) router.back();
    }
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Edit profile</h1>

        <p class="mb-6 text-gray-500">
          Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem
          ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.
        </p>
      </div>
    </div>

    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label>Name</label><br />
            <input
              type="text"
              v-model="form.name"
              placeholder="Your full name"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>E-mail</label><br />
            <input
              type="email"
              v-model="form.email"
              placeholder="Your e-mail address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>Avatar</label><br />
            <input type="file" ref="file" />
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-blue-600 text-white rounded-lg">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
