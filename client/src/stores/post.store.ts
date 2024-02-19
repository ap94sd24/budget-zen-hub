import { defineStore } from 'pinia';
import {
  getAllPosts,
  getAllPostsForUser,
  savePost,
  likePost,
  getPost,
  saveComment,
} from '@/api/post';

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

        if (res.data) {
          this.posts = res.data;

          console.log('Posts -> ' + JSON.stringify(this.posts, null, 2));
        }
      } catch (error) {
        console.error(error);
      }
    },

    async savePost(formData: any) {
      try {
        const res = await savePost({ body: formData });

        if (res.data) {
          this.posts.unshift(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async likePost(id: string) {
      try {
        const res = await likePost(id);
        console.log('Res data -> ' + JSON.stringify(res.data, null, 2));
        if (res.data.message === 'like created') {
          const postIdx = this.posts.findIndex((p: any) => p.id === id);
          this.posts[postIdx].likes_count += 1;
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

    async getPost(id: string) {
      try {
        const res = await getPost(id);

        return res.data;
      } catch (error) {
        console.error(error);
      }
    },

    async saveCommentForPost(id: string, body: any) {
      try {
        console.log('Body -> ' + JSON.stringify(body, null, 2));
        const res = await saveComment(id, body);

        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
