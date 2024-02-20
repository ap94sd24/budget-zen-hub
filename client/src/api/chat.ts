import http from '@/utils/https';

const rootUrl = '/chat';

export const getConversations = async () => await http.get(`${rootUrl}/`);
