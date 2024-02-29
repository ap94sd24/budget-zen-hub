import { defineStore } from 'pinia';
import { getRefreshToken, getUserAccount, loginAccount, editProfile } from '@/api/account';
import { useNotificationStore } from './notification.store';
import axios from 'axios';
import http from '@/utils/https';
import { useRouter } from 'vue-router';

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
      this.user.id = false;
      this.user.name = false;
      this.user.email = false;

      localStorage.setItem('user.access', '');
      localStorage.setItem('user.refresh', '');
      localStorage.setItem('user.id', '');
      localStorage.setItem('user.name', '');
      localStorage.setItem('user.email', '');
    },

    async editUserProfile(formData: any) {
      try {
        const res = await editProfile(formData);

        const notificationStore = useNotificationStore();
        if (res.data.message === 'Information updated') {
          notificationStore.showNotification(5000, 'The information was saved!', 'bg-emerald-500');

          this.setUserInfo({ id: this.user.id, name: formData.name, email: formData.email });

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

    setUserInfo(user: any) {
      this.user.id = user.id;
      this.user.name = user.name;
      this.user.email = user.email;

      localStorage.setItem('user.id', this.user.id);
      localStorage.setItem('user.name', this.user.name);
      localStorage.setItem('user.email', this.user.email);
    },

    async loginUser(data: any) {
      try {
        const res = await loginAccount(data);
        console.log('Res data is rn-> ' + JSON.stringify(res.data, null, 2));
        if (res.data) {
          this.setToken(res.data);
          console.log('Res data -> ' + JSON.stringify(res.data, null, 2));
          http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access;
        }
      } catch (error) {
        console.error(error);
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
