<script setup lang="ts"></script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img src="https://i.pravatar.cc/300?img=70" alt="Avatar img" class="mb-6 rounded-full" />

        <p><strong>TEST</strong></p>

        <div class="mt-6 flex space-x-8 justify-around">
          <p class="text-xs text-gray-500">500 followers</p>
          <p class="text-xs text-gray-500">120 posts</p>
        </div>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-6">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="p-4">
          <textarea
            name="budget-qs"
            id="budget-qs"
            class="p-4 w-full bg-gray-100 rounded-lg"
            placeholder="What budget goals do you want to ask?"
          ></textarea>
        </div>
        <div class="p-4 border-t border-gray-100 flex justify-between">
          <a href="#" class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg"
            >Attach image</a
          >

          <a href="#" class="inline-block py-4 px-6 bg-blue-600 text-white rounded-lg">Post</a>
        </div>
      </div>
    </div>
  </div>
</template>
