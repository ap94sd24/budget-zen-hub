import { defineStore } from 'pinia';
import { getConversations, getActiveConversation, sendMsgForActiveChat } from '@/api/chat';

export const useChatStore = defineStore({
  id: 'chat',
  state: (): any => ({
    conversations: [],
    activeConversation: {},
  }),
  actions: {
    async getChats() {
      try {
        const res = await getConversations();
        if (res.data) {
          this.conversations = res.data;
          if (this.conversations.length > 0) {
            this.activeConversation = this.conversations[0].id;
          }

          await this.getActiveConvo();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveConvo(id: any) {
      try {
        const res = await getActiveConversation(this.activeConversation);

        if (res.data) this.activeConversation = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async setActiveConversation(id: any) {
      this.activeConversation = id;
      await this.getActiveConvo();
    },

    async sendMessage(body: any) {
      try {
        const res = await sendMsgForActiveChat(this.activeConversation.id, body);

        if (res.data) this.activeConversation.messages.push(res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
