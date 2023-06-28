import { defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    notifications: [],
  }),
  actions: {
    setNotifications(notifications) {
      this.notifications = notifications;
    },
    addNotifications(notification) {
      this.notifications.push(notification);
    },
  },
  getters: {
    getNotifications: (state) => state.notifications,
  },
});
