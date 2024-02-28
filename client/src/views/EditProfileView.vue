<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useNotificationStore } from '@/stores/notification.store';
  import { useUserStore } from '@/stores/user.store';

  const notificationStore = useNotificationStore();
  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);

  const errors: any = ref([]);
  const form = ref({
    email: user.value.email,
    name: user.value.name,
  });

  const file: any = ref<HTMLElement | null>(null);

  const submitForm = () => {
    errors.value = [];
    if (form.value.email === '') errors.value.push('Your email is missing!');

    if (form.value.name === '') errors.value.push('Your name is missing!');

    if (errors.value.length === 0) {
      let formData = new FormData();

      formData.append('avatar', file.value.files[0]);
      formData.append('name', form.value.name);
      formData.append('email', form.value.email);

      
    }
  };
</script>
