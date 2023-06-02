import "@/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "@/config/i18n/index.js";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const storedLanguage = localStorage.getItem("language");
if (storedLanguage) {
  i18n.global.locale.value = storedLanguage;
}

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
