import http from '@/utils/https';

const rootUrl = '/posts';

export const getAllPosts = async () => await http.get(`${rootUrl}/`);

export const getAllPostsForUser = async (id: any) => await http.get(`${rootUrl}/profile/${id}/`);

export const savePost = async (data: any) =>
  await http.post(`${rootUrl}/create/`, JSON.stringify(data));
