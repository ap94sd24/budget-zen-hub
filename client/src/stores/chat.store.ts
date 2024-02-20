import { defineStore } from 'pinia';
import { getConversations } from '@/api/chat';

export const useChatStore = defineStore({
  id: 'chat',
  state: (): any => ({
    conversations: [],
  }),
  actions: {
    async getChats() {
      try {
        const res = await getConversations();
        if (res.data) this.conversations = res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
