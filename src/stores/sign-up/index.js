import { defineStore } from "pinia";
import axios from "@/config/axios/index";

export const useSignUpStore = defineStore("signUp", {
  state: () => ({
    registrationData: {},
  }),
  actions: {
    setInputValue({ key, value }) {
      this.registrationData[key] = value;
      console.log(this.registrationData);
    },

    async registerUser() {
      try {
        const response = await axios.post("register", this.registrationData, {
        });

        if (response.status !== 201) {
          throw new Error("Request failed with status " + response.status);
        }
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
});
