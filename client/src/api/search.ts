import http from '@/utils/https';

export const searchQuery = async (data: any) => await http.post(`/search/`, JSON.stringify(data));
