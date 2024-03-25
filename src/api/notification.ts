import http from '@/utils/https';

const rootUrl = '/notifications';

export const getNotifications = async () => await http.get(`${rootUrl}/`);

export const setReadNotification = async (id: string) => await http.post(`${rootUrl}/read/${id}/`);
