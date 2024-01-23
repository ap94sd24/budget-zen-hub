import { defineStore } from 'pinia'

export const useNotificationStore = defineStore({
  id: 'notification',
  state: (): any => ({
    ms: 0,
    message: '',
    classes: '',
    isVisible: false
  }),
  actions: {
    showNotification(ms: number, message: string, classes: string) {
      this.ms = ms
      this.classes = classes
      this.message = message
      this.isVisible = true

      // scroll up from bottom of screen to be visible
      setTimeout(() => {
        this.classes += ' -translate-y-28'
      }, 10)

      // notification move down and not show
      setTimeout(() => {
        this.classes = this.classes.replace('-translate-28', '')
      }, this.ms - 500)

      // remove element from dom
      setTimeout(() => {
        this.isVisible = false
      }, this.ms)
    }
  }
})
