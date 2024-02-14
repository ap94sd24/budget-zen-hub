import http from '@/utils/https';

const rootUrl = '/followers';

export const addFollower = async (id: any) => await http.post(`${rootUrl}/request/${id}/`);
