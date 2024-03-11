import http from '@/utils/https';

const rootUrl = '/followers';

export const addFollower = async (id: any) => await http.post(`${rootUrl}/${id}/request/`);

export const getFollowers = async (id: any) => await http.get(`${rootUrl}/${id}/`);

export const saveFollowerRequest = async (status: any, pk: any) =>
  await http.post(`${rootUrl}/${pk}/${status}/`);

export const getFollowerSuggestions = async () => await http.get(`${rootUrl}/suggestions/`);
