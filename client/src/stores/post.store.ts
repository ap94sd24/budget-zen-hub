import { defineStore } from 'pinia';
import { getAllPosts, getAllPostsForUser, savePost } from '@/api/post';

export const usePostStore = defineStore({
  id: 'post',
  state: (): any => ({
    posts: [],
    user: null,
  }),
  actions: {
    async getFeed() {
      try {
        const res = await getAllPosts();

        if (res.data) this.posts = res.data;
      } catch (error) {
        console.error(error);
      }
    },

    async savePost(formData: any) {
      try {
        const res = await savePost({ body: formData });
        if (res.data) {
          this.posts.unshift(res.data.posts);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getAllPostsForUser(id: any) {
      try {
        const res = await getAllPostsForUser(id);

        if (res.data) {
          this.posts = res.data.posts;
          this.user = res.data.user;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
