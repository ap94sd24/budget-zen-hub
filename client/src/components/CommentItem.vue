<script setup lang="ts">
  defineProps(['comment']);
</script>
<template>
  <div class="mb-6 flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <img
        src="https://gravatar.com/avatar/5ac01b7cd1192f1c1c60bf84eab96570?s=400&d=robohash&r=x"
        class="w-[40px] rounded-full"
      />

      <p>
        <strong>
          <RouterLink :to="{ name: 'profile', params: { id: comment.created_by.id } }">{{
            comment.created_by.name
          }}</RouterLink>
        </strong>
      </p>
    </div>

    <p class="text-gray-600">{{ comment.created_at_formatted }} ago</p>
  </div>

  <p>{{ comment.body }}</p>
</template>
