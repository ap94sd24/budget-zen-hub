import http from '@/utils/https';

export const getRefreshToken = async (data: any) =>
  await http.post(`/refresh/`, JSON.stringify(data));

export const signupAccount = async (data: any) => await http.post('/signup/', JSON.stringify(data));

export const loginAccount = async (data: any) => await http.post('/login/', JSON.stringify(data));

export const getUserAccount = async () => await http.get('/me/');

export const editProfile = async (data: any) =>
  await http.post(`/editprofile/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const editAccountPassword = async (data: any) =>
  await http.post(`/editpassword/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
