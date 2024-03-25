import http from '@/utils/https';

const rootUrl = '/posts';

export const getAllPosts = async () => await http.get(`${rootUrl}/`);

export const getAllTrendFeed = async (hashtag: string) =>
  await http.get(`${rootUrl}/?trend=${hashtag}`);

export const getAllPostsForUser = async (id: any) => await http.get(`${rootUrl}/profile/${id}/`);

export const savePost = async (data: any) =>
  await http.post(`${rootUrl}/create/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const likePost = async (id: string) => await http.post(`${rootUrl}/${id}/like/`);

export const getPost = async (id: string) => await http.get(`${rootUrl}/${id}/`);

export const saveComment = async (id: string, data: any) =>
  await http.post(`${rootUrl}/${id}/comment/`, JSON.stringify({ body: data }));

export const getPostTrends = async () => await http.get(`${rootUrl}/trends/`);

export const deletePost = async (id: string) => await http.delete(`${rootUrl}/${id}/delete/`);

export const reportPost = async (id: string) => await http.post(`${rootUrl}/${id}/report/`);
