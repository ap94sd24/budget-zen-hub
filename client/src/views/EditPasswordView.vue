<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  import { useUserStore } from '@/stores/user.store';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();

  const router = useRouter();

  const { user } = storeToRefs(userStore);

  const errors: any = ref([]);
  const form = ref({
    old_password: '',
    new_password1: '',
    new_password2: '',
  });

  const submitForm = async () => {
    errors.value = [];
    if (form.value.new_password1 !== form.value.new_password2)
      errors.value.push('Your password does not match!');

    if (errors.value.length === 0) {
      let formData = new FormData();

      formData.append('old_password', form.value.old_password);
      formData.append('new_password1', form.value.new_password1);
      formData.append('new_password2', form.value.new_password2);

      const res = await userStore.updateAccountPassword(formData);

      if (res.status !== 'success') {
        for (const key in res.messageObj) {
          errors.value.push(res.messageObj[key][0].message);
        }
      } else {
        router.push(`/profile/${user.value.id}`);
      }
    }
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 md:gap-4">
    <div class="col-span-2 md:col-span-1">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Edit password</h1>

        <p class="mb-6 text-gray-500">Here you can update your password.</p>
      </div>
    </div>

    <div class="col-span-2 md:col-span-1">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="old_password">Old Password:</label> <br />
            <input
              type="password"
              id="old_password"
              v-model="form.old_password"
              placeholder="Your current password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="new_password1">New Password:</label> <br />
            <input
              type="password"
              id="new_password1"
              v-model="form.new_password1"
              placeholder="Your new password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="new_password2">Repeat Password:</label> <br />
            <input
              type="password"
              id="new_password2"
              v-model="form.new_password2"
              placeholder="Repeat password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-blue-600 text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
