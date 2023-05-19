import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  modules: {
    regitration: registrationModule,
  },
  state: () => ({
    count: 0,
  }),
});
