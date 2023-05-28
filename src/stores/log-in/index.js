import { defineStore } from "pinia";
import axios from "@/config/axios/index";

export const useLogInStore = defineStore("logIn", {
  state: () => ({
    errors: {},
    logInData: {},
  }),
  actions: {
    setInputValue({ key, value }) {
      this.clearErrors(key);
      this.logInData[key] = value;
    },

    async logInUser() {
      try {
        const response = await axios.post(
          "login",
          {
            ...this.logInData,
            remember_me: this.logInData.remember_me
              ? this.logInData.remember_me
              : false,
          },
          {}
        );

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
        return response;
      } catch (error) {
        this.errors = error.response?.data.errors;
        throw new Error(error.message);
      }
    },

    async logOutUser() {
      try {
        const response = await axios.get("logout");
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    getErrors() {
      return this.errors;
    },
    clearErrors(name) {
      this.errors[name] = [];
    },
  },
});
