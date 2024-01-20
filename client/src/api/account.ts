import http from '@/utils/https'

const rootUrl = '/account'

export const getRefreshToken = async (data: any) =>
  await http.post(`${rootUrl}/refresh`, JSON.stringify(data))

export const signupAccount = async (data: any) => await http.post('/signup/', JSON.stringify(data))
