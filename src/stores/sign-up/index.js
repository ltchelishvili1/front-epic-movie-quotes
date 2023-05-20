import { defineStore } from "pinia";

export const useSignUpStore = defineStore("counter", {
  state: () => ({
    registraionData: {},
  }),
  actions: {
    setInputValue({ key, value }) {
      this.registraionData[key] = value;
      console.log(this.registraionData)
    },
  },
});
