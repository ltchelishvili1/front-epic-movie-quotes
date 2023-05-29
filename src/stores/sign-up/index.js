import { defineStore } from "pinia";


export const useSignUpStore = defineStore("signUp", {
  state: () => ({
    errors: {},
    registrationData: {},
  }),
  actions: {
    setInputValue({ key, value }) {
      this.clearErrors(key);
      this.registrationData[key] = value;
    },

    async registerUser() {
      try {
        const response = await axios.post(
          "register",
          this.registrationData,
          {}
        );

        if (response.status !== 201) {
          throw new Error("Request failed with status " + response.status);
        }
        return response;
      } catch (error) {
        this.errors = error.response?.data.errors;
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
