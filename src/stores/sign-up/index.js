import { defineStore } from "pinia";
import axios from "axios";

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
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          this.registrationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
