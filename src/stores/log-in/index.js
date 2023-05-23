import { defineStore } from "pinia";
import axios from "@/config/axios/index";

export const useLogInStore = defineStore("logIn", {
  state: () => ({
    logInData: {},
  }),
  actions: {
    setInputValue({ key, value }) {
      this.logInData[key] = value;
    },

    async logInUser() {
      try {
        console.log(this.logInData)
        const response = await axios.post("login",
         this.logInData, {});

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
});
