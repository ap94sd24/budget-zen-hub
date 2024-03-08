import { defineStore } from 'pinia';
import { getNotifications, setReadNotification } from '@/api/notification';

export const useNotificationStore = defineStore({
  id: 'notification',
  state: (): any => ({
    ms: 0,
    message: '',
    classes: '',
    isVisible: false,
    notifications: [],
  }),
  actions: {
    async getNotificationsForUser() {
      try {
        const res = await getNotifications();
        console.log('Notification list -> ' + JSON.stringify(res.data, null, 2));
        if (res.data) this.notifications = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async readNotification(id: string) {
      try {
        const res = await setReadNotification(id);
        console.log('Res for read notif -> ' + JSON.stringify(res.data, null, 2));
      } catch (error) {
        console.error(error);
      }
    },
    showNotification(ms: number, message: string, classes: string) {
      this.ms = ms;
      this.classes = classes;
      this.message = message;
      this.isVisible = true;

      // scroll up from bottom of screen to be visible
      setTimeout(() => {
        this.classes += ' -translate-y-28';
      }, 10);

      // notification move down and not show
      setTimeout(() => {
        this.classes = this.classes.replace('-translate-28', '');
      }, this.ms - 500);

      // remove element from dom
      setTimeout(() => {
        this.isVisible = false;
      }, this.ms);
    },
  },
});
