import { defineStore } from 'pinia';
import {
  getFollowers,
  saveFollowerRequest,
  addFollower,
  getFollowerSuggestions,
} from '@/api/follower';

import { useNotificationStore } from './notification.store';
import { usePostStore } from './post.store';
export const useFollowerStore = defineStore({
  id: 'follower',
  state: (): any => ({
    followerRequests: [],
    followers: [],
    user: {},
    suggestedUsers: [],
  }),
  actions: {
    async getFollowerRecommendations() {
      try {
        const res = await getFollowerSuggestions();

        if (res.data) this.suggestedUsers = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addFollowerRequest(id: any) {
      const postStore = usePostStore();
      postStore.setCanSendFollowerRequestStatus(false);
      const notificationStore = useNotificationStore();
      try {
        const res = await addFollower(id);

        if (res.data.message === 'request already made!') {
          notificationStore.showNotification(5000, 'Request already sent!', 'bg-red-300');
        } else {
          notificationStore.showNotification(5000, 'The  request was sent!', 'bg-emerald-300');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getFollowers(id: any) {
      try {
        const res = await getFollowers(id);

        if (res.data) {
          this.followerRequests = res.data.requests;
          this.followers = res.data.followers;
          this.user = res.data.user;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async handleRequest(status: any, pk: any) {
      const notificationStore = useNotificationStore();
      try {
        const res = await saveFollowerRequest(status, pk);

        if (res.data.message === 'request already made!') {
          notificationStore.showNotification(5000, 'Request already sent!', 'bg-red-300');
        } else {
          notificationStore.showNotification(5000, `Request has been ${status}!`, 'bg-emerald-300');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
