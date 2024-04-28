<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useChatStore } from '@/stores/chat.store';
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/stores/user.store';

  const chatStore = useChatStore();

  const { activeConversation } = storeToRefs(chatStore);

  const userStore = useUserStore();

  const { conversations } = storeToRefs(chatStore);
  const { user } = storeToRefs(userStore);

  const body = ref('');
  onMounted(async () => {
    await chatStore.getChats();
  });

  const submitForm = async () => {
    const res = await chatStore.sendMessage(body.value);

    if (res) body.value = '';
  };
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 md:gap-4">
    <div class="col-span-4 md:col-span-1">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="space-y-4">
          <div
            class="flex items-center justify-between"
            v-for="conversation in conversations"
            :key="conversation.id"
            @click="chatStore.setActiveConversation(conversation.id)"
          >
            <div class="flex items-center space-x-2">
              <template v-for="userObj in conversation.users" :key="user.id">
                <template v-if="user.id !== userObj.id">
                  <img :src="userObj.get_avatar" alt="Gravatar img" class="w-[40px] rounded-full" />
                  <p class="text-xs font-bold">{{ userObj.name }}</p>
                </template>
              </template>
            </div>

            <span class="text-xs text-gray-500">{{ conversation.modified_at_formatted }} ago</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-4 md:col-span-3 md:pace-y-4">
      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="flex flex-col flex-grow p-4">
          <template v-for="message in activeConversation.messages" :key="message.id">
            <div
              class="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end"
              v-if="message.created_by.id === user.id"
            >
              <div>
                <div class="bg-green-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p class="text-sm">{{ message.body }}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">
                  {{ message.created_at_formatted }} ago
                </span>
              </div>
              <div class="flex-shrink-0 h-11 w-11 rounded-full bg-gray-300">
                <img
                  :src="message.created_by.get_avatar"
                  alt="Pravatar image"
                  class="w-[45px] rounded-full"
                />
              </div>
            </div>
            <div class="flex w-full mt-2 space-x-3 max-w-md mr-auto" v-else>
              <div class="flex-shrink-0 h-11 w-11 rounded-full bg-gray-300">
                <img
                  :src="message.created_by.get_avatar"
                  alt="Pravatar image"
                  class="w-[45px] rounded-full"
                />
              </div>
              <div>
                <div class="bg-gray-200 p-3 rounded-r-lg rounded-br-lg">
                  <p class="text-sm">{{ message.body }}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">
                  {{ message.created_at_formatted }} ago
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!--TODO: make this bottom sticky on both mobile and desktop-->
      <div class="f bg-white border border-gray-200 rounded-lg">
        <form @submit.prevent="submitForm">
          <div class="p-4">
            <textarea
              name="budget-qs"
              id="budget-qs"
              class="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="What do you want to talk about?"
              v-model="body"
            ></textarea>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-between">
            <button class="inline-block py-4 px-6 bg-blue-600 text-white rounded-lg">Sent</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
