import http from '@/utils/https';

const rootUrl = '/chat';

export const getConversations = async () => await http.get(`${rootUrl}/`);

export const getActiveConversation = async (id: any) => await http.get(`${rootUrl}/${id}`);

export const sendMsgForActiveChat = async (id: any, data: any) =>
  await http.post(`${rootUrl}/${id}/send/`, JSON.stringify({ body: data }));
