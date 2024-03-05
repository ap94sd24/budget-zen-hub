import { defineStore } from 'pinia';
import {
  getAllPosts,
  getAllPostsForUser,
  savePost,
  likePost,
  getPost,
  saveComment,
  getPostTrends,
  getAllTrendFeed,
} from '@/api/post';

export const usePostStore = defineStore({
  id: 'post',
  state: (): any => ({
    posts: [],
    user: null,
    trends: [],
  }),
  actions: {
    async getTrendFeed(hashtag: string) {
      try {
        const res = await getAllTrendFeed(hashtag);

        if (res.data) this.posts = res.data;
      } catch (error) {
        console.error(error);
      }
    },
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

    async getTrends() {
      try {
        const res = await getPostTrends();
        if (res.data) {
          this.trends = res.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async savePost(formData: any) {
      try {
        const res = await savePost(formData);

        if (res.data) {
          this.posts.unshift(res.data);
          this.user.posts_count += 1;
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async likePost(id: string) {
      try {
        const res = await likePost(id);

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
