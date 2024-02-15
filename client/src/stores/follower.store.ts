import { defineStore } from 'pinia';
import { getFollowers, saveFollowerRequest, addFollower } from '@/api/follower';

export const useFollowerStore = defineStore({
  id: 'follower',
  state: (): any => ({
    followerRequests: [],
    followers: [],
    user: {},
  }),
  actions: {
    async addFollowerRequest(id: any) {
      try {
        const res = await addFollower(id);

        if (res.data) console.log('Res data -> ' + JSON.stringify(res.data, null, 2));
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
      try {
        const res = await saveFollowerRequest(status, pk);

        if (res.data) console.log('Data -> ' + JSON.stringify(res.data, null, 2));
      } catch (error) {
        console.error(error);
      }
    },
  },
});
