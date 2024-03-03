import { defineStore } from 'pinia';
import {
  getRefreshToken,
  getUserAccount,
  loginAccount,
  editProfile,
  editAccountPassword,
} from '@/api/account';
import { useNotificationStore } from './notification.store';
import axios from 'axios';
import http from '@/utils/https';

export const useUserStore = defineStore({
  id: 'user',
  state: (): any => ({
    user: {
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      access: null,
      refresh: null,
      avatar: null,
    },
  }),
  actions: {
    initStore() {
      if (localStorage.getItem('user.access')) {
        this.user.access = localStorage.getItem('user.access');
        this.user.refresh = localStorage.getItem('user.refresh');
        this.user.id = localStorage.getItem('user.id');
        this.user.name = localStorage.getItem('user.name');
        this.user.email = localStorage.getItem('user.email');
        this.user.avatar = localStorage.getItem('user.avatar');
        this.user.isAuthenticated = true;

        this.refreshToken();
      }
    },
    setToken(data: any) {
      this.user.access = data.access;
      this.user.refresh = data.refresh;
      this.user.isAuthenticated = true;

      localStorage.setItem('user.access', data.access);
      localStorage.setItem('user.refresh', data.refresh);
    },

    removeToken() {
      this.user.refresh = null;
      this.user.access = null;
      this.user.isAuthenticated = false;
      this.user.id = null;
      this.user.name = null;
      this.user.email = null;
      this.user.avatar = null;

      localStorage.setItem('user.access', '');
      localStorage.setItem('user.refresh', '');
      localStorage.setItem('user.id', '');
      localStorage.setItem('user.name', '');
      localStorage.setItem('user.email', '');
      localStorage.setItem('user.avatar', '');
    },

    async editUserProfile(formData: any) {
      try {
        const res = await editProfile(formData);

        const notificationStore = useNotificationStore();
        if (res.data.message === 'Information updated!') {
          notificationStore.showNotification(5000, 'The information was saved!', 'bg-emerald-500');

          console.log('User data -> ' + JSON.stringify(res.data.user, null, 2));
          this.setUserInfo({
            id: this.user.id,
            name: formData.get('name'),
            email: formData.get('email'),
            avatar: res.data.user.get_avatar,
          });

          return true;
        } else {
          notificationStore.showNotification(
            5000,
            `${res.data.message}. Please try again!`,
            'bg-red-300'
          );
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateAccountPassword(formData: any) {
      console.log('Enter here!');
      try {
        const res = await editAccountPassword(formData);
        const notificationStore = useNotificationStore();
        if (res.data.message === 'success') {
          notificationStore.showNotification(
            5000,
            'The information was updated!',
            'bg-emerald-500'
          );

          return { status: 'success' };
        } else {
          // notificationStore.showNotification(
          //   5000,
          //   `${res.data.message}. Please try again!`,
          //   'bg-red-300'
          // );
          return { status: 'failed', messageObj: JSON.parse(res.data.message) };
        }
      } catch (error) {
        console.error(error);

        return false;
      }
    },

    setUserInfo(user: any) {
      this.user.id = user.id;
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.avatar = user.avatar;

      localStorage.setItem('user.id', this.user.id);
      localStorage.setItem('user.name', this.user.name);
      localStorage.setItem('user.email', this.user.email);
      localStorage.setItem('user.avatar', this.user.avatar);
    },

    async loginUser(data: any) {
      try {
        const res = await loginAccount(data);

        if (res.data) {
          this.setToken(res.data);

          http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access;
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async getUserInfo() {
      try {
        const res = await getUserAccount();
        if (res.data) {
          this.setUserInfo(res.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async refreshToken() {
      try {
        const res = await getRefreshToken({ refresh: this.user.refresh });
        this.user.access = res.data.access;
        localStorage.setItem('user.access', res.data.access);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access;
      } catch (error) {
        console.error(error);
        this.removeToken();
      }
    },
  },
});
